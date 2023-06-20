/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// @Post()
	// create(@Body() createUserDto: CreateUserDto) {
	// 	return this.usersService.create(createUserDto);
	// }

  @Get()
	findAll() {
  	return this.usersService.findAll();
	}

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
  	return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto) {
  	return this.usersService.update(updateUserDto);
  }

  // @Patch([ ':id', ':rtoken' ])
  // update(@Param() id: string, token: string, @Body() password: string) {
  // 	return this.usersService.update(id, token, password);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
  	return this.usersService.remove(+id);
  }
}
