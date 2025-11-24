import React, { useState } from 'react';
import { Search, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { Conversation } from '../../../types/chat.types';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
  onCreateNew?: () => void;
  onLogout?: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  onCreateNew,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conv) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      conv.title?.toLowerCase().includes(searchTerm) ||
      conv.participants?.some(
        (p) =>
          p.user?.email?.toLowerCase().includes(searchTerm) ||
          p.user?.firstName?.toLowerCase().includes(searchTerm)
      )
    );
  });

  const getConversationTitle = (conversation: Conversation): string => {
    if (conversation.title) return conversation.title;
    const otherParticipants = conversation.participants?.filter(
      (p) => p.role === 'CUSTOMER'
    );
    return (
      otherParticipants?.map((p) => p.user?.email).join(', ') || 'Cuộc hội thoại'
    );
  };

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    if (diff < 60000) return 'Vừa xong';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)} ngày trước`;

    return d.toLocaleDateString();
  };

  return (
    <div className="w-full h-full bg-white flex flex-col border-r">
      {/* Header */}
      <div className="border-b p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Tin nhắn</h1>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={onCreateNew}
              className="rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onLogout}
              className="rounded-full"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm cuộc hội thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>

      {/* Conversations */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              Không có cuộc hội thoại
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={cn(
                  'w-full text-left p-3 rounded-lg transition-colors space-y-1 hover:bg-gray-100',
                  selectedConversation?.id === conversation.id && 'bg-blue-50'
                )}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm truncate flex-1">
                    {getConversationTitle(conversation)}
                  </h3>
                  {conversation.lastMessageAt && (
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatDate(conversation.lastMessageAt)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 truncate">
                  {conversation.lastMessageText || 'Không có tin nhắn'}
                </p>

                {conversation.participants?.some((p) => p.unreadCount > 0) && (
                  <Badge variant="default" className="w-fit text-xs">
                    {conversation.participants.reduce(
                      (sum, p) => sum + p.unreadCount,
                      0
                    )}
                  </Badge>
                )}
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

