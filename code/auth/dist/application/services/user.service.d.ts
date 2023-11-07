import { IUser } from '../interfaces/user.repository.interface';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: IUser);
    findAll(): Promise<User.Data[]>;
    findOne(filter: Partial<User.Data>): Promise<User.Data | null>;
    findById(id: number): Promise<User.Data | null>;
    create(user: Partial<User.Data>): Promise<User.Data>;
    update(id: number, data: Partial<User.Data>): Promise<User.Data | null>;
    delete(id: number): Promise<void>;
}
