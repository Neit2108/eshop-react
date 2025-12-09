import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null;
let connectionAttempts = 0;
let lastConnectionError: Error | null = null;
let isInitializing = false;

const MAX_CONNECTION_ATTEMPTS = 5;
const CONNECTION_TIMEOUT = 10000; // 10 seconds

export const initSocket = (
  token: string,
  apiUrl: string = 'http://localhost:5000',
  callbacks?: { onConnect?: () => void; onDisconnect?: () => void; onError?: (error: Error) => void }
): Socket => {
  // Return existing connected socket
  if (socket?.connected) {
    return socket;
  }

  // Prevent multiple simultaneous initialization attempts
  if (isInitializing && socket) {
    return socket;
  }

  isInitializing = true;

  try {
    socket = io(apiUrl, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: MAX_CONNECTION_ATTEMPTS,
      transports: ['websocket', 'polling'],
      autoConnect: true,
      forceNew: false, // Reuse connection if possible
    });

    // Set up connection timeout
    const connectionTimeoutId = setTimeout(() => {
      if (!socket?.connected) {
        const error = new Error('Connection timeout');
        lastConnectionError = error;
        console.error('❌ Socket connection timeout');
        callbacks?.onError?.(error);
      }
    }, CONNECTION_TIMEOUT);

    socket.on('connect', () => {
      clearTimeout(connectionTimeoutId);
      connectionAttempts = 0;
      lastConnectionError = null;
      console.log('✅ Socket connected:', socket?.id);
      callbacks?.onConnect?.();
    });

    socket.on('connect_error', (error) => {
      clearTimeout(connectionTimeoutId);
      connectionAttempts++;
      lastConnectionError = error as Error;
      console.error(`❌ Socket connection error (attempt ${connectionAttempts}):`, error);
      
      if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
        console.error('❌ Max connection attempts reached');
        callbacks?.onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason);
      callbacks?.onDisconnect?.();
      
      // Only clear socket on abnormal disconnection
      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        socket = null;
        isInitializing = false;
      }
    });

    socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
      lastConnectionError = error instanceof Error ? error : new Error(String(error));
      callbacks?.onError?.(lastConnectionError);
    });

    return socket;
  } catch (error) {
    isInitializing = false;
    const err = error instanceof Error ? error : new Error(String(error));
    lastConnectionError = err;
    console.error('❌ Failed to initialize socket:', err);
    callbacks?.onError?.(err);
    throw err;
  } finally {
    isInitializing = false;
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const isSocketConnected = (): boolean => {
  return socket?.connected ?? false;
};

export const getLastConnectionError = (): Error | null => {
  return lastConnectionError;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    connectionAttempts = 0;
    lastConnectionError = null;
    isInitializing = false;
  }
};

export const reconnectSocket = () => {
  if (socket && !socket.connected) {
    console.log('Attempting to reconnect...');
    socket.connect();
  }
};

export const joinConversation = (conversationId: string): boolean => {
  if (socket?.connected && conversationId) {
    socket.emit('join-conversation', conversationId);
    console.log(`📌 Joined conversation: ${conversationId}`);
    return true;
  }
  console.warn('Cannot join conversation: socket not connected or invalid ID');
  return false;
};

export const leaveConversation = (conversationId: string): boolean => {
  if (socket?.connected && conversationId) {
    socket.emit('leave-conversation', conversationId);
    console.log(`📌 Left conversation: ${conversationId}`);
    return true;
  }
  console.warn('Cannot leave conversation: socket not connected or invalid ID');
  return false;
};

export const sendMessage = (conversationId: string, message: any): boolean => {
  if (!socket?.connected) {
    console.warn('Cannot send message: socket not connected');
    return false;
  }
  if (!conversationId || !message) {
    console.warn('Cannot send message: invalid parameters');
    return false;
  }
  socket.emit('send-message', {
    conversationId,
    ...message,
  });
  return true;
};

export const markAsRead = (conversationId: string, messageIds: string[]): boolean => {
  if (!socket?.connected) {
    console.warn('Cannot mark as read: socket not connected');
    return false;
  }
  if (!conversationId || !messageIds || messageIds.length === 0) {
    console.warn('Cannot mark as read: invalid parameters');
    return false;
  }
  socket.emit('mark-as-read', {
    conversationId,
    messageIds,
  });
  return true;
};

export const emitTyping = (conversationId: string): boolean => {
  if (!socket?.connected) {
    return false;
  }
  if (!conversationId) {
    return false;
  }
  socket.emit('typing', conversationId);
  return true;
};

export const emitStopTyping = (conversationId: string): boolean => {
  if (!socket?.connected) {
    return false;
  }
  if (!conversationId) {
    return false;
  }
  socket.emit('stop-typing', conversationId);
  return true;
};

