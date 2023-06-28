import { HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RecoverRequestDto } from './dto/recover-request.dto';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(user: GetUserLoginDto): Promise<{
        message: string;
        status: HttpStatus;
        data: string;
    }>;
    register(user: RegisterUserDto): Promise<{
        message: string;
        status?: undefined;
    } | {
        message: string;
        status: number;
    }>;
    recoverPasswordRequest(user: RecoverRequestDto): Promise<{
        message: string;
        status: HttpStatus;
        data: string;
    }>;
    updatePassword(user: RecoverUserDto): Promise<{
        message: string;
        status: HttpStatus;
        data: string;
    }>;
    encryptPassword(password: string): Promise<string>;
    passwordVerify(password: string, hash: string): Promise<boolean>;
}
