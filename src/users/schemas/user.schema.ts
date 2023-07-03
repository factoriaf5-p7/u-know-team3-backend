/* eslint-disable no-mixed-spaces-and-tabs */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Schema as MongooseSchema, Types, ObjectId } from 'mongoose';
import { Course } from '../../courses/schemas/course.schema';
import { Type } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ example: 'Jhon' })
  @Prop({ required: true })
  	name: string;

  @ApiProperty({ example: 'Connor' })
  @Prop({ required: true })
  	last_name: string;

  @ApiProperty({ example: 'jhon.connor@judgmentday.com' })
  @Prop({ required: true, index: { unique: true } })
  	email: string;

  @ApiProperty({ example: '12345' })
  @Prop({ required: true })
  	password: string;

  @ApiProperty({ example: 100 })
  @Prop({ required: true, default: 100 })
  	wallet_balance: number;

  @ApiProperty({ example: [ 'Bought Course 1', 'Bought Course 2' ] })
  @Prop({ type: [ { course_id: { type: mongoose.Schema.Types.ObjectId, ref: Course.name }, stars: { type: Number }, commented: { type: Boolean } }  ] })
  	bought_courses: {
    course_id: Course,
    stars: number,
    commented: boolean
  }[];

  @ApiProperty({ example: [ 'Created Course 1', 'Created Course 2' ] })
  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: Course.name } ] })
  	created_courses: Course;

  @ApiProperty({
  	example: [
  		{ sent_to_user: 1, sent_date: '2023-06-20 10:30' },
  		{ sent_to_user: 5, sent_date: '2023-06-23 17:00' },
  	],
  })
  @Prop()
  	chat_notifications_sent: [{
      sent_to_user: ObjectId,
      sent_date: Date
    }];

  @ApiProperty({
  	example: [
  		{ recieved_from_user: 1, requested_date: '2023-06-20 10:30' },
  		{ recieved_from_user: 5, requested_date: '2023-06-23 17:00' },
  	],
  })
  @Prop()
  	chat_notifications_recieved: [{
      recieved_from_user: ObjectId,
      requested_date: Date
    }];

  @ApiProperty({ example: 'user | admin' })
  @Prop({ default: 'user' })
  	profile: string;

  @ApiProperty({ example: '4j4jllleu99xaey21' })
  @Prop()
  	recovery_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
