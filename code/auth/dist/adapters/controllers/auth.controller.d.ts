import { LoginDTO } from 'src/application/dtos/login.dto';
import { RegisterDTO } from 'src/application/dtos/register.dto';
import { AnonymousService } from 'src/application/usecases/anonymous.service';
import { LoginService } from 'src/application/usecases/login.service';
import { RegisterService } from 'src/application/usecases/register.service';
export declare class AuthController {
    private readonly loginService;
    private readonly registerService;
    private readonly anonymousService;
    constructor(loginService: LoginService, registerService: RegisterService, anonymousService: AnonymousService);
    anonymous(): Promise<string>;
    login(data: LoginDTO): Promise<string>;
    register(data: RegisterDTO): Promise<void>;
}
