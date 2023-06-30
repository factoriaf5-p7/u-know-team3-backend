import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { ObjectId } from 'mongoose';
import { ArrayMaxSize, IsArray, IsNotEmpty } from 'class-validator';

export class RatedCourseDto {

	@ApiProperty({ example: '64134kjh2h2asd34' })
	@IsNotEmpty()
		_id: ObjectId;

	@ApiProperty({ example: '5' })
	@IsNotEmpty()
		stars: number;
	
}
