import { ObjectId } from 'mongoose';
export declare class RecoverRequestDto {
    _id: ObjectId;
    email: string;
    recovery_token: string;
}
