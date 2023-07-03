import { OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit {
    server: Server;
    users: number;
    afterInit(server: Server): void;
    createRoom(client: Socket, data: any): Promise<void>;
    onChat(client: any, data: any): Promise<void>;
    handleConnection(client: any, data: any): Promise<void>;
    handleDisconnect(): Promise<void>;
}
