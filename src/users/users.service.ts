import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from  'mongoose';
import { User } from './schemas/user.schema';
import { GetUserLoginDto } from 'src/auth/dto/get-user-login.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { RecoverUserDto } from 'src/auth/dto/recover-user.dto';
import { RecoverRequestDto } from 'src/auth/dto/recover-request.dto';

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
				await this.userModel.create( registerUserDto );
				return { 
					message: 'User created succesfully',
					status: 200
				};
			}
		}catch(error){
			throw error;
		}
	}

	async findAll() {
		try{
			const users = await this.userModel.find().select('-password').lean().exec();
			console.log(users);
			return {
				message: 'All users retrieved succesfully',
				status: 200,
				users: users
			};
		}catch(error){
			throw error;
		}
	}

	async login(user: GetUserLoginDto) {
		try {
			const userLogged = await this.userModel.findOne({ email:user.email,password:user.password }).select('-password');
			return {
				message: 'Logging success',
				status: 200,
				user: userLogged
			};
		} catch (error) {
			throw error;
		}
	}

	async findOne(id : ObjectId) {
		try {
			const user = await this.userModel.findOne({ _id: id }).select('-password');
			return {
				message: 'User retrived successfully',
				status: 200,
				user: user
			};
		} catch (error) {
			throw error;
		}	
	}

	async update(user: UpdateUserDto) {
		try {
			const updatedUser = await this.userModel.findOneAndUpdate({ _id: user._id }, {
				...user
			});
			return {
				message: 'User updated successfully',
				status: 200,
				user: updatedUser
			};
		} catch (error) {
			throw error;
		}
	}

	async updatePassword(user: RecoverUserDto) {
		try {
			const userPasswordUpdated = await this.userModel.findOneAndUpdate({ _id: user._id }, {
				...user
			});
			return {
				message: 'Password updated successfully',
				status: 200,
				user: userPasswordUpdated
			};
		} catch (error) {
			throw error;
		}
	}

	async updateRecoveryToken(user: RecoverRequestDto) {
		try {
			const userTokenCreated = await this.userModel.findOneAndUpdate({ _id: user._id }, {
				...user
			});
			return {
				message: 'Recovery token created successfully',
				status: 200,
				user: userTokenCreated
			};
		} catch (error) {
			throw error;
		}
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}

}
