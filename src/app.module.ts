import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/uknow'),
		// MongooseModule.forRootAsync({}`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`}),
		// MongooseModule.forRootAsync({
		// 	imports: [ ConfigModule ],
		// 	useFactory: async (configService: ConfigService) => ({
		// 		uri: configService.get<string>('MONGODB_URI'),
		// 	}),
		// 	inject: [ ConfigService ],
		// }),
		// MongooseModule.forRoot('mongodb://host.docker.internal:27017/uknow'), DOCKER VERSION FOR MAC AND LINUX
		ConfigModule.forRoot({
			isGlobal: true,
			// envFilePath: `${process.env.NODE_ENV}.env` 
		}),
		UsersModule,
		CoursesModule,
		AuthModule,
	],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule { }
