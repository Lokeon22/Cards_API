"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServices = void 0;
class ChatServices {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async execute({ sender_id, receive_id }) {
        const { chat_id } = await this.chatRepository.create({ sender_id, receive_id });
        return { chat_id };
    }
    async execute_allchats({ user_id }) {
        const all_chats = await this.chatRepository.index({ user_id });
        if (!all_chats)
            return [];
        return all_chats;
    }
    async execute_specific_chat({ chat_id }) {
        const specific_chat = await this.chatRepository.show({ chat_id });
        if (!specific_chat)
            return [];
        return specific_chat;
    }
}
exports.ChatServices = ChatServices;
