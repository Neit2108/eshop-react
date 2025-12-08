import React, { useState, useEffect, useCallback } from 'react';
import type { Conversation } from '../../types/chat.types';
import { ConversationList } from '../../components/features/chat/ConversationList';
import { ChatWindow } from '../../components/features/chat/ChatWindow';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Loading from '@/components/common/Loading';
import { toast } from 'sonner';

interface ChatPageProps {
  token: string;
  currentUserId: string;
  apiUrl?: string;
  onLogout?: () => void;
  onBackHome?: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  token,
  currentUserId,
  apiUrl = 'http://localhost:3000',
  onLogout,
  onBackHome,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/chat/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch conversations');

      const data = await response.json();
      setConversations(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  }, [token, apiUrl]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleCreateNew = () => {
    // TODO: Implement create new conversation
    console.log('Create new conversation');
  };

  const handleClose = () => {
    if (isMobile) {
      setSelectedConversation(null);
    }
  };

  if (loading){
    return <Loading />;
  }

  if (error){
    toast.error(error);
    return;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {!isMobile || !selectedConversation ? (
        <div className="w-full md:w-80 border-r bg-white flex flex-col">
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation || undefined}
            onSelectConversation={handleSelectConversation}
            onCreateNew={handleCreateNew}
            onLogout={onLogout}
            onBackHome={onBackHome}
          />
        </div>
      ) : null}

      {/* Chat Window */}
      {!isMobile || selectedConversation ? (
        <div className="flex-1 flex flex-col min-w-0">
          <ChatWindow
            conversation={selectedConversation}
            currentUserId={currentUserId}
            token={token}
            apiUrl={apiUrl}
            onClose={handleClose}
          />
        </div>
      ) : null}
    </div>
  );
};

