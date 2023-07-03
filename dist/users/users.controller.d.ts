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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { UpdateUserByAdminDto } from './dto/update-user-byadmin.dto ';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(registerUserDto: RegisterUserDto): Promise<{
        message: string;
        status?: undefined;
        data?: undefined;
    } | {
        message: string;
        status: number;
        data: string;
    }>;
    findAllAdmin(): Promise<{
        message: string;
        status: number;
        users: (import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & Omit<import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    findOne(id: ObjectId): Promise<{
        message: string;
        status: number;
        data: import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & Omit<import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    findAll(): Promise<{
        message: string;
        status: number;
        users: (import("mongoose").FlattenMaps<import("./schemas/user.schema").User> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    update(updateUserDto: UpdateUserDto): Promise<{
        message: string;
        status: number;
        data: import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & Omit<import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updateUserByAdmmin(updateUserByAdminDto: UpdateUserByAdminDto): Promise<{
        message: string;
        status: number;
        data: import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & Omit<import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    deleteUserByAdmin(id: ObjectId): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: string;
    }>;
    remove(id: string): string;
}
