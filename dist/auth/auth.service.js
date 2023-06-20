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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const mail_sender_1 = require("../utils/mail-sender");
let AuthService = exports.AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async findOne(user) {
        try {
            const result = await this.userService.login(user);
            console.log(result);
            const valid = result !== null;
            return valid ? { result, valid } : { error: 'User doesn\'t exist.', valid };
        }
        catch (error) {
            return error;
        }
    }
    async register(user) {
        try {
            const result = await this.userService.create(user);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    async recoverPasswordRequest(user) {
        const payload = {
            sub: user._id,
            email: user.email
        };
        try {
            const token = await this.jwtService.signAsync(payload);
            user.recovery_token = token;
            const updatedUser = await this.userService.update(user);
            (0, mail_sender_1.sendEmail)(updatedUser, token);
            return updatedUser;
        }
        catch (error) {
        }
    }
    async updatePassword(user) {
        try {
            user.recovery_token = '';
            return await this.userService.update(user);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map