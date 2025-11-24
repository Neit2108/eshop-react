import { useEffect, useCallback, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { initSocket, getSocket, disconnectSocket } from '@/lib/socketClient';

interface UseSocketOptions {
  token: string;
  apiUrl?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
}

export const useSocket = (options: UseSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);
  const {
    token,
    apiUrl = 'http://localhost:5000',
    onConnect,
    onDisconnect,
    onError,
  } = options;

  useEffect(() => {
    if (!token) return;

    try {
      socketRef.current = initSocket(token, apiUrl);

      socketRef.current.on('connect', () => {
        console.log('🔗 Connected');
        onConnect?.();
      });

      socketRef.current.on('disconnect', () => {
        console.log('🔌 Disconnected');
        onDisconnect?.();
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('❌ Connection error:', error);
        onError?.(error);
      });

      socketRef.current.on('error', (error) => {
        console.error('❌ Socket error:', error);
        onError?.(error);
      });
    } catch (error) {
      console.error('Failed to initialize socket:', error);
      onError?.(error);
    }

    return () => {
      disconnectSocket();
      socketRef.current = null;
    };
  }, [token, apiUrl, onConnect, onDisconnect, onError]);

  const on = useCallback((event: string, handler: (...args: any[]) => void) => {
    const socket = getSocket();
    if (socket) {
      socket.on(event, handler);
      return () => socket.off(event, handler);
    }
  }, []);

  const emit = useCallback((event: string, data?: any) => {
    const socket = getSocket();
    if (socket?.connected) {
      socket.emit(event, data);
    }
  }, []);

  const isConnected = socketRef.current?.connected ?? false;

  return { isConnected, on, emit, socket: socketRef.current };
};

