import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private jwtService: JwtService
	) {}

	async canActivate(context: ExecutionContext,): Promise<boolean>{
		const request = context.switchToHttp().getRequest();
		const token = this._extractTokenFromHeader(request);

		console.log(token);

		if(!token) throw new Error('No token in request');

		try {
			// const payload = await this.jwtService.verifyAsync(token, { secret: 'Th3 s3cr3t t0 k33p s4v3 t0k3ns 4nd s3rv3r' });
			// request['user'] = payload;
			return Promise.resolve(true);
		} catch (error) {
			throw error;
		}
	}

	private async _extractTokenFromHeader(req: Request) {
		try{ 
			const [ type, token ] = req.headers.authorization.split(' ');
			return type === 'Bearer' ? token : undefined;
		} catch(error) {
			throw error;
		}
	}
}
