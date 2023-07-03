import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import mongoose from 'mongoose';
import { HttpStatus } from '@nestjs/common';

const user = {
	_id: '64ljkh523o54yuo3l3l',
	name: 'Jhon',
	last_name: 'Connors',
	email: 'jhon@judgementday.com',
	password: '1234',
	wallet_balance: 100,
	bought_courses: [ 'Course1' ],
	created_courses: [ 'Course 2', 'Course 3' ],
	chat_notifications_sent: [],
	chat_notifications_recieved: [
		{
			requested_from_user: 2,
			requested_date: '2023-06-20 18:00'
		}
	],
	profile: 'user',
	recovery_token: ''
};

describe('AuthController', () => {
	let controller: AuthController;

	const mockAuthService = {
		login: jest.fn().mockImplementation((loginDto: GetUserLoginDto) => {
			if(loginDto.password === user.password && loginDto.email === user.email){
				const { password, recovery_token, ...userLoged } = user;
				return Promise.resolve({
					message: 'Login success',
					status: 200,
					user: userLoged
				});
			}else {
				throw new UnauthorizedException();
			}
		}),
				
		register: jest.fn().mockImplementation((registerDto: RegisterUserDto) => {
			return Promise.resolve({
				message: 'User created',
				status: 200,
				data: ''
			});
		}),

		updatePassword: jest.fn().mockImplementation((user: RecoverUserDto) => {
			return Promise.resolve({
				message: 'Password updated successfully',
				status: 200,
				data: ''
			});
		}),

		recoverPasswordRequest: jest.fn().mockImplementation((recoverRequest) => {
			return Promise.resolve({
				message: 'Recovery link has sent to your email',
				status: HttpStatus.OK,
				data: ''
			});
		})
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ AuthController ],
			providers: [ AuthService ],
		})
			.overrideProvider(AuthService)
			.useValue(mockAuthService)
			.compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('signin() should return a user object found by email and password', async () => {
		const userDto: GetUserLoginDto  = {
			email: 'jhon@judgementday.com',
			password: '1234'
		};
		expect(await controller.login(userDto)).toMatchObject({
			message: 'Login success',
			status: 200,
			user: {
				_id: '64ljkh523o54yuo3l3l',
				name: 'Jhon',
				last_name: 'Connors',
				email: 'jhon@judgementday.com',
				wallet_balance: 100,
				bought_courses: [ 'Course1' ],
				created_courses: [ 'Course 2', 'Course 3' ],
				chat_notifications_sent: [],
				chat_notifications_recieved: [
					{
						requested_from_user: 2,
						requested_date: '2023-06-20 18:00'
					}
				],
				profile: 'user',
			}
		});
	});

	it('register should return a user object with encripted password ', async () => {
		const userCreated:RegisterUserDto = {
			name: 'Jhon',
			last_name: 'Connors',
			email: 'jhon.connors@gmail.com',
			password: '1234'
		};
		expect(await controller.signup(userCreated)).toMatchObject({
			message: 'User created',
			status: 200,
			data: ''
		});
	});

	it('updatePassword() should update the user\'s password and return the standard object', async () => {
		const recoveryUser: RecoverUserDto = {
			_id: new mongoose.Schema.Types.ObjectId('64ljkh523o54yuo3l3l'),
			email: 'jhon@judgementday.com', 
			password: '123456',
			recovery_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDkwYzlkM2U3N2RhNzNiM2ZkMDYyOTkiLCJlbWFpbCI6Impob25AY29ubm9ycy5jb20iLCJpYXQiOjE2ODczODg3NTcsImV4cCI6MTY4NzM4ODc2N30.FQjOTQSBrZSVJ1AhJ5EBpAsx_XMaXY39sTvvFSI7uOs'
		};
		expect(await controller.updatePassword(recoveryUser)).toMatchObject({
			message: 'Password updated successfully',
			status: 200,
			data: ''
		});
	});

	it('recoverPasswordRequest() should return response standard object', async ()=> {
		const recoverRequest = {
			_id: new mongoose.Schema.Types.ObjectId('64ljkh523o54yuo3l3l'),
			email: 'jhon@judgementday.com',
			recovery_token: ''
		};

		expect(await controller.recoverPasswordRequest(recoverRequest)).toMatchObject({
			message: 'Recovery link has sent to your email',
			status: HttpStatus.OK,
			data: ''
		});
	});

});
