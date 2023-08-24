import { MessageRepository } from "../repositories/MessageRepository";
import { MessageProps } from "../@types/Message";

class MessageServices {
  messageRepository;
  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute({ chatId, sender_id, message }: MessageProps) {
    const { message_id } = await this.messageRepository.create({ chatId, sender_id, message });

    return { message_id };
  }

  async execute_message_chat({ chatId }: { chatId: number }) {
    const result = await this.messageRepository.index({ chatId });

    return result;
  }
}

export { MessageServices };
