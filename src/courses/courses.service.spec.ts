import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CoursesService', () => {
	let service: CoursesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ CoursesService, 
				{
					provide: getModelToken(CourseModel.name),
					useValue: mockCourseModel
				}
			],
		}).compile();

		service = module.get<CoursesService>(CoursesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('findCreatedCourses() should return a standard object within a ', async () => {
		
	});
});
