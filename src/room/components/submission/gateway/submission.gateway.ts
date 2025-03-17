import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'submission' })
export class SubmissionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  handleConnection(client: Socket) {
    console.log(':::::::::::::::::::::::::::::::::::Submission', client.id);
  }

  handleDisconnect(client: Socket) {
    // Log a message when a client disconnects
    console.log(`Submission Namespace => Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log(
      `Submission Namespace => Received message: ${JSON.stringify(payload)} from client ${client.id}`,
    );
    return 'Hello world!';
  }
}
