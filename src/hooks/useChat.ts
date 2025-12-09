import { useState, useCallback, useEffect, useRef } from "react";
import type { Message, Conversation, TypingUser } from "../types/chat.types";
import { useSocket } from "./useSocket";
import { apiService } from "@/services/apiService";

interface UseChatOptions {
  token: string;
  conversationId?: string;
}

interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
}

interface PendingMessage {
  id: string;
  tempId: string;
  retryCount: number;
  lastRetryTime: number;
  payload: any;
  timeoutId?: ReturnType<typeof setTimeout>;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 5000,
};

export const useChat = (options: UseChatOptions) => {
  const { token, conversationId } = options;
  const { isConnected, on, emit } = useSocket({ token });

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation] = useState<Conversation | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingUsersTimeoutRef = useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());
  const pendingMessagesRef = useRef<Map<string, PendingMessage>>(new Map());
  const lastSendTimeRef = useRef<number>(0);
  const unsubscribersRef = useRef<Array<() => void>>([]);

  // Fetch messages with retry logic
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async (retryCount = 0) => {
      try {
        setLoading(true);
        const response = await apiService.get<{ messages: Message[] }>(
          `/chat/conversations/${conversationId}/messages?skip=0&take=50&orderBy=asc`
        );

        console.log("response", response);
        setMessages(response.data?.messages || []);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load messages";
        console.error("Error fetching messages:", err);

        // Retry logic for network errors
        if (retryCount < 3 && !(err instanceof Error && err.message.includes("Unauthorized"))) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
          console.log(`Retrying fetch in ${delay}ms...`);
          setTimeout(() => fetchMessages(retryCount + 1), delay);
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

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

  // Listen for incoming messages and handle cleanup of pending messages
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
          
          if (isPending && isSameContent && isFromSameUser) {
            // FIX: Clear the retry timeout when removing pending message
            // This prevents duplicate sends
            const pending = pendingMessagesRef.current.get(m.id);
            if (pending && pending.timeoutId) {
              clearTimeout(pending.timeoutId);
              console.log(`✓ Cleared retry timeout for message: ${m.id}`);
            }
            return false;
          }
          return true;
        });

        return [...filtered, message];
      });
      // Remove from pending
      pendingMessagesRef.current.delete(message.id);
    });
    if (unsubscribe) unsubscribersRef.current.push(unsubscribe);
    return () => {
      unsubscribe?.();
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
    if (unsubscribe) unsubscribersRef.current.push(unsubscribe);
    return () => {
      unsubscribe?.();
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
    if (unsubscribe) unsubscribersRef.current.push(unsubscribe);
    return () => {
      unsubscribe?.();
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
    if (unsubscribe) unsubscribersRef.current.push(unsubscribe);
    return () => {
      unsubscribe?.();
    };
  }, [on]);

  // Listen for errors
  useEffect(() => {
    const unsubscribe = on("error", (errorData: { message: string }) => {
      setError(errorData.message);
      setTimeout(() => setError(null), 5000);
    });
    if (unsubscribe) unsubscribersRef.current.push(unsubscribe);
    return () => {
      unsubscribe?.();
    };
  }, [on]);

  // Cleanup all listeners on unmount
  useEffect(() => {
    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe());
      unsubscribersRef.current = [];
      // Clear all timeouts
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingUsersTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      typingUsersTimeoutRef.current.clear();
      // Clear all pending message timeouts
      pendingMessagesRef.current.forEach((pending) => {
        if (pending.timeoutId) clearTimeout(pending.timeoutId);
      });
      pendingMessagesRef.current.clear();
    };
  }, []);

  const sendMessage = useCallback(
    (content: string, type: string = "TEXT", metadata?: any) => {
      // Validation
      if (!conversationId) {
        setError("Conversation not selected");
        return;
      }

      const trimmedContent = content.trim();
      if (!trimmedContent) {
        setError("Message cannot be empty");
        setTimeout(() => setError(null), 3000);
        return;
      }

      if (trimmedContent.length > 5000) {
        setError("Message is too long (max 5000 characters)");
        setTimeout(() => setError(null), 3000);
        return;
      }

      // Rate limiting: max 1 message per 500ms
      const now = Date.now();
      if (now - lastSendTimeRef.current < 500) {
        setError("Please wait before sending another message");
        setTimeout(() => setError(null), 2000);
        return;
      }
      lastSendTimeRef.current = now;

      if (!isConnected) {
        setError("Not connected to server. Please wait...");
        return;
      }

      // Optimistic update - immediately add to messages
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const tempMessage: Message = {
        id: tempId,
        conversationId,
        senderId: "", // Will be filled by server
        content: trimmedContent,
        type: type as any,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setMessages((prev) => [...prev, tempMessage]);

      const payload = {
        conversationId,
        content: trimmedContent,
        type,
        metadata,
      };

      // Set timeout to retry if no response
      const timeoutId = setTimeout(() => {
        const pending = pendingMessagesRef.current.get(tempId);
        if (pending && pending.retryCount < DEFAULT_RETRY_CONFIG.maxRetries) {
          pending.retryCount++;
          pending.lastRetryTime = Date.now();
          console.log(
            `Retrying send message (attempt ${pending.retryCount})...`
          );
          emit("send-message", payload);
        } else if (pending) {
          setError("Failed to send message. Please try again.");
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempId ? { ...msg, status: "SENT" } : msg
            )
          );
          pendingMessagesRef.current.delete(tempId);
        }
      }, 5000);

      // Store pending message with timeout for cleanup
      pendingMessagesRef.current.set(tempId, {
        id: tempId,
        tempId,
        retryCount: 0,
        lastRetryTime: now,
        payload,
        timeoutId, // Store the timeout so we can clear it later
      });

      emit("send-message", payload);
    },
    [conversationId, isConnected, emit]
  );

  const handleTyping = useCallback(() => {
    if (!conversationId || !isConnected) return;

    emit("typing", conversationId);

    // Debounce stop-typing
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      emit("stop-typing", conversationId);
    }, 1000);
  }, [conversationId, isConnected, emit]);

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
