import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';

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
	let service: AuthService;

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
		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('signin() should return a user object found by email and password', async () => {
		const userDto: GetUserLoginDto  = {
			email: 'jhon@judgementday.com',
			password: '1234'
		};
		expect(await controller.signin(userDto)).toMatchObject({
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
});
