/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	// @UseGuards(AuthGuard) // admin
	create(@Body() registerUserDto: RegisterUserDto) {
		return this.usersService.create(registerUserDto);
	}

	@Get('admin')
	// @UseGuards(AuthGuard) //admin
  	findAllAdmin() {
  		return this.usersService.findAllAdmin();
  	}

  	@Get(':id')
	// @UseGuards(AuthGuard) //admin
  	findOne(@Param('id') id: ObjectId) {
  		return this.usersService.findOne(id);
  	}

	@Get()
	// @UseGuards(AuthGuard) //admin
  	findAll() {
  		return this.usersService.findAll();
  	}

  	@Patch(':id')
  	// @UseGuards(AuthGuard)
  	update(@Body() updateUserDto: UpdateUserDto) {
  		return this.usersService.update(updateUserDto);
  	}

	@Delete(':id')
	// @UseGuards(AuthGuard) //admin
  	remove(@Param('id') id: string) {
  		return this.usersService.remove(+id);
  	}
}
