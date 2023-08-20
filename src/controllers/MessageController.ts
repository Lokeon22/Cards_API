import { Request, Response } from "express";
import { connection as knex } from "../database/knex";
import { AppError } from "../utils/AppError";

class MessageController {
  async create(req: Request, res: Response) {
    const sender_id = req.user.id;
    const { chatId, message } = req.body;

    const receive_chat = await knex("chat").where({ id: chatId }).first();

    const [message_id] = await knex("messages").insert({
      chatId,
      sender_id,
      receive_id: receive_chat.receive_id,
      message,
    });

    return res.json({ message_id });
  }

  async index(req: Request, res: Response) {
    const { chatId } = req.params;

    try {
      const result = await knex("messages").where({ chatId });

      return res.json(result);
    } catch (error) {
      throw new AppError("Ocorreu algum error");
    }
  }
}

export { MessageController };
