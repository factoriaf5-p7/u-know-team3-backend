import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
	imports: [ MongooseModule.forRoot('mongodb://localhost:27017/uknow'), UsersModule ],
	controllers: [ AppController ],
	providers: [ AppService ],
=======
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    CoursesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/uknow'),
  ],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 1f0ed2ab4e178b006b183737394b936ce0354824
})
export class AppModule { }
