import { ObjectId } from 'mongoose';
export declare class UpdateUserByAdminDto {
    _id: ObjectId;
    name: string;
    last_name: string;
    email: string;
    password: string;
    wallet_balance: number;
    bought_courses: [];
    created_courses: [];
    chat_notifications_sent: [];
    chat_notifications_recieved: [];
    profile: string;
    recovery_token: string;
}
