/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ObjectId } from 'mongoose';
import { RatedCourseDto } from './dto/rate-course.dto';
import { PurchaseCourseDto } from './dto/buy-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(userId: ObjectId, createCourseDto: CreateCourseDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course> & Omit<import("./schemas/course.schema").Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    showCreatedCourses(userId: ObjectId): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: any[];
    }>;
    findAllSortedByAverage(): Promise<{
        message: string;
        status: number;
        data: any[];
    }>;
    findAllSortedByPriceDesc(): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course> & Omit<import("./schemas/course.schema").Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    findAll(): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course> & Omit<import("./schemas/course.schema").Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    findBoughtCourses(userId: ObjectId): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: any[];
    }>;
    search(query: any): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: any[];
    }>;
    searchAdmin(query: any): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: any[];
    }>;
    findOne(id: ObjectId): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course> & Omit<import("./schemas/course.schema").Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    purchaseCourse(purchaseCourseDto: PurchaseCourseDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: string;
    }>;
    findOneAdmin(id: ObjectId): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course> & Omit<import("./schemas/course.schema").Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    update(userId: ObjectId, updateCourseDto: UpdateCourseDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: any;
    }>;
    deleteCourse(id: ObjectId): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: string;
    }>;
    deleteCourseByAdmin(id: ObjectId): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: string;
    }>;
    addRating(userId: ObjectId, ratedCourse: RatedCourseDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: {
            course_id: import("./schemas/course.schema").Course;
            stars: number;
            commented: boolean;
        }[];
    }>;
}
