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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("../../application/dtos/login.dto");
const register_dto_1 = require("../../application/dtos/register.dto");
const anonymous_service_1 = require("../../application/usecases/anonymous.service");
const login_service_1 = require("../../application/usecases/login.service");
const register_service_1 = require("../../application/usecases/register.service");
let AuthController = class AuthController {
    constructor(loginService, registerService, anonymousService) {
        this.loginService = loginService;
        this.registerService = registerService;
        this.anonymousService = anonymousService;
    }
    async anonymous() {
        return await this.anonymousService.execute();
    }
    async login(data) {
        return await this.loginService.execute(data);
    }
    async register(data) {
        return await this.registerService.execute(data);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Realiza login em modo anônimo' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDTO }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Login realizado criado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Login não autorizado' }),
    (0, common_1.Post)("login/anonymous"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "anonymous", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Fazer Login' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDTO }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Login realizado criado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Login não autorizado' }),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Fazer Registro' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDTO }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Registro realizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Registro não autorizado' }),
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Autenticação'),
    (0, common_1.Controller)('v1/auth'),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        register_service_1.RegisterService,
        anonymous_service_1.AnonymousService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map