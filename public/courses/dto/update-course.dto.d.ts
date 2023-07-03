import { ObjectId } from 'mongoose';
export declare class UpdateCourseDto {
    _id: ObjectId;
    name: string;
    topic: string;
    difficulty: string;
    tags: [string, string, string];
    content: string;
}
