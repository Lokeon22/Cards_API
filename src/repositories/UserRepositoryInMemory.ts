import { User } from "../@types/User";

class UserRepositoryInMemory {
  users: User[] = [];

  async verifyEmailExists(email: string) {
    const verifyEmail = this.users.find((user) => user.email === email) as User;

    return verifyEmail;
  }

  async verifyUserExists(id: number) {
    const user = this.users.find((user) => user.id === id) as User;

    return user;
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

  async update({ name, email, id }: { name: string; email: string; id: number }) {
    const user = await this.verifyUserExists(id);

    let [users] = [
      {
        id,
        name: name ?? user.name,
        email: email ?? user.email,
      },
    ];

    return { id: users.id };
  }
}

export { UserRepositoryInMemory };
