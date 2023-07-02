import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [ UsersModule, 
		JwtModule.registerAsync({
			imports: [ ConfigModule ],
			useFactory: async (configService: ConfigService) => ({
				global: true,
				secret: configService.get<string>('SECRET')
			}),
			inject: [ ConfigService ],
		}) 
	],
	controllers: [ AuthController ],
	providers: [ AuthService ],
	exports: [ AuthModule ]
})
export class AuthModule {}
