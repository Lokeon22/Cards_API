import { UserRepository } from "../repositories/UserRepository";
import { UserCreateProps } from "../@types/User";
declare class UserCreateServices {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    execute({ name, email, password }: UserCreateProps): Promise<{
        id: number;
    }>;
    execute_update({ id, name, email }: {
        id: number;
        name: string;
        email: string;
    }): Promise<{
        id: number;
    }>;
}
export { UserCreateServices };
