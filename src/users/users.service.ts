import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from  'mongoose';
import { User } from './schemas/user.schema';
import { GetUserLoginDto } from 'src/auth/dto/get-user-login.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
	) { }

	async create(registerUserDto: RegisterUserDto) {

		try{
			const result = await this.userModel.find({ email: registerUserDto.email });

			if(result.length !== 0){
				return { message: 'User already exists' };
			} else {
				const result = await this.userModel.create( registerUserDto );
				return result;
			}
		}catch(error){
			throw error;
		}
	}

	findAll() {
		try{
			return this.userModel.find();
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
