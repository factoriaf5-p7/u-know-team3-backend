import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CoursesService {
	constructor(
		private readonly userService: UsersService,
		@InjectModel(Course.name) private courseModel: Model<Course>,
	){}

	async create(createCourseDto: CreateCourseDto) {
		try {
			const newCourse =  await this.courseModel.create(createCourseDto);

			return {
				message: 'New course created successfully.',
				status: HttpStatus.OK,
				course: newCourse
			};
			
		} catch (error) {
			throw error;
		}

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

	async findCreatedCourses(userId: ObjectId){
		const response  = await this.userService.findOne( userId );
		return {
			message: 'Retrieved all created courses successfully',
			status: HttpStatus.OK,
			course: response.user.created_courses
		};
	}

	findOne(id: number) {
		return `This action returns a #${id} course`;
	}

	update(id: number, updateCourseDto: UpdateCourseDto) {
		return `This action updates a #${id} course`;
	}

	async remove(id: ObjectId) {
		try {
			const course = await this.courseModel.findOne({ _id:id });
		
			if (!course.bought) {
				course.deleteOne();
				return {
					message: 'Course deleted.',
					status: HttpStatus.OK,
				};
			} else {
				throw new HttpException('Course can not be deleted.', HttpStatus.UNAUTHORIZED);
			}
		} catch {
			throw new HttpException('Course not found.', HttpStatus.UNAUTHORIZED);
		}
	}
}
