/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/users/schemas/user.schema';

@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

  @Post('create/:userid')
  @UseGuards(AuthGuard)
	create(@Param('userid') userId: ObjectId, @Body() createCourseDto: CreateCourseDto) {
		return this.coursesService.create(userId, createCourseDto);
	}

  @Get('created-courses/:userid')
  @UseGuards(AuthGuard)
  showCreatedCourses(@Param('userid') userId: ObjectId){
  	return this.coursesService.findCreatedCourses(userId);
  }

  @Get('average')
  findAllSortedByAverage() {
  	return this.coursesService.findAllSortedByAverage();
  }

  @Get()
  @UseGuards(AuthGuard) //'admin'
  findAll() {
  	return this.coursesService.findAll();
  }

  @Get('bought-courses/:userid')
  @UseGuards(AuthGuard)
  findBoughtCourses(@Param('userid') userId: ObjectId) {
  	return this.coursesService.findBoughtCourses(userId);
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
  @UseGuards(AuthGuard)
  update(@Param('id') id: ObjectId, @Body() updateCourseDto: UpdateCourseDto){
  	return this.coursesService.update(id, updateCourseDto);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  deleteCourse(@Query('id') id: ObjectId) {
  	return this.coursesService.deleteCourse(id);
  }

  @Delete('admin/delete')
  @UseGuards(AuthGuard)
  deleteCourseByAdmin(@Query('id') id: ObjectId) {
  	return this.coursesService.deleteCourseByAdmin(id);
  }

  @Post('purchase')
  @UseGuards(AuthGuard)
  purchaseCourse(@Body() userId: ObjectId , courseId : ObjectId) {
    return this.coursesService.purchaseCourse(userId, courseId);
  }

}