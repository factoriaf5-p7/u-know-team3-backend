import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model, ObjectId } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class CoursesService {
	constructor(
		private readonly userService: UsersService,
		@InjectModel(Course.name) private courseModel: Model<Course>,
	){}

	async create(createCourseDto: CreateCourseDto) {
		try {
			const course = new this.courseModel(createCourseDto);
			const newCourse: any =  await course.save();

			console.log(newCourse);

			return {
				message: 'New course created successfully.',
				status: HttpStatus.OK,
				data: newCourse._doc
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
			data: response.user.created_courses
		};
	}

	async search(filters: string, keywords: string) {
		let allCourses = [];

		const regex = new RegExp(keywords, 'i'); // (/Web development/i)
		const arrFilters = filters.split(','); // arrFilter[0] = topic, arrFilter[1] = name, ...
		
		try {
			for await (const filter of arrFilters) {
				allCourses.push(...await this.courseModel.find({ [filter] : regex }).select('_id name'));
			}

			// Se eliminan los sub arrays que se puedan crear al realizar varias peticiones a la bbdd con 
			// los diferentes filtros.
			allCourses = allCourses.flat(Infinity);

			// Se eliminan duplicados para mostrar los cursos que coinciden con las palabras clave solicitadas.
			// Si el id de course guardado en hash ya existe devuelve false, por lo que no se guarda en el nuevo array.
			// Si no existe se le asigna true y se guarda en el nuevo array.
			const hash = {};
			const filteredCourses = allCourses.filter(course =>{
				return hash[course._id] ? false : hash[course._id] = true;
			});

			return {
				message: 'Retrieved filtered courses successfully',
				status: HttpStatus.OK,
				data: filteredCourses
			};
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: ObjectId) {
		try{
			const course = await this.courseModel.findById(id);
			return {
				message: 'Course retrieved successfully',
				status: HttpStatus.OK,
				data: course
			};
		}catch(error){
			throw error;
		}
	}

	async update(id: ObjectId, updateCourse: UpdateCourseDto) {
		try {
			const courseUpdated = await this.courseModel.findOneAndUpdate({ _id: id }, {
				 ...updateCourse
			});

			return {
				message: 'Course updated successfully',
				status: HttpStatus.OK,
				data: courseUpdated
			};
		} catch (error) {
			throw error;
		}
	}

	async remove(id: ObjectId) {
		try {
			const course = await this.courseModel.findOne({ _id:id });
		
			if (!course.bought) {
				course.deleteOne();
				return {
					message: 'Course deleted.',
					status: HttpStatus.OK,
					data: ''
				};
			} else {
				throw new HttpException('Course can not be deleted.', HttpStatus.UNAUTHORIZED);
			}
		} catch {
			throw new HttpException('Course not found.', HttpStatus.UNAUTHORIZED);
		}
	}

}
