import React from 'react';
import {
  Phone,
  Video,
  Info,
  Search,
  MoreVertical,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import type { Conversation } from '../../../types/chat.types';

interface ConversationHeaderProps {
  conversation: Conversation | null;
  isConnected: boolean;
  onClose?: () => void;
  onSearch?: (query: string) => void;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  isConnected,
  onClose,
  onSearch,
}) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  if (!conversation) {
    return (
      <div className="border-b bg-white p-4 flex items-center justify-between">
        <div className="text-gray-500">Chọn cuộc hội thoại</div>
        {onClose && (
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {searchOpen ? (
            <Input
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm trong cuộc hội thoại..."
              autoFocus
              className="h-8"
            />
          ) : (
            <div className="space-y-1">
              <h2 className="font-semibold text-gray-900">
                {conversation.title || conversation.participants?.[0]?.user?.email}
              </h2>
              <p className="text-xs text-gray-500">
                {isConnected ? '🟢 Online' : '⚫ Offline'}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>

          <Button size="icon" variant="ghost" disabled>
            <Phone className="w-4 h-4" />
          </Button>

          <Button size="icon" variant="ghost" disabled>
            <Video className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Info className="w-4 h-4 mr-2" />
                Thông tin cuộc hội thoại
              </DropdownMenuItem>
              <DropdownMenuItem>Xóa cuộc hội thoại</DropdownMenuItem>
              <DropdownMenuItem>Báo cáo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {onClose && (
            <Button size="icon" variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

