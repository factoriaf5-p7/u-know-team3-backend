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
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, ObjectId } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { RecoverUserDto } from 'src/auth/dto/recover-user.dto';
import { RecoverRequestDto } from 'src/auth/dto/recover-request.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(user: RegisterUserDto): Promise<{
        message: string;
        status?: undefined;
    } | {
        message: string;
        status: number;
    }>;
    findAll(): Promise<{
        message: string;
        status: number;
        users: (import("mongoose").FlattenMaps<User> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    findOneLogin(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findOne(id: ObjectId): Promise<{
        message: string;
        status: number;
        user: import("mongoose").Document<unknown, {}, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    update(user: UpdateUserDto): Promise<{
        message: string;
        status: number;
        user: import("mongoose").Document<unknown, {}, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updatePassword(user: RecoverUserDto): Promise<{
        message: string;
        status: number;
        user: import("mongoose").Document<unknown, {}, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updateRecoveryToken(user: RecoverRequestDto): Promise<{
        message: string;
        status: number;
        user: import("mongoose").Document<unknown, {}, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    remove(id: number): string;
}
