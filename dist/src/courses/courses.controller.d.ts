import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCourseDto: UpdateCourseDto): string;
    remove(id: string): string;
}
