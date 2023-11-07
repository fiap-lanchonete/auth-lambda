import { UserService } from "../services/user.service";
import { JwtService } from "@nestjs/jwt";
export declare class AnonymousService {
    private readonly user;
    private readonly jwt;
    private readonly logger;
    constructor(user: UserService, jwt: JwtService);
    execute(): Promise<string>;
}
