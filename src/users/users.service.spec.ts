import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RecoverUserDto } from 'src/auth/dto/recover-user.dto';
import mongoose from 'mongoose';

const recoveryUser: RecoverUserDto = {
	_id: new mongoose.Schema.Types.ObjectId('64ljkh523o54yuo3l3l'),
	email: 'jhon@judgementday.com', 
	password: '123456',
	recovery_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDkwYzlkM2U3N2RhNzNiM2ZkMDYyOTkiLCJlbWFpbCI6Impob25AY29ubm9ycy5jb20iLCJpYXQiOjE2ODczODg3NTcsImV4cCI6MTY4NzM4ODc2N30.FQjOTQSBrZSVJ1AhJ5EBpAsx_XMaXY39sTvvFSI7uOs'
};

describe('UsersService', () => {
	let service: UsersService;

	const mockUsersService = {
		updatePassword: jest.fn().mockImplementation((recoveryUser: RecoverUserDto) => {
			return {
				message: 'Password updated successfully',
				status: 200,
				user: ''
			};
		})
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
});
