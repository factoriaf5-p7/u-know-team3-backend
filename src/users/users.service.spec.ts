import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ UsersService ],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

describe('UserService', () => {
	let service: UserService;
	let userModelMock: any;
  
	beforeEach(async () => {
	  userModelMock = {
		findOneAndUpdate: jest.fn().mockResolvedValue({ id: '1', name: 'Updated User' }),
	  };
  
	  const module: TestingModule = await Test.createTestingModule({
		providers: [
		  UserService,
		  {
			provide: getModelToken('User'), // Replace 'User' with your actual model name
			useValue: userModelMock,
		  },
		],
	  }).compile();
  
	  service = module.get<UserService>(UserService);
	});
  
	describe('update', () => {
	  it('should update a user', async () => {
		const updateUserDto: UpdateUserDto = { id: '1', name: 'Updated User' };
  
		const result = await service.update(updateUserDto);
  
		expect(result).toEqual({ id: '1', name: 'Updated User' });
		expect(userModelMock.findOneAndUpdate).toHaveBeenCalledWith({ _id: '1' }, updateUserDto);
	  });
	});
  });
	
	
	
	
	
	
	
	
	}
	
	
	
	
	
	)

}








)