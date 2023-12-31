import { Usuario } from '@prisma/client';

export interface IUser {
  findAll(): Promise<Usuario[]>;
  findOne(filter: Partial<Usuario>): Promise<Usuario | null>;
  findById(id: number): Promise<Usuario | null>;
  create(usuario: Partial<Usuario>): Promise<Usuario | null>;
  update(id: number, pedido: Partial<Usuario>): Promise<Usuario | null>;
  remove(id: number): Promise<void>;
}
