import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { UserService } from "../services/user.service";

@Injectable()
export class RegisterService {
    private readonly logger = new Logger(RegisterService.name);
    constructor(
        private readonly user: UserService,
    ){}

    async execute(data) {
        const user = await this.user.findOne({ cpf: data.cpf })

        if(user) {
            this.logger.error("USER NOT FOUND")
            throw new ForbiddenException("User already exists")
        }

        this.logger.log("CREATE NEW USER", data)
        await this.user.create(data)
        return 
    }
}