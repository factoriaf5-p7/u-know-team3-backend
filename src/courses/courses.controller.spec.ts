import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import mongoose, { ObjectId, Types } from 'mongoose';
import { query } from 'express';

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

describe('CoursesController', () => {
	let controller: CoursesController;

	const mockCoursesService = {
		findAll: jest.fn().mockImplementation(() => {
			return Promise.resolve({
				message: 'Retrieved all courses succesfully',
				status: 200,
				data: courses
			});
		}),

		findCreatedCourses: jest.fn().mockImplementation((userId: ObjectId) => {
			return Promise.resolve({
				message: 'Retrieved all created courses successfully',
				status: 200,
				data: user.created_courses
			});
		}),

		search: jest.fn().mockReturnValue(Promise.resolve({
			message: 'Retrieved filtered courses successfully',
			status: 200,
			data: courses
		}))
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

	it('findAll() should return an array of course object', async () => {
		expect(await controller.findAll()).toMatchObject({
			message: 'Retrieved all courses succesfully',
			status: 200,
			data: courses
		});
	});

	it('showCreatedCourses() should return an array of courses Ids', async () => {
		expect(await controller.showCreatedCourses(new mongoose.Schema.Types.ObjectId(user._id))).toMatchObject({
			message: 'Retrieved all created courses successfully',
			status: 200,
			data: user.created_courses
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
});
