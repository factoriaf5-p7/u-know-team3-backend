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
		try {
			const allCourses = await this.courseModel.find();

			return {
				message: 'All courses retrieved successfully',
				status: HttpStatus.OK,
				data: allCourses
			};
		} catch (error) {
			throw error;
		}
	}

	async findBoughtCourses(id: ObjectId) {
		try {
			const allBoughtCourses = await this.userService.findOne(id).find({})

			return {
				message: 'All courses retrieved successfully',
				status: HttpStatus.OK,
				data: allBoughtCourses
			};
			
		} catch (error) {
			throw error;
			
		}
	}

	async findAllSortedByAverage() {
		const calculates = [];
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
				bcourses.forEach(courseObj => {
					if(String(courseObj.course_id) === String(courseId)){
						totalStars += courseObj.stars;
						numRating++;
					}
				});
			});
			calculates.push({ 
				_id: courseId, 
				name: course.name,
				totalStars,
				numRating
			});
		});

		const hash = {};
		const filteredCourses = calculates.filter(course =>{
			return hash[course._id] || course.numRating === 0 ? false : hash[course._id] = true;
		});

		filteredCourses.map((course) =>{
			if(course.numRating > 0){
				course.average = course.totalStars / course.numRating;
				return Number(course.average.toFixed(2));
			}
		});

		const sortedCourses = filteredCourses.sort((a, b) => b.average - a.average);

		//   respuesta
		return {
			message: 'Retrieved all courses succesfully',
			status: 200,
			data: sortedCourses
		};
	}

	async findCreatedCourses(userId: ObjectId){
		const { data, message, status } = await this.userService.findOne( userId );

		const createdCourses = await this.findCoursesCollectionById(data.created_courses);
	
		return {
			message: 'Retrieved all created courses successfully',
			status: HttpStatus.OK,
			data: createdCourses
		};
	}

	async findCoursesCollectionById(courseId: ObjectId[]) {
		return await Promise.all(courseId.map(async (courseId) => await this.courseModel.findById(courseId)));
		
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

	async deleteCourse(id: ObjectId) {
		try {
			const course = await this.courseModel.findOne({ _id: id });

			if (course) {
				if (course.bought) throw new HttpException('Course cannot be deleted.', HttpStatus.UNAUTHORIZED);

				await this.courseModel.deleteOne({ _id: id });

				return {
					message: 'Course deleted.',
					status: HttpStatus.OK,
					data: ''
				};
			} else {
				throw new HttpException('Course not found.', HttpStatus.NOT_FOUND);
			}
		} catch (error){
			throw error;
		}
	}
	async findAllSortedByPriceDesc() {
		try {
			const sortedCourses = await this.courseModel.find().sort({ price : 'desc' });

			return {
				message: 'List of Courses sorted by price Desc.',
				status: HttpStatus.OK,
				data: sortedCourses
			};

		} catch (error) {
			throw error;
		}
	}

}
