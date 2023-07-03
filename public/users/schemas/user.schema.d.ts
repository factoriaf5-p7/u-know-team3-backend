import mongoose, { HydratedDocument, Types, ObjectId } from 'mongoose';
import { Course } from '../../courses/schemas/course.schema';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    last_name: string;
    email: string;
    password: string;
    wallet_balance: number;
    bought_courses: {
        course_id: Course;
        stars: number;
        commented: boolean;
    }[];
    created_courses: Course;
    chat_notifications_sent: [
        {
            sent_to_user: ObjectId;
            sent_date: Date;
        }
    ];
    chat_notifications_recieved: [
        {
            recieved_from_user: ObjectId;
            requested_date: Date;
        }
    ];
    profile: string;
    recovery_token: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & Omit<User & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & Omit<mongoose.FlatRecord<User> & {
    _id: Types.ObjectId;
}, never>>;
