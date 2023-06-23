<<<<<<< HEAD
import { Controller, Get, Body, Post, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { RecoverRequestDto } from './dto/recover-request.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	findOne(@Body() user: GetUserLoginDto) {
		return this.authService.login(user);
	}

	@Post('signup')
	signup(@Body() user: RegisterUserDto) {
		return this.authService.register(user);
	}

	@Patch('recover')
	recoverPasswordRequest (@Body() user: RecoverRequestDto){
		return this.authService.recoverPasswordRequest(user);
	}

	@Get('upassword')
	updatePassword (@Body() user: RecoverUserDto){
		return this.authService.updatePassword(user);
	}
}
=======
import { Controller, Get, Body, Post, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { RecoverRequestDto } from './dto/recover-request.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	findOne(@Body() user: GetUserLoginDto) {
		return this.authService.login(user);
	}

	@Post('signup')
	signup(@Body() user: RegisterUserDto) {
		return this.authService.register(user);
	}

	@Patch('recover')
	recoverPasswordRequest (@Body() user: RecoverRequestDto){
		return this.authService.recoverPasswordRequest(user);
	}

	@Get('upassword')
	updatePassword (@Body() user: RecoverUserDto){
		return this.authService.updatePassword(user);
	}
}
>>>>>>> ec2ede4c04c116db14f0991a76d872d24418f702
