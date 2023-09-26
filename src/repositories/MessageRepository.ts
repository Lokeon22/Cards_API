import { connection as knex } from "../database/knex";
import { MessageProps } from "../@types/Message";

export interface MessageResults extends MessageProps {
  created_at: Date;
}

class MessageRepository {
  async create({ chatId, sender_id, message }: MessageProps) {
    const receive_chat = await knex("chat").where({ id: chatId }).first();

    const [message_id] = await knex("messages").insert({
      chatId,
      sender_id,
      receive_id: receive_chat.receive_id,
      message,
    });

    return { message_id };
  }

  async index({ chatId }: { chatId: number }) {
    const result: MessageResults[] = await knex("messages").where({ chatId });

    return result;
  }
}

export { MessageRepository };
