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
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RecoverUserDto } from './dto/recover-user.dto';
import { RecoverRequestDto } from './dto/recover-request.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    findOne(user: GetUserLoginDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        user: import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User> & Omit<import("../users/schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    signup(user: RegisterUserDto): Promise<{
        message: string;
        status?: undefined;
    } | {
        message: string;
        status: number;
    }>;
    recoverPasswordRequest(user: RecoverRequestDto): Promise<{
        message: string;
        status: number;
        user: import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User> & Omit<import("../users/schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updatePassword(user: RecoverUserDto): Promise<{
        message: string;
        status: number;
        user: import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User> & Omit<import("../users/schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
}
