import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserLoginDto } from 'src/auth/dto/get-user-login.dto';

const user = {
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
	profile: 'user'
};

describe('UsersController', () => {
	let controller: UsersController;

	const mockUserService = {
		findOne: jest.fn().mockImplementation((_id: Types.ObjectId) => {
			return Promise.resolve({
				message: 'User retrived successfully',
				status: 200,
				user: user
			});
		}),
		update: jest.fn().mockImplementation((userDto: UpdateUserDto) => {
			return Promise.resolve({
				message: 'User updated successfully',
				status: 200,
				user: {
					_id: '64ljkh523o54yuo3l3l',
					name: userDto.name,
					last_name: userDto.last_name,
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
					profile: 'user'
				}
			});
		})
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ UsersController ],
			providers: [ 
				UsersService,
				{
					provide: getModelToken(User.name),
					useValue: {}
				}
			],

		})
			.overrideProvider(UsersService)
			.useValue(mockUserService)
			.compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('findOne() return a User object in a standard response object', async () => {
		expect(await controller.findOne(new mongoose.Schema.Types.ObjectId('2345k3k34j5h2g3'))).toMatchObject({
			message: 'User retrived successfully',
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
				profile: 'user'
			}
		});
	});

	it('update() should find a user by Id and update data', async () => {
		const updatedUserDto = {
			_id: new mongoose.Schema.Types.ObjectId('64ljkh523o54yuo3l3l'),
			name: 'Alan',
			last_name: 'Garcia'
		};
		expect(await controller.update(updatedUserDto)).toMatchObject({
			message: 'User updated successfully',
			status: 200,
			user: {
				_id: '64ljkh523o54yuo3l3l',
				name: 'Alan',
				last_name: 'Garcia',
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
				profile: 'user'
			}
		});
	});

});
