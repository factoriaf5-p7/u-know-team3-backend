import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Course {
    @ApiProperty({ example: 'Introduction to Web Development' })
    @Prop()
    	name: string;

    @ApiProperty({ example: 59.99 })
    @Prop()
    	price: number;

    @ApiProperty({ example: 'Web Development' })
    @Prop()
    	topic: string;

    @ApiProperty({ example: 'Beginner' })
    @Prop()
    	difficulty: string;

    @ApiProperty({ example: [ 'HTML', 'CSS', 'JavaScript' ] })
    @Prop()
    	tags: [];

    @ApiProperty({ example: [ { 
    	_id_comment: ObjectId('60c2ef21eef77c001f84c8f2'),
    	stars: 4
    },
    {
    	_id_comment: ObjectId('60c2ef21eef77c001f84c8f3'),
    	stars: 5
    } ] })
    @Prop()
    	reviews: [];

          @ApiProperty( { example: '# Introduction to Web Development\n\nWelcome to the Introduction to Web Development course! In this course, you will learn the fundamentals of web development using HTML, CSS, and JavaScript.\n\n## Course Outline\n\n### Chapter 1: HTML Basics\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to HTML\n- HTML tags and elements\n- Building a basic HTML webpage\n\n### Chapter 2: CSS Styling\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to CSS\n- Selectors and properties\n- Applying styles to HTML elements\n\n### Chapter 3: JavaScript Fundamentals\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to JavaScript\n- Variables and data types\n- Control flow and functions\n\n## Conclusion\n\nCongratulations on completing the Introduction to Web Development course! We hope you\'ve gained a solid foundation in web development.' } )
    @Prop()
    	content: string;
}

