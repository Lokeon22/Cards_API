import { MessageProps } from "../@types/Message";
export interface MessageResults extends MessageProps {
    created_at: Date;
}
declare class MessageRepository {
    create({ chatId, sender_id, message }: MessageProps): Promise<{
        message_id: number;
    }>;
    index({ chatId }: {
        chatId: number;
    }): Promise<MessageResults[]>;
}
export { MessageRepository };
