import { useState, useCallback } from 'react';
import { apiService } from '@/services/apiService';

interface UseQuickMessageOptions {
  token: string;
  shopId: string;
  productId?: string;
}

export const useQuickMessage = (options: UseQuickMessageOptions) => {
  const { token, shopId, productId } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuickMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) {
        setError('Tin nhắn không được để trống');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Step 1: Create conversation via apiService
        console.log('Tạo cuộc hội thoại với cửa hàng:', shopId);
        const createConvResponse = await apiService.post<{ id: string }>(
          '/chat/conversations',
          {
            shopId,
            subject: productId ? `Hỗ trợ sản phẩm` : undefined,
          }
        );

        const conversationId = createConvResponse.data?.id;

        if (!conversationId) {
          throw new Error('Failed to get conversation ID');
        }

        console.log('Cuộc hội thoại đã được tạo:', conversationId);

        // Step 2: Send message via apiService
        const sendMessageResponse = await apiService.post(
          `/chat/conversations/${conversationId}/messages`,
          {
            content: message.trim(),
            type: 'TEXT',
            productId,
          }
        );

        console.log('Tin nhắn đã được gửi thành công:', sendMessageResponse);

        setError(null);
        return conversationId;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Lỗi khi gửi tin nhắn';
        setError(errorMessage);
        console.error('Lỗi khi gửi tin nhắn:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, shopId, productId]
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

