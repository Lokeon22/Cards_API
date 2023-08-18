import { Request, Response } from "express";
import { connection as knex } from "../database/knex";
import { AppError } from "../utils/AppError";

class ChatController {
  async create(req: Request, res: Response) {
    const sender_id = req.user.id;
    const { receive_id } = req.body;

    try {
      const [chat_id] = await knex("chat").insert({ sender_id, receive_id });

      return res.json({ chat_id });
    } catch (error) {
      throw new AppError("Algo deu errado");
    }
  }

  async index(req: Request, res: Response) {
    const user_id = req.user.id;

    const all_chats = await knex("chat")
      .where({ sender_id: user_id })
      .orWhere({ receive_id: user_id });
    //se der problema, remover esse orWhere

    if (!all_chats) return res.json([]);

    return res.json(all_chats);
  }

  async show(req: Request, res: Response) {
    const user_id = req.user.id; // fisrt id
    const receive_id = req.params;

    const specific_chat = await knex("chat")
      .where({ sender_id: user_id })
      .where(receive_id)
      .first();

    if (!specific_chat) return res.json([]);

    return res.json(specific_chat);
  }
}

export { ChatController };
