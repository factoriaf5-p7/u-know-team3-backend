import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import mongoose, { ObjectId, Types } from 'mongoose';
import { query } from 'express';
import { CreateCourseDto } from './dto/create-course.dto';
import { HttpStatus } from '@nestjs/common';
import { UpdateContentDto } from './dto/update-content.dto';
import { Schema } from 'mongoose';

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
			status: HttpStatus.OK,
			data: courses
		})),

		create: jest.fn().mockImplementation((newCourse: CreateCourseDto) => {
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

		updateContent: jest.fn().mockImplementation((updatedContent: UpdateContentDto) => {
			return Promise.resolve({
				message: 'Content course updated successfully',
				status: HttpStatus.OK,
				data: ''	
			});
		}),

		findOne: jest.fn().mockImplementation((id: ObjectId) => {
			return Promise.resolve({
				message: 'Course retrieved successfully',
				status: HttpStatus.OK,
				data: course
			});
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

	xit('findAll() should return an array of course object', async () => {
		expect(await controller.findAll()).toMatchObject({
			message: 'Retrieved all courses succesfully',
			status: 200,
			data: courses
		});
	});

	xit('showCreatedCourses() should return an array of courses Ids', async () => {
		expect(await controller.showCreatedCourses(new mongoose.Schema.Types.ObjectId(user._id))).toMatchObject({
			message: 'Retrieved all created courses successfully',
			status: 200,
			data: user.created_courses
		});
	});

	xit('search() should return a response standard object with filtered courses as data', async () => {
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

	xit('create() should return a response standard object with new created course object as data', async () => {
		const newCourse: CreateCourseDto = {	
			name: 'new course',
			topic: 'Web development',
			difficulty: 'Medium',
			tags: [ '#frontend', '#react', '#css' ],
			content: '### this is the frontend course you need'
		};
		expect(await controller.create(newCourse)).toMatchObject({
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

		expect(await controller.updateContent(new Schema.Types.ObjectId(course._id), updatedContentDto)).toMatchObject({
			message: 'Content course updated successfully',
			status: HttpStatus.OK,
			data: ''
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
});
