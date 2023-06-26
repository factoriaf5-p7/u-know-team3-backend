import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { ObjectId } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export class UpdateContentDto {
	@ApiProperty({ example: '### New course name' })
	@IsNotEmpty()
		content: string;
}
