"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const ChatRepository_1 = require("../repositories/ChatRepository");
const ChatServices_1 = require("../services/ChatServices");
class ChatController {
    async create(req, res) {
        const sender_id = req.user.id;
        const { receive_id } = req.body;
        const chatRepository = new ChatRepository_1.ChatRepository();
        const chatServices = new ChatServices_1.ChatServices(chatRepository);
        const { chat_id } = await chatServices.execute({ sender_id, receive_id });
        return res.json({ chat_id });
    }
    async index(req, res) {
        const user_id = req.user.id;
        const chatRepository = new ChatRepository_1.ChatRepository();
        const chatServices = new ChatServices_1.ChatServices(chatRepository);
        const all_chats = await chatServices.execute_allchats({ user_id });
        return res.json(all_chats);
    }
    async show(req, res) {
        //const user_id = req.user.id; // fisrt id
        const { chat_id } = req.params;
        const chatRepository = new ChatRepository_1.ChatRepository();
        const chatServices = new ChatServices_1.ChatServices(chatRepository);
        const specific_chat = await chatServices.execute_specific_chat({ chat_id: Number(chat_id) });
        return res.json(specific_chat);
    }
}
exports.ChatController = ChatController;
