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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from 'src/users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    findOne(user: GetUserLoginDto): Promise<any>;
    register(user: RegisterUserDto): Promise<(import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User> & Omit<import("../users/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>) | {
        message: string;
    }>;
    recoverPasswordRequest(user: RecoverUserDto): Promise<import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User> & Omit<import("../users/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updatePassword(user: RecoverUserDto): Promise<import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User> & Omit<import("../users/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
