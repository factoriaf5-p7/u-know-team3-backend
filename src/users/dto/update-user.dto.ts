import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ObjectId } from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	_id: ObjectId;
}
