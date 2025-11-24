import { apiService } from "./apiService";
import { socketService } from "./socketService";

export interface Conversation {
  id: string;
  type: string;
  status: string;
  title?: string;
  shopId?: string;
  lastMessageAt?: string;
  lastMessageText?: string;
  totalMessages: number;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: "TEXT" | "IMAGE" | "FILE" | "SYSTEM";
  sentAt: string;
  isRead: boolean;
  isDeleted: boolean;
  editedAt?: string;
}

export const chatService = {
  async getConversations(limit = 20, offset = 0): Promise<Conversation[]> {
    const response = await apiService.get<{ conversations: Conversation[] }>(
      `/chat/conversations?limit=${limit}&offset=${offset}`,
    );
    return response.data.conversations;
  },

  async getConversation(conversationId: string): Promise<Conversation> {
    const response = await apiService.get<{ conversation: Conversation }>(
      `/chat/conversations/${conversationId}`,
    );
    return response.data.conversation;
  },

  async getMessages(
    conversationId: string,
    limit = 50,
    offset = 0,
  ): Promise<Message[]> {
    const response = await apiService.get<{ messages: Message[] }>(
      `/chat/conversations/${conversationId}/messages?limit=${limit}&offset=${offset}`,
    );
    return response.data.messages;
  },

  async createConversation(payload: {
    shopId?: string;
    title?: string;
    subject?: string;
  }): Promise<Conversation> {
    return socketService.emit("chat:create_conversation", payload);
  },

  async joinConversation(conversationId: string): Promise<void> {
    return socketService.emit("chat:join_conversation", { conversationId });
  },

  async leaveConversation(conversationId: string): Promise<void> {
    socketService.emit("chat:leave_conversation", { conversationId });
  },

  async sendMessage(payload: {
    conversationId: string;
    content: string;
    type?: "TEXT" | "IMAGE" | "FILE";
    attachments?: any[];
    replyToId?: string;
  }): Promise<Message> {
    return socketService.emit("chat:send_message", payload);
  },

  async markAsRead(conversationId: string, messageId?: string): Promise<void> {
    return socketService.emit("chat:mark_as_read", {
      conversationId,
      messageId,
    });
  },

  async editMessage(messageId: string, content: string): Promise<Message> {
    return socketService.emit("chat:edit_message", { messageId, content });
  },

  async deleteMessage(messageId: string): Promise<void> {
    return socketService.emit("chat:delete_message", { messageId });
  },

  // Typing indicators
  startTyping(conversationId: string) {
    socketService.emit("chat:typing_start", { conversationId });
  },

  stopTyping(conversationId: string) {
    socketService.emit("chat:typing_stop", { conversationId });
  },

  // Event listeners
  onNewMessage(callback: (message: Message) => void) {
    socketService.on("chat:new_message", callback);
  },

  onMessageUpdated(callback: (message: Message) => void) {
    socketService.on("chat:message_updated", callback);
  },

  onMessageDeleted(callback: (data: { messageId: string }) => void) {
    socketService.on("chat:message_deleted", callback);
  },

  onUserTyping(
    callback: (data: { conversationId: string; user: any }) => void,
  ) {
    socketService.on("chat:user_typing", callback);
  },

  onUserStoppedTyping(
    callback: (data: { conversationId: string; userId: string }) => void,
  ) {
    socketService.on("chat:user_stopped_typing", callback);
  },

  onUserStatusChanged(
    callback: (data: { userId: string; status: string }) => void,
  ) {
    socketService.on("chat:user_status_changed", callback);
  },

  // Cleanup
  removeAllListeners() {
    socketService.off("chat:new_message");
    socketService.off("chat:message_updated");
    socketService.off("chat:message_deleted");
    socketService.off("chat:user_typing");
    socketService.off("chat:user_stopped_typing");
    socketService.off("chat:user_status_changed");
  },
};
