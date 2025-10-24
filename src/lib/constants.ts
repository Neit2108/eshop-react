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
  PRODUCT_DETAIL: '/products/:id',
  CHECKOUT: '/checkout',
} as const

export const ROLE_PERMISSIONS = {
  admin: ['read', 'write', 'delete', 'admin'],
  user: ['read', 'write'],
  guest: ['read'],
} as const