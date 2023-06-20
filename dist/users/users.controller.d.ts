import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): mongoose.Query<(mongoose.Document<unknown, {}, import("./schemas/user.schema").User> & Omit<import("./schemas/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    }, never>)[], mongoose.Document<unknown, {}, import("./schemas/user.schema").User> & Omit<import("./schemas/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    }, never>, {}, import("./schemas/user.schema").User, "find">;
    findOne(id: ObjectId): Promise<import("./schemas/user.schema").User>;
    update(updateUserDto: UpdateUserDto): Promise<mongoose.Document<unknown, {}, import("./schemas/user.schema").User> & Omit<import("./schemas/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    remove(id: string): string;
}
