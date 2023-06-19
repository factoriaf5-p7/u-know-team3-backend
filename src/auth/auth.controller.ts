import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('login')
	findOne(@Body() user:GetUserLoginDto) {
		// console.log(email,password);
		return this.authService.findOne(user);
	}

	@Post('signup')
	signup(@Body() user: RegisterUserDto) {
		return this.authService.register(user);
	}
}
