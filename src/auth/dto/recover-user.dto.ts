import { ApiProperty } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ObjectId } from 'mongoose';

export class RecoverUserDto {
	@ApiProperty({ example: 1 })
		_id: ObjectId;

	@ApiProperty({ example: 'jhon' })
		email: string;

	@ApiProperty({ example: '1234' })
		password: string;

	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDkwOWRiNzAwMTBjZ...' })
		recovery_token: string;
}