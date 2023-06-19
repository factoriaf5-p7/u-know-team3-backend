import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from  'mongoose';
import { User } from './schemas/user.schema';
import { GetUserLoginDto } from 'src/auth/dto/get-user-login.dto';

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
				const result = await this.userModel.create( createUserDto );
				return result;
			}
		}catch(e){
			console.log(`Error creating new user ${e}`);
		}
	}

	findAll() {
		return this.userModel.find();
		// return `This action returns all users`;
	}

	async login(user: GetUserLoginDto) {
		try {
			// console.log(email,password);
			const res= await this.userModel.findOne({ email:user.email,password:user.password });
			// console.log(res);
			return res;
		} catch (error) {
			console.log(error);
		}
		// return `This action returns a #${id} user`;
	}

	findOne(id :number) {
		return 'findone';
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}

}
