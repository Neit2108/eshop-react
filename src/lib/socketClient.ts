import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (token: string, apiUrl: string = 'http://localhost:3000'): Socket => {
  if (socket?.connected) {
    return socket;
  }

  socket = io(apiUrl, {
    auth: { token },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket?.id);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Socket disconnected');
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const joinConversation = (conversationId: string) => {
  if (socket?.connected) {
    socket.emit('join-conversation', conversationId);
  }
};

export const leaveConversation = (conversationId: string) => {
  if (socket?.connected) {
    socket.emit('leave-conversation', conversationId);
  }
};

export const sendMessage = (conversationId: string, message: any) => {
  if (socket?.connected) {
    socket.emit('send-message', {
      conversationId,
      ...message,
    });
  }
};

export const markAsRead = (conversationId: string, messageIds: string[]) => {
  if (socket?.connected) {
    socket.emit('mark-as-read', {
      conversationId,
      messageIds,
    });
  }
};

export const emitTyping = (conversationId: string) => {
  if (socket?.connected) {
    socket.emit('typing', conversationId);
  }
};

export const emitStopTyping = (conversationId: string) => {
  if (socket?.connected) {
    socket.emit('stop-typing', conversationId);
  }
};

