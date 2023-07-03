import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateUserDto {
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
}
