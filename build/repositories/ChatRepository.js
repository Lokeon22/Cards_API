"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const knex_1 = require("../database/knex");
class ChatRepository {
    async create({ sender_id, receive_id }) {
        const [chat_id] = await (0, knex_1.connection)("chat").insert({ sender_id, receive_id });
        return { chat_id };
    }
    async index({ user_id }) {
        const all_chats = await (0, knex_1.connection)("chat")
            .where({ sender_id: user_id })
            .orWhere({ receive_id: user_id });
        //se der problema, remover esse orWhere
        return all_chats;
    }
    async show({ chat_id }) {
        const specific_chat = await (0, knex_1.connection)("chat").where({ id: chat_id }).first();
        return specific_chat;
    }
}
exports.ChatRepository = ChatRepository;
