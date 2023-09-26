import { connection as knex } from "../database/knex";

export interface ChatProps {
  id: number;
  sender_id: number;
  receive_id: number;
  created_at: Date;
}

class ChatRepository {
  async create({ sender_id, receive_id }: { sender_id: number; receive_id: number }) {
    const [chat_id] = await knex("chat").insert({ sender_id, receive_id });

    return { chat_id };
  }

  async index({ user_id }: { user_id: number }) {
    const all_chats: ChatProps[] = await knex("chat")
      .where({ sender_id: user_id })
      .orWhere({ receive_id: user_id });
    //se der problema, remover esse orWhere

    return all_chats;
  }

  async show({ chat_id }: { chat_id: number }) {
    const specific_chat: ChatProps = await knex("chat").where({ id: chat_id }).first();

    return specific_chat;
  }
}

export { ChatRepository };
