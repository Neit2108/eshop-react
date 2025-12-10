import React from 'react';
import type { Message } from '../../../types/chat.types';
import { Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  previousMessage?: Message;
  searchQuery?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  previousMessage,
  searchQuery = "",
}) => {
  const showAvatar =
    !previousMessage || previousMessage.senderId !== message.senderId;
  const sameUserAsPrevious = previousMessage?.senderId === message.senderId;
  const timeGap =
    previousMessage &&
    new Date(message.createdAt).getTime() -
      new Date(previousMessage.createdAt).getTime() >
      60000;

  const renderStatus = () => {
    if (!isOwn) return null;

    switch (message.status) {
      case 'READ':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      case 'DELIVERED':
        return <Check className="w-4 h-4 text-gray-500" />;
      case 'SENT':
        return <Check className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  // Hàm render content với highlight
  const renderMessageContent = () => {
    if (message.type === 'TEXT') {
      // Nếu có searchQuery và tin nhắn chứa searchQuery
      if (searchQuery && message.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        const parts = message.content.split(new RegExp(`(${searchQuery})`, 'gi'));
        return (
          <p className="text-sm leading-relaxed">
            {parts.map((part, index) => {
              if (part.toLowerCase() === searchQuery.toLowerCase()) {
                return (
                  <span key={index} className="bg-yellow-300 font-semibold text-black">
                    {part}
                  </span>
                );
              }
              return <span key={index}>{part}</span>;
            })}
          </p>
        );
      }
      return <p className="text-sm leading-relaxed">{message.content}</p>;
    }

    if (message.type === 'IMAGE') {
      return (
        <img
          src={message.content}
          alt="Message"
          className="max-w-xs rounded-md"
        />
      );
    }

    if (message.type === 'FILE') {
      return (
        <a
          href={message.content}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline flex items-center gap-2"
        >
          📎 {message.metadata?.fileName || 'File'}
        </a>
      );
    }
  };

  return (
    <div className={cn('flex gap-2', isOwn && 'flex-row-reverse')}>
      {showAvatar ? (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
          {message.sender?.firstName?.charAt(0) ||
            message.sender?.email?.charAt(0) ||
            'U'}
        </div>
      ) : (
        <div className="w-8 flex-shrink-0" />
      )}

      <div className={cn('flex flex-col gap-1', isOwn && 'items-end')}>
        {showAvatar && !sameUserAsPrevious && (
          <span className="text-xs text-gray-500 px-2">
            {message.sender?.firstName} {message.sender?.lastName}
          </span>
        )}

        {timeGap && (
          <span className="text-xs text-gray-400 px-2">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        )}

        <div
          className={cn(
            'rounded-lg px-4 py-2 max-w-xs break-words',
            isOwn
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-900 rounded-bl-none'
          )}
        >
          {renderMessageContent()}
        </div>

        {isOwn && (
          <div className="flex items-center gap-1 px-2">
            {renderStatus()}
            <span className="text-xs text-gray-500">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
