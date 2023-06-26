import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { Course } from './schemas/course.schema';
import mongoose, { ObjectId, Types, isValidObjectId } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesModule } from './courses.module';
import { UpdateContentDto } from './dto/update-content.dto';
import { Schema } from 'mongoose';

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

const courses = [
	{
		_id: '321kjklj3298ssa',
		name: 'Front end development basics',
		price: 100,
		topic: 'Frontend', 
		difficulty: 'Beginner',
		tags: [ '#frontend', '#webdevelopment', '#react' ],
		bought: true,
		createAt: '2023-06-23 17:00',
		updateAt: '2023-06-23 17:00',
		content: 'React really rocks'
	},
	{
		_id: '321k90aj211kaa',
		name: 'Back end development basics',
		price: 100,
		topic: 'Backend', 
		difficulty: 'Beginner',
		tags: [ '#backend', '#webdevelopment', '#nestjs' ],
		bought: true,
		createAt: '2023-06-23 17:00',
		updateAt: '2023-06-23 17:00',
		content: 'Nestj is really anoying'
	}
];

const course = {
	_id: '321k90aj211kuu',
	name: 'new course',
	price: 100,
	topic: 'Web development',
	bought: false,
	difficulty: 'Medium',
	tags: [ '#frontend', '#react', '#css' ],
	createAt: '2023-06-25 17:00',
	updateAt: '2023-06-25 17:00',
	content: '### this is the frontend course you need'
};

describe('CoursesService', () => {
	let service: CoursesService;

	const mockUsersService = {
		findOne: jest.fn().mockImplementation((id: ObjectId) => {
			return response;
		})
	};

	const mockCourseModel = {
		find: jest.fn().mockReturnValue({ 
			exec: () => Promise.resolve(courses), 
			select: () => Promise.resolve(courses)
		}),

		save: jest.fn().mockImplementation((newCourse: CreateCourseDto) => {
			return Promise.resolve({
				_id: '321k90aj211kuu',
				price: 100,
				bought: false,
				createAt: '2023-06-25 17:00',
				updateAt: '2023-06-25 17:00',
				...newCourse
			});
		}),

		findOneAndUpdate: jest.fn(),

		findById: jest.fn().mockImplementation((id: ObjectId) => {
			return Promise.resolve(course);
		})
	};

	class MockCourseModel {

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		constructor(newCourse: CreateCourseDto){}

		save(newCourse: CreateCourseDto) {
			return Promise.resolve({
				_id: '321k90aj211kuu',
				price: 100,
				bought: false,
				createAt: '2023-06-25 17:00',
				updateAt: '2023-06-25 17:00',

			});
		}
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ CoursesService,
				{
					provide: getModelToken(Course.name),
					useValue: mockCourseModel
				},
				{
					provide: UsersService,
					useValue: {
						findOne: jest.fn(),
					}
				}
			],
		})
			.overrideProvider(UsersService)
			.useValue(mockUsersService)
			.compile();

		service = module.get<CoursesService>(CoursesService);
		// model = module.get<getModelToken(Course.name)>(getModelToken(Course.name));
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
			data: response.user.created_courses
		});
	});

	it('search() should return response standard object with filtered courses as data', async () => {
		const query = {
			filters: 'name,tags',
			keywords: 'web development'
		};
		expect(await service.search(query.filters, query.keywords)).toMatchObject({
			message: 'Retrieved filtered courses successfully',
			status: HttpStatus.OK,
			data: courses
		});
	});

	xit('create() should return a response standard object with new created course object as data', async () => {
		const newCourse: CreateCourseDto = {	
			name: 'new course',
			topic: 'Web development',
			difficulty: 'Medium',
			tags: [ '#frontend', '#react', '#css' ],
			content: '### this is the frontend course you need'
		};
		expect(await service.create(newCourse)).toMatchObject({
			message: 'New course created successfully.',
			status: 200,
			data: {
				_id: expect.any(String)
			}
		});
	});

	it('updateContent() should return response standard object without data', async () => {
		const updatedContentDto: UpdateContentDto = {
			content: '### New course of turbo development'
		};

		expect(await service.updateContent(new Schema.Types.ObjectId(course._id), updatedContentDto)).toMatchObject({
			message: 'Content course updated successfully',
			status: HttpStatus.OK,
			data: ''
		});
	});

	it('findOne() should return response standard object within a course object as data', async () => {
		const id = new Schema.Types.ObjectId('6490640b558ac28e56d30793');

		expect(await service.findOne(id)).toMatchObject({
			message: 'Course retrieved successfully',
			status: HttpStatus.OK,
			data: course
		});
	});
});
