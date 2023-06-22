/* eslint-disable no-mixed-spaces-and-tabs */
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsEmail, IsNotEmpty, IsMongoId } from 'class-validator';

export class RecoverRequestDto {
   @ApiProperty({ example: 1 })
	@IsNotEmpty()
	@IsMongoId()	
   	_id: ObjectId;

	@ApiProperty({ example: 'jhon' })
	@IsNotEmpty()
	@IsEmail()
		email: string;
	
	@ApiProperty({ example: 'Token created and given by system' })
		recovery_token: string;
}