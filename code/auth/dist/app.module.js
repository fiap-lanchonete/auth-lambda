"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const prisma_helper_1 = require("./adapters/database/helpers/prisma.helper");
const user_repository_1 = require("./adapters/database/repositories/user.repository");
const login_service_1 = require("./application/usecases/login.service");
const register_service_1 = require("./application/usecases/register.service");
const anonymous_service_1 = require("./application/usecases/anonymous.service");
const auth_controller_1 = require("./adapters/controllers/auth.controller");
const dotenv_1 = require("dotenv");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./core/config/jwt.strategy");
const user_service_1 = require("./application/services/user.service");
(0, dotenv_1.config)();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: `${process.env.JWT_SECRET_KEY}`,
                signOptions: { expiresIn: '30mn' },
            }),
        ],
        controllers: [
            auth_controller_1.AuthController
        ],
        providers: [
            user_service_1.UserService,
            login_service_1.LoginService,
            register_service_1.RegisterService,
            anonymous_service_1.AnonymousService,
            {
                provide: 'UserRepository',
                useClass: user_repository_1.UserRepository,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
            jwt_1.JwtService,
            jwt_strategy_1.JwtStrategy,
            prisma_helper_1.PrismaHelper
        ],
        exports: [
            user_service_1.UserService,
            jwt_1.JwtService,
            jwt_strategy_1.JwtStrategy,
            prisma_helper_1.PrismaHelper,
            {
                provide: 'UserRepository',
                useClass: user_repository_1.UserRepository,
            },
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map