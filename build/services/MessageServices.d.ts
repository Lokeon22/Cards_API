import { MessageRepository } from "../repositories/MessageRepository";
import { MessageProps } from "../@types/Message";
declare class MessageServices {
    messageRepository: MessageRepository;
    constructor(messageRepository: MessageRepository);
    execute({ chatId, sender_id, message }: MessageProps): Promise<{
        message_id: number;
    }>;
    execute_message_chat({ chatId }: {
        chatId: number;
    }): Promise<import("../repositories/MessageRepository").MessageResults[]>;
}
export { MessageServices };
