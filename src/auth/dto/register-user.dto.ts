import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsStrongPassword, IsArray, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
	@ApiProperty({ example: 'Jhon' })
	@IsString()
		name: string;
  
	@ApiProperty({ example: 'Connor' })
	@IsString()
		last_name: string;
  
	@ApiProperty({ example: 'jhon.connor@judgmentday.com' })
	@IsEmail()
		email: string;
  
	@ApiProperty({ example: '12345' })
	@IsNotEmpty()
		password: string;
}