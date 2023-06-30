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
const bcrypt_1 = require("bcrypt");
let AuthService = exports.AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validatePassword(password, encriptedPassword) {
        return (0, bcrypt_1.compare)(password, encriptedPassword);
    }
    async login(user) {
        const { email, password } = user;
        const findUser = await this.userService.findOneLogin(email);
        if (!findUser)
            throw new common_1.HttpException('USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
        const checkPassword = await this.validatePassword(password, findUser.password);
        if (!checkPassword)
            throw new common_1.HttpException('INCORRECT_PASSWORD', common_1.HttpStatus.FORBIDDEN);
        const payload = {
            sub: findUser._id,
            email: findUser.email
        };
        const token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });
        return {
            message: 'Login success.',
            status: common_1.HttpStatus.OK,
            data: token
        };
    }
    async register(user) {
        try {
            console.log(await this.encryptPassword('securepass321'));
            user.password = await this.encryptPassword(user.password);
            const result = await this.userService.create(user);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async recoverPasswordRequest(user) {
        const payload = {
            sub: user._id,
            email: user.email
        };
        try {
            const token = await this.jwtService.signAsync(payload, { expiresIn: '60s' });
            user.recovery_token = token;
            const updatedUser = await this.userService.updateRecoveryToken(user);
            (0, mail_sender_1.sendEmail)(updatedUser, token);
            return {
                message: 'Recovery link has sent to your email',
                status: common_1.HttpStatus.OK,
                data: ''
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updatePassword(user) {
        try {
            const { sub, email } = await this.jwtService.verifyAsync(user.recovery_token, { secret: 'Th3 s3cr3t t0 k33p s4v3 t0k3ns 4nd s3rv3r' });
            user._id = sub;
            user.email = email;
            user.password = await this.encryptPassword(user.password);
            user.recovery_token = '';
            await this.userService.updatePassword(user);
            return {
                message: 'Password updated successfully',
                status: common_1.HttpStatus.OK,
                data: ''
            };
        }
        catch (error) {
            throw error;
        }
    }
    async encryptPassword(password) {
        try {
            const salt = await (0, bcrypt_1.genSalt)(10);
            return (0, bcrypt_1.hash)(password, salt);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async passwordVerify(password, hash) {
        return await (0, bcrypt_1.compare)(password, hash);
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map