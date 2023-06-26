import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { Course } from './schemas/course.schema';
import mongoose, { ObjectId, Types } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesModule } from './courses.module';
import { UpdateCourseDto } from './dto/update-course.dto';
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

describe('CoursesService', () => {
	let service: CoursesService;

	const mockUsersService = {
		findOne: jest.fn().mockImplementation((id: ObjectId) => {
			return response;
		})
	};

	const mockCourseModel = {
		find: jest.fn().mockReturnValue({ exec: () => Promise.resolve(courses) }),

		create: jest.fn().mockImplementation((course: CreateCourseDto) => {
			return Promise.resolve({
				...course,
				_id: '6499e0352835baa915ad78f8',
				price: 100,
				bought: false,
				createdAt: '2023-06-26T19:00:05.876Z',
				updatedAt: '2023-06-26T19:00:05.876Z',
			});
		  }),

		remove: jest.fn().mockImplementation((id: ObjectId) => {
			return Promise.resolve({
				message: 'Course deleted.',
				status: HttpStatus.OK,
				data: ''
			});
		}),

		findOneAndUpdate: jest.fn().mockImplementation((id: ObjectId, updateCourse: UpdateCourseDto) => {
			return Promise.resolve(course);
		}),

		findById: jest.fn().mockImplementation((id: ObjectId) => {
			return Promise.resolve(course);
		})
	};

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

	xit('findCreatedCourses() should return a standard object within a ', async () => {
		const userToGetCreatedCourses = {
			id: '64905b60558ac28e56d3078e'
		};
		expect(await service.findCreatedCourses(new mongoose.Schema.Types.ObjectId(userToGetCreatedCourses.id))).toMatchObject({
			message: 'Retrieved all created courses successfully',
			status: HttpStatus.OK,
			data: response.user.created_courses
		});
	});

	xit('search() should return response standard object with filtered courses as data', async () => {
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

	it('create() should return a standard response with the course data',async () => {
		const createNewCourse: CreateCourseDto = {
			name: 'Java Course',
			topic: 'Backend',
			difficulty: 'Advanced',
			tags: [ 'tag1','tag2','tag3' ],
			content: '# Learn Java the best way!'
		};

		expect(await service.create(createNewCourse)).toMatchObject({
			message: 'New course created successfully.',
			status: 200,
			data: {
				...createNewCourse
			}
		});
	});

	xit('remove() should return response standard object if a course is deleted',async () => {
		const course = {
			id: '6490640b558ac28e56d30793'
		};
		expect(await service.remove(new mongoose.Schema.Types.ObjectId(course.id))).toMatchObject({
			message: 'Course deleted.',
			status: HttpStatus.OK,
			data: '',
		  });
		// const newCourse: CreateCourseDto = {
		// 	name: 'Java Course',
		// 	topic: 'Backend',
		// 	difficulty: 'Advanced',
		// 	tags: [
		// 		'coding',
		// 		'developer',
		// 		'software'
		// 	],
		// 	content: '# Learn Java the best way!'
		// };
		// const createdCourse = await service.create(newCourse);
		// console.log(createdCourse);
		// console.log(createdCourse.data._id);
		// const course = {
		// 	name: 'Java Course',
		// 	price: 100,
		// 	topic: 'Backend',
		// 	difficulty: 'Advanced',
		// 	tags: [ 'tag1','tag2','tag3' ],
		// 	bought: false,
		// 	content: '# Learn Java the best way!',
		// 	id: '64988aff674a81e41bfd643c',
		// 	createdAt: '2023-06-25T17:01:32.077Z',
		// 	updatedAt: '2023-06-25T17:01:32.077Z',
		// 	__v: 0
		// };

	it('update() should return response standard object within udpated course as data', async () => {
		const updatedCourseDto: UpdateCourseDto = {
			name: 'The best web development course',
			topic: 'Web development',
			difficulty: 'Hard', 
			tags: [ '#web', '#dev', '#frontend' ],
			content: '### New course of turbo development'
		};

		expect(await service.update(new Schema.Types.ObjectId(course._id), updatedCourseDto)).toMatchObject({
			message: 'Course updated successfully',
			status: HttpStatus.OK,
			data: course
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
