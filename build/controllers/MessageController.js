"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const MessageRepository_1 = require("../repositories/MessageRepository");
const MessageServices_1 = require("../services/MessageServices");
class MessageController {
    async create(req, res) {
        const sender_id = req.user.id;
        const { chatId, message } = req.body;
        const messageRepository = new MessageRepository_1.MessageRepository();
        const messageServices = new MessageServices_1.MessageServices(messageRepository);
        const { message_id } = await messageServices.execute({ chatId, sender_id, message });
        return res.json({ message_id });
    }
    async index(req, res) {
        const { chatId } = req.params;
        const messageRepository = new MessageRepository_1.MessageRepository();
        const messageServices = new MessageServices_1.MessageServices(messageRepository);
        const result = await messageServices.execute_message_chat({ chatId: Number(chatId) });
        return res.json(result);
    }
}
exports.MessageController = MessageController;
