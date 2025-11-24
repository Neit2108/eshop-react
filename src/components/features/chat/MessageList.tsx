import React, { useEffect, useRef } from 'react';
import type { Message } from '../../../types/chat.types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  isLoading: boolean;
  typingUsers: any[];
  onMarkAsRead?: (messageIds: string[]) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  isLoading,
  typingUsers,
  onMarkAsRead,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mark visible messages as read
  useEffect(() => {
    if (!onMarkAsRead) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    intersectionObserverRef.current = new IntersectionObserver((entries) => {
      const unreadMessageIds = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.getAttribute('data-message-id'))
        .filter((id): id is string => id !== null && id !== '');

      if (unreadMessageIds.length > 0) {
        onMarkAsRead(unreadMessageIds);
      }
    }, options);

    return () => {
      intersectionObserverRef.current?.disconnect();
    };
  }, [onMarkAsRead]);

  useEffect(() => {
    messages.forEach((msg) => {
      const element = document.querySelector(
        `[data-message-id="${msg.id}"]`
      );
      if (element && intersectionObserverRef.current) {
        intersectionObserverRef.current.observe(element);
      }
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 space-y-4">
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <div className="text-gray-500">Loading messages...</div>
        </div>
      )}

      {messages.length === 0 && !isLoading && (
        <div className="flex justify-center items-center h-full text-gray-400">
          Không có tin nhắn
        </div>
      )}

      {messages.map((message, index) => (
        <div
          key={message.id}
          data-message-id={message.id}
          className={message.status !== 'READ' ? 'opacity-100' : 'opacity-100'}
        >
          <MessageBubble
            message={message}
            isOwn={message.senderId === currentUserId}
            previousMessage={index > 0 ? messages[index - 1] : undefined}
          />
        </div>
      ))}

      {typingUsers.length > 0 && (
        <TypingIndicator users={typingUsers} />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

