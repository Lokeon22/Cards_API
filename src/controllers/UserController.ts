import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserCreateServices } from "../services/UserCreateServices";

import { AppError } from "../utils/AppError";
import { User } from "../@types/User";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateServices(userRepository);

    await userCreateService.execute({ name, email, password });

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
