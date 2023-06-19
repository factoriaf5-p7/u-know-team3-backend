import { UsersService } from 'src/users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    findOne(user: GetUserLoginDto): Promise<any>;
}
