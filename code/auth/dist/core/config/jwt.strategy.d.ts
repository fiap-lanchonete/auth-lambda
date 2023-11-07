declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate({ id, cpf, nome, email }: {
        id: any;
        cpf: any;
        nome: any;
        email: any;
    }): Promise<{
        id: any;
        cpf: any;
        nome: any;
        email: any;
    }>;
}
export {};
