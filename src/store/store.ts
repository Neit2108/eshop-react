import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import adminReducer from './slices/adminSlice'
import categoryReducer from './slices/categorySlice'
import productCreationReducer from './slices/productCreationSlice'
import voucherReducer from './slices/voucherSlice'
import shopReducer from './slices/shopSlice'

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    ui: uiReducer,
    products: productReducer,
    productCreation: productCreationReducer,
    cart: cartReducer,
    order: orderReducer,
    categories: categoryReducer,
    voucher: voucherReducer,
    shop: shopReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

