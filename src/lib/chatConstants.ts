/**
 * Chat Socket Events Constants
 * Synced with Backend
 */

export const CHAT_EVENTS = {
  // Conversation events - Client to Server
  JOIN_CONVERSATION: 'chat:join_conversation',
  LEAVE_CONVERSATION: 'chat:leave_conversation',
  CREATE_CONVERSATION: 'chat:create_conversation',
  GET_CONVERSATIONS: 'chat:get_conversations',
  GET_CONVERSATION: 'chat:get_conversation',
  UPDATE_CONVERSATION: 'chat:update_conversation',
  CLOSE_CONVERSATION: 'chat:close_conversation',

  // Message events - Client to Server
  SEND_MESSAGE: 'chat:send_message',
  EDIT_MESSAGE: 'chat:edit_message',
  DELETE_MESSAGE: 'chat:delete_message',
  GET_MESSAGES: 'chat:get_messages',
  MARK_AS_READ: 'chat:mark_as_read',

  // Typing indicator - Client to Server
  TYPING_START: 'chat:typing_start',
  TYPING_STOP: 'chat:typing_stop',

  // User status - Client to Server
  USER_ONLINE: 'chat:user_online',
  USER_OFFLINE: 'chat:user_offline',
} as const

// Chat events - Server to Client
export const CHAT_EVENTS_EMIT = {
  // Message events
  NEW_MESSAGE: 'chat:new_message',
  MESSAGE_UPDATED: 'chat:message_updated',
  MESSAGE_DELETED: 'chat:message_deleted',
  MESSAGE_READ: 'chat:message_read',

  // Conversation events
  CONVERSATION_CREATED: 'chat:conversation_created',
  CONVERSATION_UPDATED: 'chat:conversation_updated',
  CONVERSATION_CLOSED: 'chat:conversation_closed',

  // Typing indicator
  USER_TYPING: 'chat:user_typing',
  USER_STOPPED_TYPING: 'chat:user_stopped_typing',

  // User status
  USER_STATUS_CHANGED: 'chat:user_status_changed',

  // Error events
  ERROR: 'chat:error',
} as const

