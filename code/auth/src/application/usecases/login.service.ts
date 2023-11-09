import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { JwtService } from "@nestjs/jwt";
import { config } from 'dotenv';
config();

@Injectable()
export class LoginService {
    private readonly logger = new Logger(LoginService.name);
    constructor(
        private readonly user: UserService,
        private readonly jwt: JwtService
    ){}
    async execute(data) {
/*         const user = await this.user.findOne({ cpf: data.cpf }) */

/*         if(!user) {
            this.logger.error("USER NOT FOUND")
            throw new NotFoundException("User not found")
        }
        this.logger.log("LOGIN", user) */
        return this.jwt.sign({ name: "test", email: "teste@email.com"}, { secret: process.env.JWT_SECRET_KEY ?? "kajsldjasjdlsajldasd" })
    }
}