import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

	@ApiProperty({ example: 'Jhon' })
		name: string;

	@ApiProperty({ example: 'Connor' })
		last_name: string;

	@ApiProperty({ example: 'jhon.connor@judgmentday.com' })
		email: string; 

	@ApiProperty({ example: '12345' })
		password: string;

	@ApiProperty({ example: 100 })
		wallet_balance: number;

	@ApiProperty({ example: [ 'Bought Course 1', 'Bought Course 2' ] })
		bought_courses: [];

	@ApiProperty({ example: [ 'Created Course 1', 'Created Course 2' ] })
		created_courses: [];

	@ApiProperty({ example: [ { sent_to_user: 1, sent_date: '2023-06-20 10:30' },  { sent_to_user: 5, sent_date: '2023-06-23 17:00' } ] })
		chat_notifications_sent: [];

	@ApiProperty({ example: [ { recieved_from_user: 1, requested_date: '2023-06-20 10:30' },  { recieved_from_user: 5, requested_date: '2023-06-23 17:00' } ] })
		chat_notifications_recieved: [];

	@ApiProperty({ example: 'user | admin' })
		profile: string;

	@ApiProperty({ example: '4j4jllleu99xaey21' })
		recovery_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);