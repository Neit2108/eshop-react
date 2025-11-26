import React, { useCallback } from 'react';
import type { Conversation } from '../../../types/chat.types';
import { useChat } from '@/hooks/useChat';
import { ConversationHeader } from './ConversationHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation | null;
  currentUserId: string;
  token: string;
  apiUrl?: string;
  onClose?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  currentUserId,
  token,
  apiUrl = 'http://localhost:3000',
  onClose,
}) => {
  const {
    messages,
    typingUsers,
    error,
    isConnected,
    sendMessage,
    handleTyping,
    markMessagesAsRead,
  } = useChat({
    token,
    conversationId: conversation?.id,
    apiUrl,
  });

  const handleSendMessage = useCallback(
    (content: string) => {
      if (content.trim()) {
        sendMessage(content, 'TEXT');
      }
    },
    [sendMessage]
  );

  const handleMarkAsRead = useCallback(
    (messageIds: string[]) => {
      const unreadIds = messageIds.filter((id) => {
        const msg = messages.find((m) => m.id === id);
        return msg && msg.status !== 'READ' && msg.senderId !== currentUserId;
      });

      if (unreadIds.length > 0) {
        markMessagesAsRead(unreadIds);
      }
    },
    [messages, currentUserId, markMessagesAsRead]
  );

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500">
        Chọn cuộc hội thoại để bắt đầu
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <ConversationHeader
        conversation={conversation}
        isConnected={isConnected}
        onClose={onClose}
      />

      {error && (
        <Alert variant="destructive" className="m-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        isLoading={false}
        typingUsers={typingUsers}
        onMarkAsRead={handleMarkAsRead}
      />

      <MessageInput
        onSend={handleSendMessage}
        onTyping={handleTyping}
        disabled={!isConnected}
        placeholder="Nhập tin nhắn của bạn..."
      />
    </div>
  );
};

