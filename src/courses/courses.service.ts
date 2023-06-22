import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
	constructor(
		@InjectModel(Course.name) private courseModel: Model<Course>,
	){}

	create(createCourseDto: CreateCourseDto) {
		return 'This action adds a new course';
	}

	async findAll() {
		// return this.courseModel.find().exec();    
		// return 'This action find all users';
		const courses = await this.courseModel.aggregate([
			{
			  $project: {
					_id: 1,
					name: 1,
					price: 1,
					topic: 1,
					difficulty: 1,
					tags: 1,
					bought: 1,
					reviews: 1,
					averageRating: { $avg: '$reviews.stars' }
			  }
			},
			{
			  $sort: { averageRating: -1 }
			}
		  ]);
		  return {
			message: 'Retrieved all courses succesfully',
			status: 200,
			course: courses
		  };
	}

	findOne(id: number) {
		return `This action returns a #${id} course`;
	}

	update(id: number, updateCourseDto: UpdateCourseDto) {
		return `This action updates a #${id} course`;
	}

	remove(id: number) {
		return `This action removes a #${id} course`;
	}
}
