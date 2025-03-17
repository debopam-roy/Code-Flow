import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface RoomCredentials {
  roomId: string;
  user_name: string;
}

interface CodeUpdateMessage {
  roomId: string;
  latest_code: string;
}

interface EditorMember {
  socket_id: string;
  user_name: string;
}

@WebSocketGateway({ namespace: 'editor' })
export class EditorGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private editorRooms: Map<string, Set<EditorMember>> = new Map();
  private codeSnippets: Map<string, string> = new Map(); // Store latest code per room

  handleConnection(client: Socket) {
    console.log('Client connected to editor:', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomDetails: RoomCredentials): void {
    const { roomId, user_name } = roomDetails;

    if (!this.editorRooms.has(roomId)) {
      this.editorRooms.set(roomId, new Set<EditorMember>());
    }

    const members = this.editorRooms.get(roomId);
    members.add({ socket_id: client.id, user_name });

    client.join(roomId);
    console.log(`${user_name} joined room: ${roomId}`);

    // Send the latest code snippet to the new user
    const latestCode = this.codeSnippets.get(roomId) || '';
    client.emit('code_snippet', latestCode);

    // Notify others in the room about the new participant
    client.to(roomId).emit('user_joined', { user_name, socket_id: client.id });
  }

  @SubscribeMessage('code_update')
  handleCodeUpdate(client: Socket, data: CodeUpdateMessage): void {
    const { roomId, latest_code } = data;

    // Store the latest code in memory
    this.codeSnippets.set(roomId, latest_code);
    
    console.log(`Code updated in room: ${roomId}`);

    // Broadcast updated code to everyone in the room (except sender)
    client.to(roomId).emit('code_snippet', latest_code);
  }

  handleDisconnect(client: Socket) {
    this.editorRooms.forEach((members, roomId) => {
      const memberToRemove = Array.from(members).find(
        (member) => member.socket_id === client.id,
      );

      if (memberToRemove) {
        members.delete(memberToRemove);
        console.log(`${memberToRemove.user_name} left room: ${roomId}`);

        // Notify remaining users in the room
        client.to(roomId).emit('user_left', { user_name: memberToRemove.user_name });
      }
    });
  }
}
