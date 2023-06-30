import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		// MongooseModule.forRoot('mongodb://127.0.0.1:27017/uknow'),
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/uknow'),
		UsersModule,
		CoursesModule,
		AuthModule,
	],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule { }
