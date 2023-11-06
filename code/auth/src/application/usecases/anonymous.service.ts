import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { JwtService } from "@nestjs/jwt";
import { config } from 'dotenv';
config();

@Injectable()
export class AnonymousService {
    private readonly logger = new Logger(AnonymousService.name);
    constructor(
        private readonly user: UserService,
        private readonly jwt: JwtService
    ){}
    
    async execute() {
        const user = await this.user.create({}) 
        this.logger.debug("NEW USER ANONYMOUS", user)
        return this.jwt.sign(user)
    }
}