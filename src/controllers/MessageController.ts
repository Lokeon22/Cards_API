import { Request, Response } from "express";

import { MessageRepository } from "../repositories/MessageRepository";
import { MessageServices } from "../services/MessageServices";

class MessageController {
  async create(req: Request, res: Response) {
    const sender_id = req.user.id;
    const { chatId, message } = req.body;

    const messageRepository = new MessageRepository();
    const messageServices = new MessageServices(messageRepository);

    const { message_id } = await messageServices.execute({ chatId, sender_id, message });

    return res.json({ message_id });
  }

  async index(req: Request, res: Response) {
    const { chatId } = req.params;

    const messageRepository = new MessageRepository();
    const messageServices = new MessageServices(messageRepository);

    const result = await messageServices.execute_message_chat({ chatId: Number(chatId) });

    return res.json(result);
  }
}

export { MessageController };
