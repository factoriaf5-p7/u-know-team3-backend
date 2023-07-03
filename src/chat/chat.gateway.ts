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

	afterInit(server: Server) {
		console.log('Websocket Server up...');
	}

	@SubscribeMessage('room')
	async createRoom(client: Socket, data) {
		console.log('In ', data.room);
		this.server.emit('chat', `Welcome #${ data.userName }! Your are in ${data.room} room`);
	}

	@SubscribeMessage('chat')
	async onChat(client, data) {
		console.log(`Message from client ${client.id} (${data.userName}) = `, data.message);
		this.server.to(data.room).emit(data.message);
		this.server.emit('chat', `#${ data.userName }: ${data.message}` );
	}
	
	async handleConnection(client, data) {
		// console.log('data room', data.room)
		// client.on('room', (data) => {
		// 	client.join(data.room);
		// 	this.users++;
		// 	this.server.to(data.room).emit('users', { numUsers: this.users });
		// });
		console.log('New client connected', client.id);
	}

	async handleDisconnect() {
		this.users--;
		console.log('disconnected');
		this.server.emit('users', this.users);
	}

}
