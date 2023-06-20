/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

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

  @Delete(':id')
  remove(@Param('id') id: string) {
  	return this.usersService.remove(+id);
  }
}
