import { useState, useCallback, useEffect, useRef } from "react";
import type { Message, Conversation, TypingUser } from "../types/chat.types";
import { useSocket } from "./useSocket";

interface UseChatOptions {
  token: string;
  conversationId?: string;
  apiUrl?: string;
}

export const useChat = (options: UseChatOptions) => {
  const { token, conversationId, apiUrl } = options;
  const { isConnected, on, emit } = useSocket({ token, apiUrl });

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation] = useState<Conversation | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingUsersTimeoutRef = useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());
  const pendingMessagesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/api/chat/conversations/${conversationId}/messages?skip=0&take=50&orderBy=asc`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        setMessages(data.data?.messages || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load messages",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId, token, apiUrl]);

  // Join conversation
  useEffect(() => {
    if (conversationId && isConnected) {
      emit("join-conversation", conversationId);
    }

    return () => {
      if (conversationId) {
        emit("leave-conversation", conversationId);
      }
    };
  }, [conversationId, isConnected, emit]);

  // Listen for incoming messages
  useEffect(() => {
    const unsubscribe = on("message-received", (message: Message) => {
      setMessages((prev) => {
        // Avoid duplicates if message already exists
        const exists = prev.some((m) => m.id === message.id);
        if (exists) return prev;

        // Remove pending message with same content from same user (if exists)
        const filtered = prev.filter((m) => {
          const isPending = m.id.startsWith("temp-");
          const isSameContent = m.content === message.content;
          const isFromSameUser =
            m.senderId === message.senderId || m.senderId === "";
          return !(isPending && isSameContent && isFromSameUser);
        });

        return [...filtered, message];
      });
      // Remove from pending
      pendingMessagesRef.current.delete(message.id);
    });
    return () => {
      unsubscribe?.(); // Wrap trong cleanup function
    };
  }, [on]);

  // Listen for typing indicators
  useEffect(() => {
    const unsubscribe = on("user-typing", (data: TypingUser) => {
      setTypingUsers((prev) => {
        const exists = prev.some((u) => u.userId === data.userId);
        return exists ? prev : [...prev, data];
      });

      // Clear existing timeout for this user
      const existingTimeout = typingUsersTimeoutRef.current.get(data.userId);
      if (existingTimeout) clearTimeout(existingTimeout);

      // Set new timeout
      const timeout = setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u.userId !== data.userId));
        typingUsersTimeoutRef.current.delete(data.userId);
      }, 3000);

      typingUsersTimeoutRef.current.set(data.userId, timeout);
    });
    return () => {
      unsubscribe?.(); // Wrap trong cleanup function
    };
  }, [on]);

  // Listen for stop typing
  useEffect(() => {
    const unsubscribe = on("user-stop-typing", (data: { userId: string }) => {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== data.userId));
      const timeout = typingUsersTimeoutRef.current.get(data.userId);
      if (timeout) clearTimeout(timeout);
      typingUsersTimeoutRef.current.delete(data.userId);
    });
    return () => {
      unsubscribe?.(); // Wrap trong cleanup function
    };
  }, [on]);

  // Listen for messages marked as read
  useEffect(() => {
    const unsubscribe = on(
      "messages-marked-read",
      (data: { userId: string; messageIds: string[] }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            data.messageIds.includes(msg.id)
              ? { ...msg, status: "READ" as const }
              : msg,
          ),
        );
      },
    );
    return () => {
      unsubscribe?.(); // Wrap trong cleanup function
    };
  }, [on]);

  // Listen for errors
  useEffect(() => {
    const unsubscribe = on("error", (errorData: { message: string }) => {
      setError(errorData.message);
      setTimeout(() => setError(null), 5000);
    });
    return () => {
      unsubscribe?.(); // Wrap trong cleanup function
    };
  }, [on]);

  const sendMessage = useCallback(
    (content: string, type: string = "TEXT", metadata?: any) => {
      if (!conversationId || !content.trim()) return;

      // Optimistic update - immediately add to messages
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const tempMessage: Message = {
        id: tempId,
        conversationId,
        senderId: "", // Will be filled by server
        content,
        type: type as any,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setMessages((prev) => [...prev, tempMessage]);
      pendingMessagesRef.current.add(tempId);

      emit("send-message", {
        conversationId,
        content,
        type,
        metadata,
      });
    },
    [conversationId],
  );

  const handleTyping = useCallback(() => {
    if (!conversationId) return;

    emit("typing", conversationId);

    // Debounce stop-typing
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      emit("stop-typing", conversationId);
    }, 1000);
  }, [conversationId, emit]);

  const markMessagesAsRead = useCallback(
    (messageIds: string[]) => {
      if (!conversationId || messageIds.length === 0) return;

      emit("mark-as-read", {
        conversationId,
        messageIds,
      });
    },
    [conversationId, emit],
  );

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    conversation,
    typingUsers,
    loading,
    error,
    isConnected,
    sendMessage,
    handleTyping,
    markMessagesAsRead,
    addMessage,
    clearMessages,
  };
};
