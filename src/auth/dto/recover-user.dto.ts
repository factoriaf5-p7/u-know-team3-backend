import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsJWT, IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class RecoverUserDto {
	@ApiProperty({ example: 1 })
		_id: ObjectId;

	@ApiProperty({ example: 'jhon' })
		email: string;

	@ApiProperty({ example: '1234' })
	@IsNotEmpty()
		password: string;

	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDkwOWRiNzAwMTBjZ...' })
	@IsNotEmpty()
	@IsJWT()
		recovery_token: string;
}