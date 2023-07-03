import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateUserByAdminDto {
	@IsNotEmpty()
	@IsMongoId()
		_id: ObjectId;
	
	@ApiProperty({ example: 'jhon' })
	@IsNotEmpty()
	@IsString()
		name: string;

	@ApiProperty({ example: 'connors' })
	@IsNotEmpty()
	@IsString()
		last_name: string;
  
	@ApiProperty({ example: 'jhon.connor@judgmentday.com' })
	@IsNotEmpty()
	@IsEmail()
		email: string;
  
	@ApiProperty({ example: '12345' })
	@IsNotEmpty()
		password: string;

	@ApiProperty({ example: '100' })
	@IsNotEmpty()
	@IsNumber()
		wallet_balance: number;

	@ApiProperty({ example:[] })
	@IsArray()
		bought_courses: [];

	@ApiProperty({ example:[ '6490c6a365d8d514f7ba7502','6490640b558ac28e56d30793' ] })
	@IsArray()
		created_courses: [];

	@ApiProperty({ example:[] })
	@IsArray()
		chat_notifications_sent: [];

	@ApiProperty({ example:[] })
	@IsArray()
		chat_notifications_recieved: [];

	@ApiProperty({ example:'user' })
	@IsString()
		profile: string;

	@ApiProperty({ example:'no token los webs' })
	@IsString()
		recovery_token: string;

}

