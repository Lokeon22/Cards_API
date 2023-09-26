export interface ChatProps {
    id: number;
    sender_id: number;
    receive_id: number;
    created_at: Date;
}
declare class ChatRepository {
    create({ sender_id, receive_id }: {
        sender_id: number;
        receive_id: number;
    }): Promise<{
        chat_id: number;
    }>;
    index({ user_id }: {
        user_id: number;
    }): Promise<ChatProps[]>;
    show({ chat_id }: {
        chat_id: number;
    }): Promise<ChatProps>;
}
export { ChatRepository };
