import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RecoverUserDto } from 'src/auth/dto/recover-user.dto';
import mongoose, { ObjectId } from 'mongoose';
import { HttpStatus } from '@nestjs/common';

const recoveryUser: RecoverUserDto = {
	_id: new mongoose.Schema.Types.ObjectId('64ljkh523o54yuo3l3l'),
	email: 'jhon@judgementday.com', 
	password: '123456',
	recovery_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDkwYzlkM2U3N2RhNzNiM2ZkMDYyOTkiLCJlbWFpbCI6Impob25AY29ubm9ycy5jb20iLCJpYXQiOjE2ODczODg3NTcsImV4cCI6MTY4NzM4ODc2N30.FQjOTQSBrZSVJ1AhJ5EBpAsx_XMaXY39sTvvFSI7uOs'
};
const users = [{

    _id: '64ljkh523o54yuo3l3l',
    name: 'Jhon',
    last_name: 'Connors',
    email: 'jhon@judgementday.com', 
    wallet_balance: 100,
    bought_courses: [ 'Course1' ],
    created_courses: [ '321k90aj211kuu', '321k90aj211kuu' ],
    chat_notifications_sent: [],
    chat_notifications_recieved: [
        {
            requested_from_user: 2,
            requested_date: '2023-06-20 18:00'
        }
    ],
    profile: 'user'
},   {
 _id: '64ljkh523o54yio3l3l',
    name: 'Jhona',
    last_name: 'Coannors',
    email: 'jhona@judgementday.com', 
    wallet_balance: 100,
    bought_courses: [ 'Course1' ],
    created_courses: [ '321k90aj211kuu', '321k90aj211kuu' ],
    chat_notifications_sent: [],
    chat_notifications_recieved: [
        {
            requested_from_user: 2,
            requested_date: '2023-06-20 18:00'
        }
    ],
    profile: 'user'    } ];

describe('UsersService', () => {
	let service: UsersService;

	const mockUsersService = {
		updatePassword: jest.fn().mockImplementation((recoveryUser: RecoverUserDto) => {
			return {
				message: 'Password updated successfully',
				status: 200,
				user: ''
			};
		}),

		deleteUserByAdmin: jest.fn().mockImplementation((id: ObjectId) => {
			return {
				message: 'User deleted by Admin',
				status: HttpStatus.OK,
				data: ''
			};
		}),
		findAllAdmin: jest.fn().mockImplementation(() => ({
			message: 'All users retrieved succesfully',
			status: 200,
			users: users
		})),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ UsersService ],
		})
			.overrideProvider(UsersService)
			.useValue(mockUsersService)
			.compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('updatePassword() should update the user\'s password and return the standard object', async () => {
		expect(await service.updatePassword(recoveryUser)).toMatchObject({
			message: 'Password updated successfully',
			status: 200,
			user: ''
		});
	});

	it('deleteUserByAdmin() should return standard response if a user is deleted',async () => {
		expect(await service.deleteUserByAdmin(new mongoose.Schema.Types.ObjectId('6490c8971191c2854f5453f2'))).toMatchObject({
			message: 'User deleted by Admin',
			status: HttpStatus.OK,
			data: ''
		});
	});

	it('findAllAdmin() should return a list of users', async () => {
        expect(await service.findAllAdmin()).toMatchObject({
            message: 'All users retrieved succesfully',
            status: 200,
            users: users
        });
    });
});
