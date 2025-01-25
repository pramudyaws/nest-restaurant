import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    transport: ['websocket'],
})
export class NotificationGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    private readonly connectedUsers: Map<number, string> = new Map();

    handleConnection(client: Socket): void {
        console.log(
            'New connection attempt:',
            client.id,
            client.handshake.query,
        );
        const userId = client.handshake.query.userId as string;
        if (userId) {
            this.connectedUsers.set(+userId, client.id);
            console.log(`User ${userId} connected.`);
        }
    }

    handleDisconnect(client: Socket): void {
        const userId = [...this.connectedUsers.entries()].find(
            ([, socketId]) => socketId === client.id,
        )?.[0];
        if (userId) {
            this.connectedUsers.delete(userId);
            console.log(`User ${userId} disconnected.`);
        }
    }

    sendNotification(userId: number, message: string): void {
        const socketId = this.connectedUsers.get(userId);
        if (socketId) {
            this.server.to(socketId).emit('notification', { message });
        }
    }
}
