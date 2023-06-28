import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GuardsGuard implements CanActivate {

	constructor(
		private jwtService: JwtService,
		private userService: UsersService
	) {}

	canActivate(context: ExecutionContext,): Promise<boolean>{
		const request = context.switchToHttp().getRequest();
		const token = this._extractTokenFromHeader(request);

		if(!token) {
			throw new Error('No token in request');
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, { secret: })
		} catch (error) {
			
		}
		return true;
	}
}
