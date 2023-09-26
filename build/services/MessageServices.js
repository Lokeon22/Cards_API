"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageServices = void 0;
class MessageServices {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async execute({ chatId, sender_id, message }) {
        const { message_id } = await this.messageRepository.create({ chatId, sender_id, message });
        return { message_id };
    }
    async execute_message_chat({ chatId }) {
        const result = await this.messageRepository.index({ chatId });
        return result;
    }
}
exports.MessageServices = MessageServices;
