import { Request, Response } from "express";

import { ChatRepository } from "../repositories/ChatRepository";
import { ChatServices } from "../services/ChatServices";

class ChatController {
  async create(req: Request, res: Response) {
    const sender_id = req.user.id;
    const { receive_id } = req.body;

    const chatRepository = new ChatRepository();
    const chatServices = new ChatServices(chatRepository);

    const { chat_id } = await chatServices.execute({ sender_id, receive_id });

    return res.json({ chat_id });
  }

  async index(req: Request, res: Response) {
    const user_id = req.user.id;

    const chatRepository = new ChatRepository();
    const chatServices = new ChatServices(chatRepository);

    const all_chats = await chatServices.execute_allchats({ user_id });

    return res.json(all_chats);
  }

  async show(req: Request, res: Response) {
    //const user_id = req.user.id; // fisrt id
    const { chat_id } = req.params;

    const chatRepository = new ChatRepository();
    const chatServices = new ChatServices(chatRepository);

    const specific_chat = await chatServices.execute_specific_chat({ chat_id: Number(chat_id) });

    return res.json(specific_chat);
  }
}

export { ChatController };
