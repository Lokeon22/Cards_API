import { User, UserCreateProps } from "../@types/User";
declare class UserRepository {
    verifyEmailExists(email: string): Promise<User>;
    verifyUserExists(id: number): Promise<User>;
    allUsers(): Promise<User[]>;
    create({ name, email, password }: UserCreateProps): Promise<{
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
export { UserRepository };
