import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from  'mongoose';
import { User } from './schemas/user.schema';
import { GetUserLoginDto } from 'src/auth/dto/get-user-login.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
	) { }

	async create(createUserDto: CreateUserDto) {

		try{
			const user = await this.userModel.find({ email: createUserDto.email });

			if(user.length !== 0){
				return { message: 'User already exists' };
			} else {
				const createdUser = await this.userModel.create( createUserDto );
				return createdUser;
			}
		}catch(error){
			throw error;
		}
	}

	findAll() {
		try{
			return this.userModel.find().select('-password');
		}catch(error){
			throw error;
		}
	}

	async login(user: GetUserLoginDto) {
		try {
			const res= await this.userModel.findOne({ email:user.email,password:user.password });
			return res;
		} catch (error) {
			throw error;
		}
	}

	async findOne(id : ObjectId): Promise <User> {
		try {
			const user = await this.findOne(id);

			return user;
			
		} catch (error) {
			throw error;
		}	
	}

	async update(user: UpdateUserDto) {
		try {
			const result = await this.userModel.findOneAndUpdate({ _id: user._id }, {
				...user
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}

}
