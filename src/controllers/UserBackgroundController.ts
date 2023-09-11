import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { DiskStorage } from "../providers/DiskStorage";

import { User } from "../@types/User";
import { AppError } from "../utils/AppError";

class BackgroundController {
  async update(req: Request, res: Response) {
    const id = req.user.id;
    const background_image = req.file?.filename;

    const user: User = await knex("users").where({ id }).first();

    const diskStorage = new DiskStorage();

    if (!user) throw new AppError("Usuario não encontrado");

    if (!background_image) throw new AppError("Insira uma imagem");

    const filename = await diskStorage.saveFile(background_image);

    if (user && user.background) {
      await diskStorage.deleteFile(user.background);

      await knex("users").where({ id }).update({
        background: filename,
      });
    } else {
      await knex("users").where({ id }).update({
        background: filename,
      });
    }

    return res.json({ message: "Background atualizado" });
  }
}

export { BackgroundController };
