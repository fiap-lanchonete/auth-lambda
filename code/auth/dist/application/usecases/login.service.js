"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LoginService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const jwt_1 = require("@nestjs/jwt");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let LoginService = LoginService_1 = class LoginService {
    constructor(user, jwt) {
        this.user = user;
        this.jwt = jwt;
        this.logger = new common_1.Logger(LoginService_1.name);
    }
    async execute(data) {
        const user = await this.user.findOne({ cpf: data.cpf });
        if (!user) {
            this.logger.error("USER NOT FOUND");
            throw new common_1.NotFoundException("User not found");
        }
        this.logger.log("LOGIN", user);
        return this.jwt.sign(user, { secret: process.env.JWT_SECRET_KEY });
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = LoginService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], LoginService);
//# sourceMappingURL=login.service.js.map