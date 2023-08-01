import { User } from "../@types/User";

class UserRepositoryInMemory {
  users: User[] = [];

  async verifyEmailExists(email: string) {
    const verifyEmail = this.users.find((user) => user.email === email) as User;

    return verifyEmail;
  }

  async create({ name, email, password }: User) {
    const user: User = {
      id: Math.floor(Math.random() * 100),
      name,
      email,
      password,
      avatar: null,
      created_at: new Date(),
    };

    this.users.push(user);

    return { id: user.id };
  }
}

export { UserRepositoryInMemory };
