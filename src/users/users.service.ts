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

	async create(createUserDto: CreateUserDto) {

		try{
			const result = await this.userModel.find({ email: createUserDto.email });

			if(result.length !== 0){
				return { message: 'User already exists' };
			} else {
				const result = await this.userModel.create([ createUserDto ]);
				return result;
			}
		}catch(e){
			console.log(`Error creating new user ${e}`);
		}
	}

	async checkLoginInfo(email:string){
		try {
			const result = await this.userModel.find({ email:email });
			if (result.length !==0) {
				return result;
			} else {
				console.log('user not exist');
				return;
			}
		} catch (error) {
			return error;
		}
	}

	findAll() {
		return this.userModel.find();
		// return `This action returns all users`;
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
