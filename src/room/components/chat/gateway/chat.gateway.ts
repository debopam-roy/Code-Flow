import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface ChatMember {
  socket_id: string;
  user_name: string;
}

interface RoomCredentials {
  roomId: string;
  user_name: string;
}

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private chatRooms: Map<string, Set<ChatMember>> = new Map();

  handleConnection(client: Socket) {
    console.log(`User connected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomDetails: RoomCredentials): void {
    const { roomId, user_name } = roomDetails;

    if (!this.chatRooms.has(roomId)) {
      this.chatRooms.set(roomId, new Set<ChatMember>());
    }
    const members = this.chatRooms.get(roomId);
    members.add({ socket_id: client.id, user_name });
    client.join(roomId);

    const time = new Date().toISOString().split('T')[1].substring(0, 8);

    client.emit('currentMembers', {
      socket_id: client.id,
      sender: `${user_name}`,
      message_content: `I have joined.`,
      time,
    });

    client.to(roomId).emit('userJoined', {
      socket_id: client.id,
      sender: user_name,
      message_content: `${user_name} has joined.`,
      time,
    });
  }
  
  @SubscribeMessage('sendMessage')
  handleSendMessage(
    client: Socket,
    payload: { roomId: string; message: string },
  ) {
    const { roomId, message } = payload;
    const sender = Array.from(this.chatRooms.get(roomId) || []).find(
      (member) => member.socket_id === client.id,
    );

    if (!sender) return;

    const time = new Date().toISOString().split('T')[1].substring(0, 8);
    const chatMessage = {
      socket_id: client.id,
      sender: sender.user_name,
      message_content: message,
      time,
    };

    client.to(roomId).emit('peerMessage', chatMessage);
    client.emit('ownMessage', chatMessage);
  }

  handleDisconnect(client: Socket) {
    this.chatRooms.forEach((members, roomId) => {
      const memberToRemove = Array.from(members).find(
        (member) => member.socket_id === client.id,
      );

      if (memberToRemove) {
        members.delete(memberToRemove);
        const time = new Date().toISOString().split('T')[1].substring(0, 8);

        client.to(roomId).emit('userLeft', {
          socket_id: client.id,
          sender: memberToRemove.user_name,
          message_content: `${memberToRemove.user_name} has left.`,
          time,
        });
      }
    });
  }
}
