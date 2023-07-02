
/* eslint-disable no-mixed-spaces-and-tabs */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Course {
  @ApiProperty({ example: 'Introduction to Web Development' })
  @Prop({ required: true })
  	name: string;

  @ApiProperty({ example: 59.99 })
  @Prop({ required: true, default: 100 })
  	price: number;

  @ApiProperty({ example: 'Web Development' })
  @Prop({ required: true, enum: [ 'Web Development', 'Frontend', 'Backend' ] })
  	topic: string;

  @ApiProperty({ example: 'Beginner' })
  @Prop({ required: true, enum: [ 'Beginner', 'Medium', 'Advanced' ] })
  	difficulty: string;

  @ApiProperty({ example: [ 'HTML', 'CSS', 'JavaScript' ] })
  @Prop()
  	tags: [];
  @ApiProperty({ example: true })
  @Prop({ default: false })
  	bought: boolean;

  @ApiProperty( { example: '# Introduction to Web Development\n\nWelcome to the Introduction to Web Development course! In this course, you will learn the fundamentals of web development using HTML, CSS, and JavaScript.\n\n## Course Outline\n\n### Chapter 1: HTML Basics\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to HTML\n- HTML tags and elements\n- Building a basic HTML webpage\n\n### Chapter 2: CSS Styling\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to CSS\n- Selectors and properties\n- Applying styles to HTML elements\n\n### Chapter 3: JavaScript Fundamentals\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to JavaScript\n- Variables and data types\n- Control flow and functions\n\n## Conclusion\n\nCongratulations on completing the Introduction to Web Development course! We hope you\'ve gained a solid foundation in web development.' } )
  @Prop( { required: true })
    	content: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
