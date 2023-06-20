import { Injectable } from '@nestjs/common';
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
			console.log(result);
        
			const valid = result !== null;
			return valid ? { result, valid } : { error: 'User doesn\'t exist.', valid };
		} catch (error) {
			return error;
		}
	}

	async register(user: RegisterUserDto) {
		try {
			const result = await this.userService.create(user);
			return result;
		} catch (error) {
			console.log(error);
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
			
		}
	}

	async updatePassword(user: RecoverUserDto) {
		try {

			//Hash password
			// if token is not expired
			user.recovery_token = '';
			return await this.userService.update(user);
			
		} catch (error) {
			throw error;
		}
	}
}
