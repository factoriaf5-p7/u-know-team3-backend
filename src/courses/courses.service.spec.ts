import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { Course } from './schemas/course.schema';
import mongoose, { ObjectId } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';

const response = {
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
};

describe('CoursesService', () => {
	let service: CoursesService;

	const mockUsersService = {
		findOne: jest.fn().mockImplementation((id: ObjectId) => {
			return response;
		})
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ CoursesService,
				{
					provide: getModelToken(Course.name),
					useValue: {}
				},
				{
					provide: UsersService,
					useValue: {
						findOne: jest.fn()
					}
				}
			],
		})
			.overrideProvider(UsersService)
			.useValue(mockUsersService)
			.compile();

		service = module.get<CoursesService>(CoursesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('findCreatedCourses() should return a standard object within a ', async () => {
		const userToGetCreatedCourses = {
			id: '64905b60558ac28e56d3078e'
		};
		expect(await service.findCreatedCourses(new mongoose.Schema.Types.ObjectId(userToGetCreatedCourses.id))).toMatchObject({
			message: 'Retrieved all created courses successfully',
			status: HttpStatus.OK,
			course: response.user.created_courses
		});
	});
});
