import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from 'src/utils/mail-sender';
import { RecoverRequestDto } from './dto/recover-request.dto';

@Injectable()
export class AuthService {
	constructor(
    private userService: UsersService, 
	private readonly jwtService: JwtService
	) {}
  
	async findOne(user:GetUserLoginDto){
		try {
			const result = await this.userService.login(user);
        
			const valid = result !== null;
			return valid ? { result, valid } : { error: 'User doesn\'t exist.', valid };
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

	async recoverPasswordRequest(user: RecoverRequestDto){
		const payload = { 
			sub: user._id,
			email: user.email
		};

		try {
			const token = await this.jwtService.signAsync(payload, { expiresIn: '10s' });
			user.recovery_token = token;
			const updatedUser = await this.userService.updateRecoveryToken(user);
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
			const { sub, email } = await this.jwtService.verifyAsync(user.recovery_token, { secret: 'Th3 s3cr3t t0 k33p s4v3 t0k3ns 4nd s3rv3r' });
			user._id = sub;
			user.email = email;
			user.recovery_token = '';
			return await this.userService.updatePassword(user);	
		} catch (error) {
			if(error.name === 'TokenExpiredError'){
				throw new UnauthorizedException('Token is expired');
			}	else {
				throw new UnauthorizedException();
			}
			// throw error;
		}
	}
}
