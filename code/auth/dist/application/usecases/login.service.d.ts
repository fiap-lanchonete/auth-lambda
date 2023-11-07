import { UserService } from "../services/user.service";
import { JwtService } from "@nestjs/jwt";
export declare class LoginService {
    private readonly user;
    private readonly jwt;
    private readonly logger;
    constructor(user: UserService, jwt: JwtService);
    execute(data: any): Promise<string>;
}
