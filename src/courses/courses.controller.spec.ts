import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import mongoose, { ObjectId, Types } from 'mongoose';
import { query } from 'express';
import { CreateCourseDto } from './dto/create-course.dto';
import { HttpStatus } from '@nestjs/common';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Schema } from 'mongoose';

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

describe('CoursesController', () => {
	let controller: CoursesController;

	const mockCoursesService = {
		findAllSortedByAverage: jest.fn().mockImplementation(() => {
			return Promise.resolve({
				message: 'Retrieved all courses succesfully',
				status: 200,
				data: sortedCourses
			});
		}),

		findCreatedCourses: jest.fn().mockImplementation((userId: ObjectId) => {
			const response = [];
			courses.forEach(course => {
				response.push({ _id: course._id , name: course.name });
			});
			
			return Promise.resolve({
				message: 'Retrieved all created courses successfully',
				status: 200,
				data: response
			});
		}),

		search: jest.fn().mockReturnValue(Promise.resolve({
			message: 'Retrieved filtered courses successfully',
			status: HttpStatus.OK,
			data: courses
		})),

		create: jest.fn().mockImplementation(( userId: ObjectId, newCourse: CreateCourseDto) => {
			return Promise.resolve({
				message: 'New course created successfully.',
				status: HttpStatus.OK,
				data: {
					_id: '321k90aj211kuu',
					bought: false,
					price: 100,
					createAt: '2023-06-25 17:00',
					updateAt: '2023-06-25 17:00',
					...newCourse
				}
			});
		}),

		update: jest.fn().mockImplementation((updatedContent: UpdateCourseDto) => {
			return Promise.resolve({
				message: 'Course updated successfully',
				status: HttpStatus.OK,
				data: course
			});
		}),

		findOne: jest.fn().mockImplementation((id: ObjectId) => {
			return Promise.resolve({
				message: 'Course retrieved successfully',
				status: HttpStatus.OK,
				data: course
			});
		}),

		findOneAdmin: jest.fn().mockImplementation((id: ObjectId) => {
			return Promise.resolve({
				message: 'Course retrieved successfully',
				status: HttpStatus.OK,
				data: course
			});
		}),

		findAll: jest.fn().mockReturnValue(Promise.resolve({
			message: 'All courses retrieved successfully',
			status: HttpStatus.OK,
			data: courses
		})),

		findBoughtCourses: jest.fn().mockImplementation((userId: ObjectId) => {
			const response = [];
			courses.forEach(course => {
				response.push({ _id: course._id, name: course.name });
			});
			return Promise.resolve({
				message: 'Retrieved all courses purchased by user successfully',
				status: HttpStatus.OK,
				data: response
			});
		}),
		
		purchaseCourse: jest.fn().mockResolvedValue({
			message: 'Course purchased.',
			status: HttpStatus.OK,
			data: ''
		}),

		deleteCourse: jest.fn().mockResolvedValue({
			message: 'Course deleted.',
			status: HttpStatus.OK,
			data: '',
		}),

		deleteCourseByAdmin: jest.fn().mockResolvedValue({
			message: 'Course deleted by admin',
			status: HttpStatus.OK,
			data: '',
		})
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ CoursesController ],
			providers: [ CoursesService ],
		})
			.overrideProvider(CoursesService)
			.useValue(mockCoursesService)
			.compile();

		controller = module.get<CoursesController>(CoursesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('showCreatedCourses() should return an array of courses Ids', async () => {
		const response = [];
		courses.forEach(course => {
			response.push({ _id: course._id , name: course.name });
		});
		expect(await controller.showCreatedCourses(new mongoose.Schema.Types.ObjectId(user._id))).toMatchObject({
			message: 'Retrieved all created courses successfully',
			status: 200,
			data: response
		});
	});

	it('findBoughtCourses() should return an array of object courses id and name', async () => {
		const response = [];
		courses.forEach(course => {
			response.push({ _id: course._id, name: course.name });
		});
		expect(await controller.findBoughtCourses(new mongoose.Schema.Types.ObjectId(user._id))).toMatchObject({
			message: 'Retrieved all courses purchased by user successfully',
			status: HttpStatus.OK,
			data: response
		});

	});

	it('search() should return a response standard object with filtered courses as data', async () => {
		const query = {
			filters: 'name,tags',
			keywords: 'web development'
		};
		expect(await controller.search(query)).toMatchObject({
			message: 'Retrieved filtered courses successfully',
			status: 200,
			data: courses
		});
	});

	it('create() should return a response standard object with new created course object as data', async () => {
		const userId = new mongoose.Schema.Types.ObjectId('649444f55599cad2702d065a');
		const newCourse: CreateCourseDto = {	
			name: 'new course',
			topic: 'Web development',
			difficulty: 'Medium',
			tags: [ '#frontend', '#react', '#css' ],
			content: '### this is the frontend course you need'
		};
		expect(await controller.create(userId, newCourse)).toMatchObject({
			message: 'New course created successfully.',
			status: 200,
			data: {
				_id: expect.any(String)
			}
		});
	});

	it('update() should return response standard object without data', async () => {
		const updatedCourseDto: UpdateCourseDto = {
			_id: new mongoose.Schema.Types.ObjectId('649444f55599cad2702d065a'),
			name: 'The best web development course',
			topic: 'Web development',
			difficulty: 'Hard', 
			tags: [ '#web', '#dev', '#frontend' ],
			content: '### New course of turbo development'
		};

		expect(await controller.update(new Schema.Types.ObjectId(course._id), updatedCourseDto)).toMatchObject({
			message: 'Course updated successfully',
			status: HttpStatus.OK,
			data: course
		});
	});

	it('findOne() should return response standard object within a course object as data', async () => {
		const id = new Schema.Types.ObjectId('6490640b558ac28e56d30793');

		expect(await controller.findOne(id)).toMatchObject({
			message: 'Course retrieved successfully',
			status: HttpStatus.OK,
			data: course
		});
	});

	it('findOneAdmin() should return response standard object within a course object as data', async () => {
		const id = new Schema.Types.ObjectId('6490640b558ac28e56d30793');

		expect(await controller.findOneAdmin(id)).toMatchObject({
			message: 'Course retrieved successfully',
			status: HttpStatus.OK,
			data: course
		});
	});

	it('findAllSortedByAverage() should return response standard object within a list of courses sorted by average as data', async ()=> {
		expect(await controller.findAllSortedByAverage()).toMatchObject({
			message: 'Retrieved all courses succesfully',
			status: HttpStatus.OK,
			data: sortedCourses
		});
	});

	it('findAll should return a list of all courses', async () => {
		expect(await controller.findAll()).toMatchObject({
			message: 'All courses retrieved successfully',
			status: HttpStatus.OK,
			data: courses
		});
	});

	it('purchaseCourse should return standard response object when a course is purchased',async () => {
		const purchaseCourseDto = {
			userId: expect.any(Types.ObjectId),
			courseId: expect.any(Types.ObjectId)
		};
		expect(await controller.purchaseCourse(purchaseCourseDto)).toMatchObject({
			message: 'Course purchased.',
			status: HttpStatus.OK,
			data: ''
		});
	});

	it('deleteCourse should return a standard response object when a course is deleted',async () => {
		expect(await controller.deleteCourse(expect.any(Types.ObjectId))).toMatchObject({
			message: 'Course deleted.',
			status: HttpStatus.OK,
			data: ''
		});
	});

	it('deleteCourseByAdmin should return a standard response object when a course is deleted by an admin',async () => {
		expect(await controller.deleteCourseByAdmin(expect.any(Types.ObjectId))).toMatchObject({
			message: 'Course deleted by admin',
			status: HttpStatus.OK,
			data: ''
		});
	});
});
