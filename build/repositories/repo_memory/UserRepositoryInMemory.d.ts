import { User } from "../../@types/User";
declare class UserRepositoryInMemory {
    users: User[];
    verifyEmailExists(email: string): Promise<User>;
    verifyUserExists(id: number): Promise<User>;
    allUsers(): Promise<User[]>;
    create({ name, email, password }: User): Promise<{
        id: number;
    }>;
    update({ name, email, id }: {
        name: string;
        email: string;
        id: number;
    }): Promise<{
        id: number;
    }>;
}
export { UserRepositoryInMemory };
