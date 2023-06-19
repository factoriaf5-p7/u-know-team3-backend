import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    findOne(user: GetUserLoginDto): Promise<any>;
}
