import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, IsEnum } from 'class-validator';

enum Difficulty {
	Begginer = 'Beginner',
	Medium = 'Medium',
	Advanced = 'Advanced'
}

export class CreateCourseDto {
	@ApiProperty({ example: 'How to validate dtos properties' })
	@IsString()
	@IsNotEmpty()
		name: string;

	@ApiProperty({ example: 'Web development | Backend | Frontend ' })
	@IsString()
	@IsNotEmpty()
		topic: string;

	@ApiProperty({ example: 'Beginner | Medium | Advanced' })
	@IsString()
	@IsEnum(Difficulty)
	@IsNotEmpty()
		difficulty: string;
	
	@ApiProperty({ example: '#webdevolopment, #javascript, #css' })
	@IsArray()
	@ArrayMaxSize(3)
		tags: [string, string, string];
	
	@ApiProperty({ example: '### How to validate dtos properties<br>## Class-validator<br>To validate install the package as follow: nmp i class-validator.' })
	@IsString()
	@IsNotEmpty()
		content: string;
}
