import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		// get the roles required
		const roles = this.reflector.getAllAndOverride<string[]>('roles', [ context.getHandler(), context.getClass() ]);
		if (!roles) {
			return false;
		}
		const request = context.switchToHttp().getRequest();
		const userRoles = request.headers?.role?.split(',');    
		return this.validateRoles(roles, userRoles);
	}

	validateRoles(roles: string[], userRoles: string[]) {
		if(userRoles) return roles.some(role => userRoles.includes(role));
		throw new HttpException('Incorrect profile data', HttpStatus.BAD_REQUEST);
	}
}