import { UserRepository } from "../repositories/UserRepository";
declare class SessionsLoginServices {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    execute({ email, password }: {
        email: string;
        password: string;
    }): Promise<{
        user: import("../@types/User").User;
        token: string;
    }>;
}
export { SessionsLoginServices };
