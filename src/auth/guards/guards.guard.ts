import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GuardsGuard implements CanActivate {
	canActivate(context: ExecutionContext,): Promise<boolean>{
		
		return true;
	}
}
