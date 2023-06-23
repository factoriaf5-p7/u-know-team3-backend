import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import mongoose from 'mongoose';
import { RecoverUserDto } from './dto/recover-user.dto';
import { JwtService } from '@nestjs/jwt';

const recoveryUser: RecoverUserDto = {
	_id: new mongoose.Schema.Types.ObjectId('64ljkh523o54yuo3l3l'),
	email: 'jhon@judgementday.com', 
	password: '123456',
	recovery_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDkwYzlkM2U3N2RhNzNiM2ZkMDYyOTkiLCJlbWFpbCI6Impob25AY29ubm9ycy5jb20iLCJpYXQiOjE2ODczODg3NTcsImV4cCI6MTY4NzM4ODc2N30.FQjOTQSBrZSVJ1AhJ5EBpAsx_XMaXY39sTvvFSI7uOs'
};

describe('AuthService', () => {
	let service: AuthService;

	const mockUsersService = {
		updatePassword: jest.fn().mockReturnValue((user: RecoverUserDto) => {
			return Promise.resolve({
				message: 'Password updated successfully',
				status: 200,
				user: ''
			});
		})
	};

	const mockJwtService = {
		verifyAsync: jest.fn().mockReturnValue({ sub: '64ljkh523o54yuo3l3l', email: 'jhon@judgementday.com' })
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

	it('updatePassword() should return a standard object', async () => {
		
		expect(await service.updatePassword(recoveryUser)).toMatchObject({
			message: 'Password updated successfully',
			status: 200,
			user: ''
		});
	});
});
