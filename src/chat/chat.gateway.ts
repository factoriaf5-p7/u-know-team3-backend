import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4000, {
	cors: {
		origin: '*'
	}
})
export class ChatGateway implements OnGatewayInit {
	@WebSocketServer() 
		server: Server;
	users = 0;

	@SubscribeMessage('chat')
	async onChat(client, message) {
		client.broadcast.emit('chat', message);
	}

	afterInit(server: Server) {
		console.log(server);
	}
	
	async handleConnection(client) {
		// this.users++;
		// this.server.emit('users', this.users);
		client.broadcast.emit('hello', 'Yeah!');
		
	}

	async handleDisconnect() {
		this.users--;
		this.server.emit('users', this.users);
	}

	@SubscribeMessage('hello')
	async onHello(client, message) {
		console.log(message);
		client.broadcast.emit('hello', 'You are welcom!');
	}

}
