import React, { useCallback, useState, useEffect } from "react";
import type { Conversation } from "../../../types/chat.types";
import { useChat } from "@/hooks/useChat";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product.types";
import { ConversationHeader } from "./ConversationHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ProductInfoDisplay } from "./ProductInfoDisplay";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/apiService";
import { useNavigate } from "react-router-dom";

interface ChatWindowProps {
  conversation: Conversation | null;
  currentUserId: string;
  token: string;
  onClose?: () => void;
}

const MESSAGES_PER_PAGE = 50;

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  currentUserId,
  token,
  onClose,
}) => {
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [displayProduct, setDisplayProduct] = useState<Product | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    messages,
    typingUsers,
    error,
    isConnected,
    loading,
    sendMessage,
    handleTyping,
    markMessagesAsRead,
  } = useChat({
    token,
    conversationId: conversation?.id,
  });

  const { fetchProductById, selectedProduct } = useProducts();
  const navigate = useNavigate();
  // Sync new messages from useChat
  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  // Sync selectedProduct from useProducts hook
  useEffect(() => {
    if (selectedProduct) {
      setDisplayProduct(selectedProduct);
      setIsLoadingProduct(false);
    }
  }, [selectedProduct]);

  // Find the latest product from messages (within 30 minutes)
  const [latestProductId, setLatestProductId] = useState<string | null>(null);

  useEffect(() => {
    const findLatestProductMessage = () => {
      if (!messages || messages.length === 0) {
        return null;
      }

      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

      // Find the most recent message with productId within 30 minutes
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg.productId) {
          const msgTime = new Date(msg.createdAt);
          if (msgTime >= thirtyMinutesAgo) {
            return msg.productId;
          }
        }
      }
      return null;
    };

    setLatestProductId(findLatestProductMessage());
  }, [messages]);

  // Fetch product when latestProductId changes
  useEffect(() => {
    if (latestProductId) {
      setIsLoadingProduct(true);
      fetchProductById(latestProductId);
    } else {
      setDisplayProduct(null);
      setIsLoadingProduct(false);
    }
  }, [latestProductId]);

  const loadMoreMessages = useCallback(async () => {
    if (!conversation?.id || isLoadingMore || !hasMoreMessages) return;

    setIsLoadingMore(true);
    try {
      const response = await apiService.get<{ messages: any[] }>(
        `/chat/conversations/${conversation.id}/messages?skip=${skip + MESSAGES_PER_PAGE}&take=${MESSAGES_PER_PAGE}&orderBy=asc`
      );

      console.log("response trong loadMoreMessages", response);

      const newMessages = response.data?.messages || [];

      if (newMessages.length === 0) {
        setHasMoreMessages(false);
      } else {
        setAllMessages((prev) => {
          // Avoid duplicates
          const existingIds = new Set(prev.map((m) => m.id));
          const filtered = newMessages.filter(
            (m: any) => !existingIds.has(m.id),
          );
          return [...filtered, ...prev]; // Prepend older messages
        });
        setSkip((prev) => prev + MESSAGES_PER_PAGE);
      }
    } catch (err) {
      console.error("Error loading more messages:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [conversation?.id, skip, isLoadingMore, hasMoreMessages]);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (content.trim()) {
        sendMessage(content, "TEXT");
      }
    },
    [sendMessage],
  );

  const handleLoadMore = useCallback(() => {
    loadMoreMessages();
  }, [loadMoreMessages]);

  const handleMarkAsRead = useCallback(
    (messageIds: string[]) => {
      const unreadIds = messageIds.filter((id) => {
        const msg = messages.find((m) => m.id === id);
        return msg && msg.status !== "READ" && msg.senderId !== currentUserId;
      });

      if (unreadIds.length > 0) {
        markMessagesAsRead(unreadIds);
      }
    },
    [messages, currentUserId, markMessagesAsRead],
  );

  const handleViewShop = useCallback(() => {
    if (displayProduct) {
      navigate(`/shop/${displayProduct.shopId}`);
    }
  }, [displayProduct]);

  const handleSearchMessage = useCallback((query: string) => {
    // Lưu search query để highlight tin nhắn
    setSearchQuery(query);
  }, []);

  const handleViewProductDetail = useCallback(() => {
    if (displayProduct) {
      navigate(`/products/${displayProduct.id}`);
    }
  }, [displayProduct]);

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50 text-gray-500">
        Chọn cuộc hội thoại để bắt đầu
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <ConversationHeader
        conversation={conversation}
        isConnected={isConnected}
        onClose={onClose}
        onViewShop={handleViewShop}
        onSearch={handleSearchMessage}
      />

      <ProductInfoDisplay
        product={displayProduct}
        isLoading={isLoadingProduct}
        onDetail={handleViewProductDetail}
      />

      {error && (
        <Alert variant="destructive" className="m-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        {hasMoreMessages && (
          <div className="flex justify-center p-4">
            <Button
              onClick={handleLoadMore}
              disabled={isLoadingMore || loading}
              variant="outline"
              size="sm"
              className="w-full"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang tải...
                </>
              ) : (
                "Tải tin nhắn cũ"
              )}
            </Button>
          </div>
        )}

        <MessageList
          messages={allMessages}
          currentUserId={currentUserId}
          isLoading={loading}
          typingUsers={typingUsers}
          onMarkAsRead={handleMarkAsRead}
          searchQuery={searchQuery}
        />
      </div>

      <MessageInput
        onSend={handleSendMessage}
        onTyping={handleTyping}
        disabled={!isConnected || isLoadingMore}
        placeholder="Nhập tin nhắn của bạn..."
        error={error || undefined}
      />
    </div>
  );
};
