import { ChatRepository } from "../repositories/ChatRepository";

class ChatServices {
  chatRepository;
  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute({ sender_id, receive_id }: { sender_id: number; receive_id: number }) {
    const { chat_id } = await this.chatRepository.create({ sender_id, receive_id });

    return { chat_id };
  }

  async execute_allchats({ user_id }: { user_id: number }) {
    const all_chats = await this.chatRepository.index({ user_id });

    if (!all_chats) return [];

    return all_chats;
  }

  async execute_specific_chat({ chat_id }: { chat_id: number }) {
    const specific_chat = await this.chatRepository.show({ chat_id });

    if (!specific_chat) return [];

    return specific_chat;
  }
}

export { ChatServices };
