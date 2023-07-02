import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	MessageBody,
	ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4000, {
	cors: {
		origin: '*'
	}
})
export class ChatGateway implements OnGatewayInit {
	@WebSocketServer() 
		server: Server;
	users = 0;

	@SubscribeMessage('room')
	async createRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		client.join((data: string) => {
			console.log('data ', data);
		});
	}

	@SubscribeMessage('chat')
	async onChat(client, message) {
		console.log('mssg from client = ', message);
		this.server.emit('chat', message );
	}

	afterInit(server: Server) {
		console.log(server);
	}
	
	async handleConnection(client) {
		// this.users++;
		// this.server.emit('users', this.users);
		console.log('New client connected', client.id);
		this.server.emit('chat', { data: 'Yeah!' });
		
	}

	async handleDisconnect() {
		this.users--;
		console.log('disconnected');
		this.server.emit('users', this.users);
	}

}
