import { CreateUserDto } from './create-user.dto';
import { ObjectId } from 'mongoose';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    _id: ObjectId;
}
export {};
