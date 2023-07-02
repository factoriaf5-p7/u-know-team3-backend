import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from '../utils/mail-sender';
import { RecoverRequestDto } from './dto/recover-request.dto';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
    private userService: UsersService, 
	private readonly jwtService: JwtService,
	) {}
  
	async validatePassword (password: string, encriptedPassword: string) {
		return compare(password, encriptedPassword);
	}

	async login(user: GetUserLoginDto){
		const { email, password } = user;
		const findUser = await this.userService.findOneLogin(email);
		if (!findUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

		const checkPassword = await this.validatePassword(password, findUser.password);
		if (!checkPassword) throw new HttpException('INCORRECT_PASSWORD', HttpStatus.FORBIDDEN);

		const payload = {
			sub: findUser._id,
			email: findUser.email
		};
		
		const token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });
		
		return { 
			message: 'Login success.', 
			status: HttpStatus.OK,
			data: token
		};
	}

	async register(user: RegisterUserDto) {
		try {
			user.password = await this.encryptPassword(user.password);
			const { data, message, status } = await this.userService.create(user);
			return {
				message: 'User registered successfully',
				status: HttpStatus.OK,
				data: data
			};
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
			const token = await this.jwtService.signAsync(payload, { expiresIn: '60s' });
			user.recovery_token = token;
			const { data, message, status } = await this.userService.updateRecoveryToken(user);
			sendEmail(data, token);
			return {
				message: 'Recovery link has sent to your email',
				status: HttpStatus.OK,
				data: ''
			};
		} catch (error) {
			throw error;
		}
	}

	async updatePassword(user: RecoverUserDto) {
		try {
			const { sub, email } = await this.jwtService.verifyAsync(user.recovery_token, { secret: 'Th3 s3cr3t t0 k33p s4v3 t0k3ns 4nd s3rv3r' });
			user._id = sub;
			user.email = email;
			user.password = await this.encryptPassword(user.password);
			user.recovery_token = '';
			await this.userService.updatePassword(user);
			return {
				message: 'Password updated successfully',
				status: HttpStatus.OK,
				data: ''
			};
		} catch (error) {
			throw error;
		}
	}

	async encryptPassword(password: string): Promise<string> {
		try {
			const salt = await genSalt(10);
			return hash(password, salt);
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async passwordVerify(password: string, hash: string) {
		return await compare(password, hash);
	}
}
