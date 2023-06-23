/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() registerUserDto: RegisterUserDto) {
		return this.usersService.create(registerUserDto);
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
