import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import mongoose from 'mongoose';
import { RecoverUserDto } from './dto/recover-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RecoverRequestDto } from './dto/recover-request.dto';
import { HttpStatus } from '@nestjs/common';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as mailModule from '../utils/mail-sender';
import * as bcrypt from 'bcrypt';

jest.mock('../utils/mail-sender.ts');

const recoveryUser: RecoverUserDto = {
	_id: new mongoose.Schema.Types.ObjectId('64ljkh523o54yuo3l3l'),
	email: 'jhon@judgementday.com', 
	password: '123456',
	recovery_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDkwYzlkM2U3N2RhNzNiM2ZkMDYyOTkiLCJlbWFpbCI6Impob25AY29ubm9ycy5jb20iLCJpYXQiOjE2ODczODg3NTcsImV4cCI6MTY4NzM4ODc2N30.FQjOTQSBrZSVJ1AhJ5EBpAsx_XMaXY39sTvvFSI7uOs'
};

const recoverRequest = {
	_id: new mongoose.Schema.Types.ObjectId('64ljkh523o54yuo3l3l'),
	email: 'jhon@judgementday.com',
	recovery_token: ''
};

const loginRequest: GetUserLoginDto = {
	email: 'tomatkins@email.com',
	password: 'tom123'
};

const registerRequest: RegisterUserDto = {
	name: 'Jhon',
	last_name: 'Connors',
	email: 'jhon.connors@gmail.com',
	password: '1234'
};

describe('AuthService', () => {
	let service: AuthService;
	
	const mockUsersService = {
		updatePassword: jest.fn().mockImplementation((user: RecoverUserDto) => {
			return Promise.resolve({
				message: 'Password updated successfully',
				status: 200,
				data: ''
			});
		}),

		updateRecoveryToken: jest.fn().mockImplementation((user: RecoverRequestDto) => {
			return Promise.resolve({
				message: 'Recovery link has sent to your email',
				status: HttpStatus.OK,
				data: ''
			});
		}),

		findOneLogin: jest.fn().mockImplementation((email: string, password: string) => {
			return Promise.resolve(
				{
					message: 'Login success.', 
					status: HttpStatus.OK, 
					data: '' 
				});
		}),

		create: jest.fn().mockImplementation((user:RegisterUserDto) => {
			return Promise.resolve({
				message: 'User created succesfully',
				status: HttpStatus.OK,
				data: ''
			});
		})
	};

	const mockJwtService = {
		verifyAsync: jest.fn().mockReturnValue(Promise.resolve({ sub: '64ljkh523o54yuo3l3l', email: 'jhon@judgementday.com' })),
		signAsync: jest.fn().mockReturnValue(Promise.resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDkwYzlkM2U3N2RhNzNiM2ZkMDYyOTkiLCJlbWFpbCI6Impob25AY29ubm9ycy5jb20iLCJpYXQiOjE2ODczODg3NTcsImV4cCI6MTY4NzM4ODc2N30.FQjOTQSBrZSVJ1AhJ5EBpAsx_XMaXY39sTvvFSI7uOs'))
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ AuthService, 
				{
					provide: UsersService,
					useValue: mockUsersService
				},
				{
					provide: JwtService,
					useValue: mockJwtService
				}
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('updatePassword() should return response standard object after recover data from the token and update user\'s password', async () => {
		expect(await service.updatePassword(recoveryUser)).toMatchObject({
			message: 'Password updated successfully',
			status: 200,
			data: ''
		});
	});

	it('recoverPasswordRequest() should return standard object and send and email with a link within a recovery token', async () => {
		expect(await service.recoverPasswordRequest(recoverRequest)).toMatchObject({
			message: 'Recovery link has sent to your email',
			status: HttpStatus.OK,
			data: ''
		});
	});

	it('login() should return a successful user login request',async () => {
		const spy = jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

		expect(await service.login(loginRequest)).toMatchObject({
			message: 'Login success.', 
			status: HttpStatus.OK,
			data: expect.any(String)			
		});

		spy.mockRestore();
	});

	it('register() should return a new created user', async () => {
		expect(await service.register(registerRequest)).toMatchObject({
			message: 'User created succesfully',
			status: 200,
			data: ''
		});
	});
});
