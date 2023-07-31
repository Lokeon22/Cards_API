import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { hash } from "bcrypt";

import { AppError } from "../utils/AppError";
import { User } from "../@types/User";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Preencha todos os campos");
    }

    const [verifyEmail] = await knex("users").where({ email });

    if (verifyEmail) throw new AppError("Esse email já existe");

    const hashPass = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashPass });

    return res.json({ message: "Conta criada" });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email }: { name: string; email: string } = req.body;

    const user: User = await knex("users").where({ id }).first();

    if (!user) throw new AppError("Usuário não encontrado");

    knex("users")
      .where({ id })
      .update({
        name: name ?? user.name,
        email: email ?? user.email,
      });

    return res.json({ message: "Perfil atualizado" });
  }
}

export { UserController };
