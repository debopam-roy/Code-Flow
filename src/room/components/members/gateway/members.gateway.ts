import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Member, RoomCredentials } from 'src/room/dto/room.dto';

@WebSocketGateway({ namespace: 'members' })
export class MembersGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private memberRooms: Map<string, Set<Member>> = new Map();
  handleConnection(client: Socket) {
    console.log(':::::::::::::::::::::::::::::::::::Members', client.id);
    
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomDetails: RoomCredentials): void {
    
    const { roomId, user_name, profile_picture } = roomDetails;

    if (!this.memberRooms.has(roomId)) {
      this.memberRooms.set(roomId, new Set<Member>());
    }
    
    const members: Set<Member> = this.memberRooms.get(roomId);
    members.add({ socket_id: client.id, user_name, profile_picture });
    client.join(roomId);
    
    client.to(roomId).emit('userJoined', {
      socket_id: client.id,
      user_name,
      profile_picture,
    });
    
    const currentUsers = Array.from(members);
    client.emit('currentMembers', currentUsers);
  }

  handleDisconnect(client: Socket) {
    this.memberRooms.forEach((members, roomId) => {
      const memberToRemove = Array.from(members).find(
        (member) => member.socket_id === client.id,
      );

      if (memberToRemove) {
        members.delete(memberToRemove);
        client.to(roomId).emit('userLeft', memberToRemove);
      }
    });
  }
}
