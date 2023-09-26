import { ChatRepository } from "../repositories/ChatRepository";
declare class ChatServices {
    chatRepository: ChatRepository;
    constructor(chatRepository: ChatRepository);
    execute({ sender_id, receive_id }: {
        sender_id: number;
        receive_id: number;
    }): Promise<{
        chat_id: number;
    }>;
    execute_allchats({ user_id }: {
        user_id: number;
    }): Promise<import("../repositories/ChatRepository").ChatProps[]>;
    execute_specific_chat({ chat_id }: {
        chat_id: number;
    }): Promise<import("../repositories/ChatRepository").ChatProps | never[]>;
}
export { ChatServices };
