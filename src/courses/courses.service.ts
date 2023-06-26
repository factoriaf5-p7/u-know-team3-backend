import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model, ObjectId, Schema } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class CoursesService {
	constructor(
		private readonly userService: UsersService,
		@InjectModel(Course.name) private courseModel: Model<Course>,
	){}

	async create(createCourseDto: CreateCourseDto) {
		try {
			const newCourse = await this.courseModel.create(createCourseDto);

			return {
				message: 'New course created successfully.',
				status: HttpStatus.OK,
				data: newCourse
			};
			
		} catch (error) {
			throw error;
		}

	}

	async findAll() {
		const listCoursesSorted = [];
		const idCoursesAll = await this.courseModel.find({}, { _id: 1, name: 1 });    //id de todos los cursos
		const { data, message, status } = await this.userService.findAllBoughtCourses( {}, { bought_courses: 1, _id: 0 } ); //cursos comprados de cada usuario

		// return 'This action find all users';
		// const courses = this.courseModel.find();
		idCoursesAll.forEach( (course) => {
			const courseId = course._id;
			let totalStars = 0;
			let numRating = 0;

			// Buscar las puntuaciones del curso
			data.forEach(boughtCourses => {
				const bcourses = Array.from(boughtCourses.bought_courses);
				bcourses.forEach(courses => {
					if(String(courses.course_id) === String(courseId)){
						totalStars += courses.stars;
						numRating++;
					}
				});
			
			});

		});
		
		//   respuesta
		  return {
			message: 'Retrieved all courses succesfully',
			status: 200,
			idCourses: idCoursesAll,
			// users: starsUsersAll 
		  };
	}

	async findCreatedCourses(userId: ObjectId){
		const createdCourses = [];
		const { user, message, status } = await this.userService.findOne( userId );

		for await (const courseId of user.created_courses) {
			const { _id, name } = await this.courseModel.findById(courseId);
			createdCourses.push({ _id: _id, name: name });
		}

		return {
			message: 'Retrieved all created courses successfully',
			status: HttpStatus.OK,
			data: createdCourses
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
			const course = await this.courseModel.findOne({ _id: id });

			if (course) {
				if (course.bought === false) {
					await course.deleteOne();
					return {
						message: 'Course deleted.',
						status: HttpStatus.OK,
						data: ''
					};
				} else if (course.bought === true) {
					throw new HttpException('Course cannot be deleted.', HttpStatus.UNAUTHORIZED);
				}
			} else {
				throw new HttpException('Course not found.', HttpStatus.NOT_FOUND);
			}
		} catch (error){
			throw error;
		}
	}

}
