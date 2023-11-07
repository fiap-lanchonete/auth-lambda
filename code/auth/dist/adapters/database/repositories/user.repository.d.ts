import { Usuario } from '@prisma/client';
import { PrismaHelper } from '../helpers/prisma.helper';
import { IUser } from 'src/application/interfaces/user.repository.interface';
export declare class UserRepository implements IUser {
    private readonly prisma;
    constructor(prisma: PrismaHelper);
    findAll(): Promise<Usuario[]>;
    findOne(filter: Partial<Usuario>): Promise<Usuario>;
    findById(id: number): Promise<Usuario>;
    create(usuario: Usuario): Promise<Usuario>;
    update(id: number, usuario: Usuario): Promise<Usuario>;
    remove(id: number): Promise<void>;
}
