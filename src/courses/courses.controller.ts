/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ObjectId } from 'mongoose';

@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

  @Post('create')
	create(@Body() createCourseDto: CreateCourseDto) {
		return this.coursesService.create(createCourseDto);
	}

  @Get('created-courses/:userid')
  showCreatedCourses(@Param('userid') userId: ObjectId){
  	return this.coursesService.findCreatedCourses(userId);
  }

  @Get('average')
  findAllSortedByAverage() {
  	return this.coursesService.findAllSortedByAverage();
  }

  @Get()
  findAll() {
  	return this.coursesService.findAll();
  }

  @Get('search')
  search(@Query() query) {
  	return this.coursesService.search(query.filters, query.keywords);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
  	return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateCourseDto: UpdateCourseDto){
  	return this.coursesService.update(id, updateCourseDto);
  }

  @Delete('delete')
  deleteCourse(@Query('id') id: ObjectId) {
  	return this.coursesService.deleteCourse(id);
  }
}
