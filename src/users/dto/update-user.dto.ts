import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ObjectId } from 'mongoose';

export class UpdateUserDto {
	_id: ObjectId;
}
