import { useState, useCallback } from 'react';

interface UseQuickMessageOptions {
  token: string;
  apiUrl?: string;
  shopId: string;
  productId?: string;
}

export const useQuickMessage = (options: UseQuickMessageOptions) => {
  const { token, apiUrl = 'http://localhost:5000', shopId, productId } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuickMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) {
        setError('Message cannot be empty');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Step 1: Create conversation via REST API
        console.log('Creating conversation with shop:', shopId);
        const createConvResponse = await fetch(
          `${apiUrl}/api/chat/conversations`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              shopId,
              subject: productId ? `About product ${productId}` : undefined,
            }),
          }
        );

        if (!createConvResponse.ok) {
          throw new Error(
            `Failed to create conversation: ${createConvResponse.status}`
          );
        }

        const convData = await createConvResponse.json();
        const conversationId = convData.data?.id || convData.id;

        if (!conversationId) {
          throw new Error('Failed to get conversation ID');
        }

        console.log('Conversation created:', conversationId);

        // Step 2: Send message via REST API
        const sendMessageResponse = await fetch(
          `${apiUrl}/api/chat/conversations/${conversationId}/messages`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              content: message.trim(),
              type: 'TEXT',
              productId,
            }),
          }
        );

        if (!sendMessageResponse.ok) {
          throw new Error(
            `Failed to send message: ${sendMessageResponse.status}`
          );
        }

        const messageData = await sendMessageResponse.json();
        console.log('Message sent successfully:', messageData);

        setError(null);
        return conversationId;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to send message';
        setError(errorMessage);
        console.error('Error sending quick message:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, apiUrl, shopId, productId]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    sendQuickMessage,
    clearError,
  };
};

