import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { Course } from './schemas/course.schema';
import mongoose, { ObjectId, Types } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Schema } from 'mongoose';
import { PurchaseCourseDto } from './dto/buy-course.dto';

const response = {
	user: {
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
		created_courses: [ '321k90aj211kuu', '321k90aj211kuu' ],
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
		created_courses: [ '321k90aj211kuu', '321k90aj211kuu' ],
		bought: true,
		createAt: '2023-06-23 17:00',
		updateAt: '2023-06-23 17:00',
		content: 'Nestj is really anoying'
	}
];

const course = {
	name: 'Java Course',
	price: 100,
	topic: 'Backend',
	difficulty: 'Advanced',
	tags: [
		'coding',
		'developer',
		'software'
	],
	bought: false,
	content: '# Learn Java the best way!',
	_id: '6499f4e80e48c86ef37897b9',
	createdAt: '2023-06-26T20:28:24.524Z',
	updatedAt: '2023-06-26T20:28:24.524Z',
};

const user = {
	_id: '64ljkh523o54yuo3l3l',
	name: 'Jhon',
	last_name: 'Connors',
	email: 'jhon@judgementday.com', 
	wallet_balance: 100,
	bought_courses: [ 'Course1' ],
	created_courses: [ new Schema.Types.ObjectId('321k90aj211kuu'), new Schema.Types.ObjectId('321k90aj211kuu') ],
	chat_notifications_sent: [],
	chat_notifications_recieved: [
		{
			requested_from_user: 2,
			requested_date: '2023-06-20 18:00'
		}
	],
	profile: 'user'
};

const sortedCourses = [
	{
		_id: '6590640b558ac28e56d30993',
		name: 'Introduction to Web Development',
		totalStars: 5,
		numRating: 1,
		average: 5
	},
	{
		_id: '649077a6558ac28e56d30796',
		name: 'Nodemailer para principiantes',
		totalStars: 10,
		numRating: 3,
		average: 3.3333333333333335
	},
	{
		_id: '6490cc44e77da73b3fd0629d',
		name: 'Be inclusive have in consideration Terminator\'s feelings',
		totalStars: 5,
		numRating: 2,
		average: 2.5
	},
	{
		_id: '6490640b558ac28e56d30793',
		name: 'Nodemailer para principiantes',
		totalStars: 2,
		numRating: 1,
		average: 2
	}
];
const sortedByPriceCourses = [
	{
		_id: '6590640b558ac28e56d30993',
		name: 'Introduction to Web Development',
		price: 5,
	},
	{
		_id: '649077a6558ac28e56d30796',
		name: 'Nodemailer avanzado',
		price: 10,
	},
	{
		_id: '6490cc44e77da73b3fd0629d',
		name: 'Be inclusive have in consideration Terminator\'s feelings',
		price: 15,
	},
	{
		_id: '6490640b558ac28e56d30793',
		name: 'Nodemailer para principiantes',
		price: 25,
	}
];

