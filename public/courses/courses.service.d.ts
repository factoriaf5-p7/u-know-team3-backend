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
import { HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';
import { Model, ObjectId } from 'mongoose';
import { UsersService } from '../users/users.service';
import { RatedCourseDto } from './dto/rate-course.dto';
import { PurchaseCourseDto } from './dto/buy-course.dto';
export declare class CoursesService {
    private readonly userService;
    private courseModel;
    prototype(prototype: any, arg1: string): void;
    constructor(userService: UsersService, courseModel: Model<Course>);
    create(userId: ObjectId, createCourseDto: CreateCourseDto): Promise<{
        message: string;
        status: HttpStatus;
        data: import("mongoose").Document<unknown, {}, Course> & Omit<Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    findAll(): Promise<{
        message: string;
        status: HttpStatus;
        data: (import("mongoose").Document<unknown, {}, Course> & Omit<Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    findBoughtCourses(id: ObjectId): Promise<{
        message: string;
        status: HttpStatus;
        data: any[];
    }>;
    addRating(userId: ObjectId, ratedCourse: RatedCourseDto): Promise<{
        message: string;
        status: HttpStatus;
        data: {
            course_id: Course;
            stars: number;
            commented: boolean;
        }[];
    }>;
    searchAdmin(filters: string, keywords: string): Promise<{
        message: string;
        status: HttpStatus;
        data: any[];
    }>;
    findAllSortedByAverage(): Promise<{
        message: string;
        status: number;
        data: any[];
    }>;
    findCreatedCourses(userId: ObjectId): Promise<{
        message: string;
        status: HttpStatus;
        data: any[];
    }>;
    findCoursesCollectionById(courseId: ObjectId[]): Promise<(import("mongoose").Document<unknown, {}, Course> & Omit<Course & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    search(filters: string, keywords: string): Promise<{
        message: string;
        status: HttpStatus;
        data: any[];
    }>;
    findOne(id: ObjectId): Promise<{
        message: string;
        status: HttpStatus;
        data: import("mongoose").Document<unknown, {}, Course> & Omit<Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    findOneAdmin(id: ObjectId): Promise<{
        message: string;
        status: HttpStatus;
        data: import("mongoose").Document<unknown, {}, Course> & Omit<Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    update(id: ObjectId, updateCourse: UpdateCourseDto): Promise<{
        message: string;
        status: HttpStatus;
        data: any;
    }>;
    deleteCourse(id: ObjectId): Promise<{
        message: string;
        status: HttpStatus;
        data: string;
    }>;
    findAllSortedByPriceDesc(): Promise<{
        message: string;
        status: HttpStatus;
        data: (import("mongoose").Document<unknown, {}, Course> & Omit<Course & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    deleteCourseByAdmin(id: ObjectId): Promise<{
        message: string;
        status: HttpStatus;
        data: string;
    }>;
    purchaseCourse(purchaseCourseDto: PurchaseCourseDto): Promise<{
        message: string;
        status: HttpStatus;
        data: string;
    }>;
}
