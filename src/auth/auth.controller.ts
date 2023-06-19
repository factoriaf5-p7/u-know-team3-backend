import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('login')
	findOne(@Body() user: GetUserLoginDto) {
		return this.authService.findOne(user);
	}

	@Post('signup')
	signup(@Body() user: RegisterUserDto) {
		return this.authService.register(user);
	}

	@Post('recover')
	recoverPassword (@Body() user: RecoverUserDto){
		return this.authService.recoverPassword(user);
	}
}
