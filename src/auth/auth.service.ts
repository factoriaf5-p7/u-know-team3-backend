<<<<<<< HEAD
import { HttpException, Injectable } from '@nestjs/common';
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
	private readonly jwtService: JwtService,
	) {}
  
	async login(user:GetUserLoginDto){
		const { email, password } = user;
		const findUser = await this.userService.findOneLogin(email,password);
		if(!findUser) throw new HttpException('USER_NOT_FOUND', 401);

		return { message: 'Login success.', status: 200, user: findUser };
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
			const token = await this.jwtService.signAsync(payload, { expiresIn: '60s' });
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
			const { sub, email } = await this.jwtService.verifyAsync(user.recovery_token, { secret: 'Th3 s3cr3t t0 k33p s4v3 t0k3ns 4nd s3rv3r' });
			user._id = sub;
			user.email = email;
			user.recovery_token = '';
			// TODO
			// user.password = hash(user.password);
			return await this.userService.updatePassword(user);	
		} catch (error) {
			throw error;
		}
	}
}
=======
<<<<<<< HEAD
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
=======
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
>>>>>>> 268c51afb4a5a5589a61a53f122395a20cc127f9
import { UsersService } from 'src/users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from 'src/utils/mail-sender';
import { RecoverRequestDto } from './dto/recover-request.dto';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
    private userService: UsersService, 
	private readonly jwtService: JwtService,
	) {}
  
	async login(user:GetUserLoginDto){
		const { email, password } = user;
		const findUser = await this.userService.findOneLogin(email,password);
		if(!findUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED);

		return { message: 'Login success.', status: HttpStatus.OK, user: findUser };
	}

	async register(user: RegisterUserDto) {
		try {
			user.password = await this.encryptPassword(user.password);
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
			const token = await this.jwtService.signAsync(payload, { expiresIn: '60s' });
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
			const { sub, email } = await this.jwtService.verifyAsync(user.recovery_token, { secret: 'Th3 s3cr3t t0 k33p s4v3 t0k3ns 4nd s3rv3r' });
			user._id = sub;
			user.email = email;
			user.password = await this.encryptPassword(user.password);
			user.recovery_token = '';
			// TODO
			// user.password = hash(user.password);
			return await this.userService.updatePassword(user);	
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
>>>>>>> ec2ede4c04c116db14f0991a76d872d24418f702
