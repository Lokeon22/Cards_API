import { connection as knex } from "../database/knex";
import { User, UserCreateProps } from "../@types/User";

class UserRepository {
  async verifyEmailExists(email: string) {
    const verifyEmail: User = await knex("users").where({ email }).first();

    return verifyEmail;
  }

  async verifyUserExists(id: number) {
    const user: User = await knex("users").where({ id }).first();

    return user;
  }

  async create({ name, email, password }: UserCreateProps) {
    const [user_id] = await knex("users").insert({ name, email, password });

    return { id: user_id };
  }

  async update({ name, email, id }: { name: string; email: string; id: number }) {
    const user = await this.verifyUserExists(id);

    const update_user = await knex("users")
      .where({ id })
      .update({
        name: name ?? user.name,
        email: email ?? user.email,
      });

    return { id: update_user };
  }
}

export { UserRepository };
