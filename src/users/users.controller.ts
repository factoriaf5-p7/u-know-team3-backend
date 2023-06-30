/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@UseGuards(AuthGuard) // admin
	create(@Body() registerUserDto: RegisterUserDto) {
		return this.usersService.create(registerUserDto);
	}

  	@Get()
	@UseGuards(AuthGuard) //admin
	findAll() {
		return this.usersService.findAll();
	}

	@Get('admin')
  	findAllAdmin() {
  		return this.usersService.findAllAdmin();
  	}

  	@Get(':id')
	@UseGuards(AuthGuard) //admin
  	findOne(@Param('id') id: ObjectId) {
  		return this.usersService.findOne(id);
  	}

  	@Patch(':id')
	@UseGuards(AuthGuard)
  	update(@Body() updateUserDto: UpdateUserDto) {
  		return this.usersService.update(updateUserDto);
	  }

	@Delete('admin/delete')
  	@UseGuards(AuthGuard) //admin
  	deleteUserByAdmin(@Query('id') id: ObjectId) {
  		return this.usersService.deleteUserByAdmin(id);
  	}
}