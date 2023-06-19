import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [ UsersModule, JwtModule.register({ secret: 'Th3 s3cr3t t0 k33p s4v3 t0k3ns 4nd s3rv3r' }) ],
	controllers: [ AuthController ],
	providers: [ AuthService ]
})
export class AuthModule {}
