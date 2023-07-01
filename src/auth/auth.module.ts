import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
	imports: [ UsersModule, JwtModule.register({
		global: true,
		secret: process.env.SECRET
	}) ],
	controllers: [ AuthController ],
	providers: [ AuthService ],
	exports: [ AuthModule ]
})
export class AuthModule {}
