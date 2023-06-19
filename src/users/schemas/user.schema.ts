import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ typeKey: '$type' })
export class User {

	@ApiProperty({ example: 'Jhon' })
	@Prop()
		name: string;

	@ApiProperty({ example: 'Connor' })
	@Prop()
		last_name: string;

	@ApiProperty({ example: 'jhon.connor@judgmentday.com' })
	@Prop()
		email: string; 

	@ApiProperty({ example: '12345' })
	@Prop()
		password: string;

	@ApiProperty({ example: 100 })
	@Prop()
		wallet_balance: number;

	@ApiProperty({ example: [ 'Bought Course 1', 'Bought Course 2' ] })
	@Prop()
		bought_courses: [];

	@ApiProperty({ example: [ 'Created Course 1', 'Created Course 2' ] })
	@Prop()
		created_courses: [];

	@ApiProperty({ example: [ { sent_to_user: 1, sent_date: '2023-06-20 10:30' },  { sent_to_user: 5, sent_date: '2023-06-23 17:00' } ] })
	@Prop()
		chat_notifications_sent: [];

	@ApiProperty({ example: [ { recieved_from_user: 1, requested_date: '2023-06-20 10:30' },  { recieved_from_user: 5, requested_date: '2023-06-23 17:00' } ] })
	@Prop()
		chat_notifications_recieved: [];

	@ApiProperty({ example: 'user | admin' })
	@Prop()
		profile: string;

	@ApiProperty({ example: '4j4jllleu99xaey21' })
	@Prop()
		recovery_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);