import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from 'src/utils/mail-sender';

@Injectable()
export class AuthService {
	constructor(
    private userService: UsersService, 
	private readonly jwtService: JwtService
	) {}
  
	async findOne(user:GetUserLoginDto){
		try {
			const result = await this.userService.login(user);
        
			if (result !== null) {
				return { valid :true };
			} else {
				throw new UnauthorizedException('Incorrect email or password.');
			}
		} catch (error) {
			throw error;
		}
	}

	async register(user: RegisterUserDto) {
		try {
			const result = await this.userService.create(user);
			return result;
		} catch (error) {
			throw error;
		}
	}

	async recoverPasswordRequest(user: RecoverUserDto){
		const payload = { 
			sub: user._id,
			email: user.email
		};

		try {
			const token = await this.jwtService.signAsync(payload);
			user.recovery_token = token;
			const updatedUser = await this.userService.update(user);
			sendEmail(updatedUser, token);
			return updatedUser;
		} catch (error) {
			throw error;
		}
	}

	async updatePassword(user: RecoverUserDto) {
		try {
			// TODO
			// Hash password
			// if token is not expired
			user.recovery_token = '';
			return await this.userService.update(user);
			
		} catch (error) {
			throw error;
		}
	}
}
