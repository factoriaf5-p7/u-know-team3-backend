import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from  'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
	) { }

	create(createUserDto: CreateUserDto) {
		const result = this.userModel.find({ email: createUserDto.email });

		if(result){
			return result;
		} else {
			return { message: 'User already exists' };
		}
	}

	findAll() {
		return `This action returns all users`;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
