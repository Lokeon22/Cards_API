import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserCreateServices } from "../services/UserCreateServices";

import { connection as knex } from "../database/knex";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateServices(userRepository);

    await userCreateService.execute({ name, email, password });

    return res.json({ message: "Conta criada" });
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;

    const filtered = await knex("users").where({ id }).first();

    return res.json(filtered);
  }

  async show(req: Request, res: Response) {
    const id = req.user.id;

    const user = await new UserRepository().verifyUserExists(id);

    return res.json(user);
  }

  async allusers(req: Request, res: Response) {
    const users = await new UserRepository().allUsers();

    return res.json(users);
  }

  async update(req: Request, res: Response) {
    const id = req.user.id;
    const { name, email }: { name: string; email: string } = req.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateServices(userRepository);

    await userCreateService.execute_update({ id, name, email });

    return res.json({ message: "Perfil atualizado" });
  }
}

export { UserController };
