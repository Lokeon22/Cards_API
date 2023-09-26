"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const knex_1 = require("../database/knex");
class MessageRepository {
    async create({ chatId, sender_id, message }) {
        const receive_chat = await (0, knex_1.connection)("chat").where({ id: chatId }).first();
        const [message_id] = await (0, knex_1.connection)("messages").insert({
            chatId,
            sender_id,
            receive_id: receive_chat.receive_id,
            message,
        });
        return { message_id };
    }
    async index({ chatId }) {
        const result = await (0, knex_1.connection)("messages").where({ chatId });
        return result;
    }
}
exports.MessageRepository = MessageRepository;
