import { HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model, ObjectId } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { RecoverUserDto } from 'src/auth/dto/recover-user.dto';
import { RecoverRequestDto } from 'src/auth/dto/recover-request.dto';
import { Course } from '../courses/schemas/course.schema';
import { RatedCourseDto } from '../courses/dto/rate-course.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(user: RegisterUserDto): Promise<{
        message: string;
        status?: undefined;
        data?: undefined;
    } | {
        message: string;
        status: number;
        data: string;
    }>;
    addCreatedCourse(userId: ObjectId, courseId: mongoose.Types.ObjectId): Promise<{
        message: string;
        status: HttpStatus;
        data: string;
    }>;
    findAll(): Promise<{
        message: string;
        status: number;
        users: (mongoose.FlattenMaps<User> & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    findAllAdmin(): Promise<{
        message: string;
        status: number;
        data: (mongoose.Document<unknown, {}, User> & Omit<User & {
            _id: mongoose.Types.ObjectId;
        }, never>)[];
    }>;
    findOneLogin(email: string): Promise<mongoose.Document<unknown, {}, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    findOne(id: ObjectId): Promise<{
        message: string;
        status: number;
        data: mongoose.Document<unknown, {}, User> & Omit<User & {
            _id: mongoose.Types.ObjectId;
        }, never>;
    }>;
    findOneWithCreatedCourses(id: ObjectId): Promise<{
        message: string;
        status: number;
        data: mongoose.Document<unknown, {}, User> & Omit<User & {
            _id: mongoose.Types.ObjectId;
        }, never>;
    }>;
    findOneWithBoughtCourses(id: ObjectId): Promise<{
        message: string;
        status: number;
        data: mongoose.Document<unknown, {}, User> & Omit<User & {
            _id: mongoose.Types.ObjectId;
        }, never>;
    }>;
    update(user: UpdateUserDto): Promise<{
        message: string;
        status: number;
        data: mongoose.Document<unknown, {}, User> & Omit<User & {
            _id: mongoose.Types.ObjectId;
        }, never>;
    }>;
    updateUserByAdmmin(user: UpdateUserDto): Promise<{
        message: string;
        status: number;
        data: mongoose.Document<unknown, {}, User> & Omit<User & {
            _id: mongoose.Types.ObjectId;
        }, never>;
    }>;
    updatePassword(user: RecoverUserDto): Promise<{
        message: string;
        status: number;
        data: string;
    }>;
    updateRecoveryToken(user: RecoverRequestDto): Promise<{
        message: string;
        status: number;
        data: mongoose.Document<unknown, {}, User> & Omit<User & {
            _id: mongoose.Types.ObjectId;
        }, never>;
    }>;
    findAllBoughtCourses(user: any, filter: any): Promise<{
        message: string;
        status: number;
        data: (mongoose.FlattenMaps<User> & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    deleteUserByAdmin(id: ObjectId): Promise<{
        message: string;
        status: HttpStatus;
        data: string;
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
    remove(id: number): string;
    updateUserBoughtCourses(userId: mongoose.Types.ObjectId, course: any): Promise<mongoose.Document<unknown, {}, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
}
