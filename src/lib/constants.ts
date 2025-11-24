export const APP_NAME = 'EShop web'
export const APP_VERSION = '1.0.0'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const API_TIMEOUT = 30000

export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  NOT_FOUND: '/not-found',
  PRODUCT_LIST: '/products',
  PRODUCT_DETAIL: '/products/:productId',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  CHAT: '/chat',
} as const

export const ROLE_PERMISSIONS = {
  admin: ['read', 'write', 'delete', 'admin'],
  user: ['read', 'write'],
  guest: ['read'],
} as const

/**
 * Constants and configuration for messaging system
 */

export const MESSAGE_CONFIG = {
  MAX_CHARACTERS: 1000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
} as const;

export const UI_CONFIG = {
  CONVERSATION_LIST_WIDTH: {
    mobile: '100%',
    tablet: '320px',
    desktop: '380px',
  },
  AUTO_SCROLL_THRESHOLD: 100, // pixels from bottom
} as const;

export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
} as const;
