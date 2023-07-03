import { ObjectId } from 'mongoose';
export declare class RecoverUserDto {
    _id: ObjectId;
    email: string;
    password: string;
    recovery_token: string;
}
