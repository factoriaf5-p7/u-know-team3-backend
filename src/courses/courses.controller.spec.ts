import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';

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

describe('CoursesController', () => {
	let controller: CoursesController;

	const mockCoursesService = {
		findAll: jest.fn().mockImplementation(() => {
			return Promise.resolve({
				message: 'Retrieved all courses succesfully',
				status: 200,
				course: courses
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

	it('findAll() should return an array of course object', async () => {
		expect(await controller.findAll()).toMatchObject({
			message: 'Retrieved all courses succesfully',
			status: 200,
			course: courses
		});
	});
});
