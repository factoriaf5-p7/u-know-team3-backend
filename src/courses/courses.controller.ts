/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RatedCourseDto } from './dto/rate-course.dto';
import { PurchaseCourseDto } from './dto/buy-course.dto';
import { Roles } from 'src/auth/guards/roles';
import { Role } from 'src/auth/guards/roles.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

  @Post('create/:userid')
  // @UseGuards(AuthGuard)
	create(@Param('userid') userId: ObjectId, @Body() createCourseDto: CreateCourseDto) {
		return this.coursesService.create(userId, createCourseDto);
	}

  @Get('created-courses/:userid')
  // @UseGuards(AuthGuard)
  showCreatedCourses(@Param('userid') userId: ObjectId){
  	return this.coursesService.findCreatedCourses(userId);
  }

  @Get('average')
  findAllSortedByAverage() {
  	return this.coursesService.findAllSortedByAverage();
  }
  @Get('order-courses-price')
  findAllSortedByPriceDesc() {
  	return this.coursesService.findAllSortedByPriceDesc();
  }

  @Get()
  // @UseGuards(AuthGuard) //'admin'
  findAll() {
  	return this.coursesService.findAll();
  }

  @Get('bought-courses/:userid')
  // @UseGuards(AuthGuard)
  findBoughtCourses(@Param('userid') userId: ObjectId) {
  	return this.coursesService.findBoughtCourses(userId);
  }

  @Get('search')
  search(@Query() query) {
  	return this.coursesService.search(query.filters, query.keywords);
  }

  @Get('search/admin')
  // @UseGuards(AuthGuard)
  searchAdmin(@Query() query) {
  	return this.coursesService.searchAdmin(query.filters, query.keywords);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
  	return this.coursesService.findOne(id);
  }

  @Patch('purchase')
  //@UseGuards(AuthGuard)
  purchaseCourse(@Body() purchaseCourseDto: PurchaseCourseDto) {
  	return this.coursesService.purchaseCourse(purchaseCourseDto);
  }

  @Get('admin/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  // @UseGuards(AuthGuard)
  findOneAdmin(@Param('id') id: ObjectId ) {
  	return this.coursesService.findOneAdmin(id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard)
  update(@Param('id') userId: ObjectId, @Body() updateCourseDto: UpdateCourseDto){
  	return this.coursesService.update(userId, updateCourseDto);
  }

  @Delete('delete')
  // @UseGuards(AuthGuard)
  deleteCourse(@Query('id') id: ObjectId) {
  	return this.coursesService.deleteCourse(id);
  }

  @Delete('admin/delete')
  // @UseGuards(AuthGuard)
  deleteCourseByAdmin(@Query('id') id: ObjectId) {
  	return this.coursesService.deleteCourseByAdmin(id);
  }

  @Patch('rating/:userid')
  // @UseGuards(AuthGuard)
  addRating(@Param('userid') userId: ObjectId, @Body() ratedCourse: RatedCourseDto) {
  	return this.coursesService.addRating(userId, ratedCourse);
  }
}
