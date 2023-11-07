import { UserService } from "../services/user.service";
export declare class RegisterService {
    private readonly user;
    private readonly logger;
    constructor(user: UserService);
    execute(data: any): Promise<void>;
}
