import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly MAX_MISSED_HEARTBEATS = 6;
  private readonly HEARTBEAT_INTERVAL = 5000;
  private missedHeartbeats: Map<string, number> = new Map();
  private clients: Map<string, Set<string>> = new Map();

  handleConnection(client: Socket) {
    this.startHeartbeatCheck(client);
  }

  handleDisconnect(client: Socket) {
    this.cleanUpClient(client);
  }

  private startHeartbeatCheck(client: Socket) {
    this.missedHeartbeats.set(client.id, 0);

    const interval = setInterval(() => {
      const missed = this.missedHeartbeats.get(client.id) || 0;

      if (missed >= this.MAX_MISSED_HEARTBEATS) {
        clearInterval(interval);
        this.handleUserInactivity(client);
        return;
      }

      this.missedHeartbeats.set(client.id, missed + 1);
      client.emit('ping');
    }, this.HEARTBEAT_INTERVAL);

    client.on('pong', () => {
      this.missedHeartbeats.set(client.id, 0);
    });

    client.on('disconnect', () => {
      clearInterval(interval);
      this.cleanUpClient(client);
    });
  }

  private handleUserInactivity(client: Socket) {
    console.log(
      `Client ${client.id} is inactive (missed ${this.MAX_MISSED_HEARTBEATS} heartbeats).`,
    );

    this.clients.forEach((members, roomId) => {
      if (members.has(client.id)) {
        client.to(roomId).emit('userInactive', { socket_id: client.id });
      }
    });
    client.disconnect(true);
  }

  private cleanUpClient(client: Socket) {
    this.missedHeartbeats.delete(client.id);

    this.clients.forEach((members, roomId) => {
      if (members.has(client.id)) {
        members.delete(client.id);
      }
    });
  }
}
