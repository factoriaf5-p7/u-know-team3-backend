import { Controller, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

  @Get('login')
	findOne(@Body() user:GetUserLoginDto) {
		// console.log(email,password);
		return this.authService.findOne(user);
	}
}
