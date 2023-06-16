import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';

@Module({
	imports: [
		UsersModule,
		CoursesModule,
		MongooseModule.forRoot('mongodb://localhost:27017/uknow'),
	],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule { }
