import React, { useState } from 'react';
import { Search, Plus, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Conversation } from '../../../types/chat.types';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
  onCreateNew?: () => void;
  onLogout?: () => void;
  onBackHome?: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  onCreateNew,
  onLogout,
  onBackHome,
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

  const getAvatarInitials = (conversation: Conversation): string => {
    const title = getConversationTitle(conversation);
    return title
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (conversation: Conversation): string => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-cyan-500',
      'bg-indigo-500',
    ];
    const index = conversation.id.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    if (diff < 60000) return 'Vừa xong';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}p`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}g`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d`;

    return d.toLocaleDateString('vi-VN');
  };

  const getTotalUnreadCount = (conversation: Conversation): number => {
    return conversation.participants?.reduce((sum, p) => sum + p.unreadCount, 0) || 0;
  };

  return (
    <div className="w-full h-full bg-white flex flex-col border-r">
      {/* Header */}
      <div className="border-b p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={onBackHome}
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Tin nhắn</h1>
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={onCreateNew}
              className="rounded-full hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onLogout}
              className="rounded-full hover:bg-gray-100"
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
            className="pl-10 h-9 bg-gray-50 border-gray-200"
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
            filteredConversations.map((conversation) => {
              const unreadCount = getTotalUnreadCount(conversation);
              return (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-50',
                    selectedConversation?.id === conversation.id && 'bg-blue-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <Avatar className="w-12 h-12">
                        <AvatarImage 
                          src={conversation.participants?.[0]?.user?.avatar} 
                          alt={getConversationTitle(conversation)} 
                        />
                        <AvatarFallback className={cn('font-semibold text-white', getAvatarColor(conversation))}>
                          {getAvatarInitials(conversation)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="font-semibold text-sm text-gray-900 truncate mb-1">
                        {getConversationTitle(conversation)}
                      </h3>

                      {/* Last message and date */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <p className="text-xs text-gray-600 truncate flex-1">
                          {conversation.lastMessageText || 'Không có tin nhắn'}
                        </p>
                        {conversation.lastMessageAt && (
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {formatDate(conversation.lastMessageAt)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Unread Badge */}
                    {unreadCount > 0 && (
                      <div className="flex-shrink-0">
                        <Badge 
                          variant="default" 
                          className="w-6 h-6 flex items-center justify-center rounded-full p-0 text-xs font-semibold bg-blue-500 hover:bg-blue-600"
                        >
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </Badge>
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};