describe('CoursesService', () => {
	let service: CoursesService;
	let usersService: UsersService;

	const mockUsersService = {
		findOne: jest.fn().mockReturnValue(Promise.resolve({
			message: 'Retrieved all created courses successfully',
			status: HttpStatus.OK,
			data: user
		})),

		findAllBoughtCourses: jest.fn().mockReturnValue(Promise.resolve(sortedCourses)),

		updateUserBoughtCourses: jest.fn().mockResolvedValue({})
	};

	const mockCourseModel = {
		find: jest.fn().mockReturnValue({ select: () => Promise.resolve(sortedCourses) }),

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

		deleteCourse: jest.fn().mockImplementation((id: ObjectId) => {
			return Promise.resolve({
				message: 'Course deleted.',
				status: HttpStatus.OK,
				data: ''
			});
		}),

		findOne: jest.fn().mockResolvedValue(course),
		findOneAdmin: jest.fn().mockResolvedValue(course),

		deleteOne: jest.fn().mockResolvedValue(course),

		findOneAndUpdate: jest.fn().mockImplementation((id: ObjectId, updateCourse: UpdateCourseDto) => {
			return Promise.resolve(course);
		}),

		findById: jest.fn()
			.mockReturnValueOnce(Promise.resolve(course))
			.mockReturnValueOnce(Promise.resolve([ { _id: course._id, name: course.name }, { _id: course._id, name: course.name } ]))	
			
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ CoursesService,
				{
					provide: getModelToken(Course.name),
					useValue: mockCourseModel
				},
				{
					provide: UsersService,
					useValue: mockUsersService
				}
			],
		}).compile();

		service = module.get<CoursesService>(CoursesService);
		usersService = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	xit('findOne() should return response standard object within a course object as data', async () => {
		const id = new Schema.Types.ObjectId('6490640b558ac28e56d30793');
		// const user = await userService.findOne(id);
		jest.spyOn(usersService, 'findOne');
		jest.spyOn(service, 'findCoursesCollectionById');
		await service.findOne(id);
		expect(service.findCoursesCollectionById).toHaveBeenCalled();
		expect(usersService.findOne).toHaveBeenCalled();
		
		// expect(await service.findOne(id)).toMatchObject({
		// 	message: 'Course retrieved successfully',
		// 	status: HttpStatus.OK,
		// 	data: {
		// 		...course
		// 	}
		// });

		// const userToGetCreatedCourses = {
		// 	id: '64905b60558ac28e56d3078e'
		// };

		// expect(await service.findCreatedCourses(new mongoose.Schema.Types.ObjectId(userToGetCreatedCourses.id))).toMatchObject({
		// 	message: 'Retrieved all created courses successfully',
		// 	status: HttpStatus.OK,
		// 	data: [ {
		// 		_id: course._id,
		// 		name: course.name
		// 	},
		// 	{
		// 		_id: course._id,
		// 		name: course.name
		// 	}
		//  ]
		// });
	});

	it('findOneAdmin() should return response standard object within a course object as data', async() => {
		const id = new Schema.Types.ObjectId('6490640b558ac28e56d30793');
		expect(await service.findOneAdmin(id)).toMatchObject({ 
			message: 'Course retrieved successfully',
			status: HttpStatus.OK,
			data: course
		 });
	});

	it('findCreatedCourses() should return a standard object within a ', async () => {
		const userToGetCreatedCourses = {
			id: '64905b60558ac28e56d3078e'
		};

		expect(await service.findCreatedCourses(new mongoose.Schema.Types.ObjectId(userToGetCreatedCourses.id))).toMatchObject({
			message: 'Retrieved all created courses successfully',
			status: HttpStatus.OK,
			data: [ {
				_id: course._id,
				name: course.name
			},
			{
				_id: course._id,
				name: course.name
			}
		 ]
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
	
	it('create() should return a standard response with the course data',async () => {
		const createNewCourse: CreateCourseDto = {
			name: 'Java Course',
			topic: 'Backend',
			difficulty: 'Advanced',
			tags: [ 'tag1','tag2','tag3' ],
			content: '# Learn Java the best way!'
		};

		const id = new mongoose.Schema.Types.ObjectId('643khq889a008d66a6s');

		expect(await service.create(id, createNewCourse)).toMatchObject({
			message: 'New course created successfully.',
			status: 200,
			data: {
				...createNewCourse
			}
		});
	});

	it('deleteCourse() should return response standard object if a course is deleted',async () => {
		expect(await service.deleteCourse(new mongoose.Schema.Types.ObjectId(course._id))).toMatchObject({
			message: 'Course deleted.',
			status: HttpStatus.OK,
			data: '',
		  });
	});

	it('update() should return response standard object within udpated course as data', async () => {
		const updatedCourseDto: UpdateCourseDto = {
			_id: new mongoose.Schema.Types.ObjectId('68akeap833l1ahgy'),
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

	it('findAllSortedByAverage() should return response standard object within a list of courses sorted by average as data', async ()=> {
		expect(await service.findAllSortedByAverage()).toMatchObject({
			message: 'Retrieved all courses succesfully',
			status: HttpStatus.OK,
			data: sortedCourses
		});
	});

	it('deletedCourseByAdmin() should return response standard object',async () => {
		expect(await service.deleteCourseByAdmin(new mongoose.Schema.Types.ObjectId(course._id))).toMatchObject({
	
			message: 'Course deleted by admin',
			status: HttpStatus.OK,
			data: ''
		});
	});

	it('purchaseCourse() should return response standard object and update user and course (if necessary)',async () => {
		const purchaseCourseDto: PurchaseCourseDto = {
			userId: expect.any(Types.ObjectId),
			courseId: expect.any(Types.ObjectId)
		};

		expect(await service.purchaseCourse(purchaseCourseDto)).toMatchObject({
			message: 'Course purchased.',
			status: HttpStatus.OK,
			data: ''
		});
	});
});