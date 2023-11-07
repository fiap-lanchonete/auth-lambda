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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_helper_1 = require("../helpers/prisma.helper");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return await this.prisma.usuario.findMany();
    }
    async findOne(filter) {
        return (await this.prisma.usuario.findMany({
            where: filter,
        }))[0];
    }
    async findById(id) {
        return await this.prisma.usuario.findUnique({
            where: { id },
        });
    }
    async create(usuario) {
        return await this.prisma.usuario.create({
            data: usuario,
        });
    }
    async update(id, usuario) {
        return await this.prisma.usuario.update({
            where: { id },
            data: usuario,
        });
    }
    async remove(id) {
        await this.prisma.usuario.delete({
            where: { id },
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_helper_1.PrismaHelper])
], UserRepository);
//# sourceMappingURL=user.repository.js.map