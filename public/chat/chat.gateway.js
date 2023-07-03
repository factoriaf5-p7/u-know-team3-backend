"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = exports.ChatGateway = class ChatGateway {
    constructor() {
        this.users = 0;
    }
    afterInit(server) {
        console.log('Websocket Server up...');
    }
    async createRoom(client, data) {
        console.log('In ', data.room);
        this.server.emit('chat', `Welcome #${data.userName}! Your are in ${data.room} room`);
    }
    async onChat(client, data) {
        console.log(`Message from client ${client.id} (${data.userName}) = `, data.message);
        this.server.to(data.room).emit(data.message);
        this.server.emit('chat', `#${data.userName}: ${data.message}`);
    }
    async handleConnection(client, data) {
        console.log('New client connected', client.id);
    }
    async handleDisconnect() {
        this.users--;
        console.log('disconnected');
        this.server.emit('users', this.users);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "createRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onChat", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(4000, {
        cors: {
            origin: '*'
        }
    })
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map