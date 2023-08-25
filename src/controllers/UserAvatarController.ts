import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { DiskStorage } from "../providers/DiskStorage";

import { AppError } from "../utils/AppError";
import { User } from "../@types/User";

class AvatarController {
  async update(req: Request, res: Response) {
    const id = req.user.id;
    const image = req.file?.filename;

    const user: User = await knex("users").where({ id }).first();

    const diskStorage = new DiskStorage();

    if (!user) throw new AppError("Usuario não encontrado");

    if (!image) throw new AppError("Insira uma imagem");

    const filename = await diskStorage.saveFile(image);

    if (user && user.avatar) {
      await diskStorage.deleteFile(user.avatar);

      await knex("users").where({ id }).update({
        avatar: filename,
      });
    } else {
      await knex("users").where({ id }).update({
        avatar: filename,
      });
    }

    return res.json({ message: "Avatar atualizado" });
  }
}

export { AvatarController };
