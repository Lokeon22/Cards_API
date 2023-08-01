import { connection as knex } from "../database/knex";
import { User, UserCreateProps } from "../@types/User";

class UserRepository {
  async verifyEmailExists(email: string) {
    const verifyEmail: User = await knex("users").where({ email }).first();

    return verifyEmail;
  }

  async create({ name, email, password }: UserCreateProps) {
    const [user_id] = await knex("users").insert({ name, email, password });

    return { id: user_id };
  }
}

export { UserRepository };
