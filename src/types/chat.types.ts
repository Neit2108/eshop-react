export type MessageStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'READ';
export type MessageType = 'TEXT' | 'IMAGE' | 'FILE' | 'VIDEO';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  status?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  content: string;
  type: MessageType;
  attachments?: Attachment[];
  status: MessageStatus;
  createdAt: Date;
  updatedAt: Date;
  replyToId?: string;
  replyTo?: Message;
  metadata?: Record<string, any>;
  orderId?: string;
  productId?: string;
}

export interface Attachment {
  id: string;
  url: string;
  type: string;
  size: number;
  name: string;
}

export interface Conversation {
  id: string;
  type: 'DIRECT' | 'GROUP';
  title?: string;
  subject?: string;
  shopId?: string;
  lastMessageText?: string;
  lastMessageAt?: Date;
  participants: ConversationParticipant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationParticipant {
  id: string;
  conversationId: string;
  userId: string;
  user?: User;
  role: 'CUSTOMER' | 'SHOP_OWNER' | 'ADMIN';
  unreadCount: number;
  joinedAt: Date;
}

export interface TypingUser {
  userId: string;
  userName: string;
}

export interface SocketError {
  message: string;
  code?: string;
}

