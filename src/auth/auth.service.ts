import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
	constructor(
    private userService: UsersService
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
}
