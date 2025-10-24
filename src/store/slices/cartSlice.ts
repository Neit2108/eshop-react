import { API_ENDPOINTS } from "@/lib/api";
import { apiService } from "@/services/apiService";
import type { Cart, CartItem, CartState } from "@/types/cart.types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialState: CartState = {
  cartId: undefined,
  items: [],
  itemsCount: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
  selectedCartItem: null,
};

/**
 * Lấy giỏ hàng của người dùng
 */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Cart>(API_ENDPOINTS.CART.GET);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy giỏ hàng",
      );
    }
  },
);

/**
 * Thêm item vào giỏ hàng
 * @param cartId - ID của cart
 * @param variantId - ID của variant sản phẩm
 * @param quantity - Số lượng
 */
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (
    {
      cartId,
      variantId,
      quantity,
    }: { cartId: string; variantId: string; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiService.post<CartItem>(
        API_ENDPOINTS.CART.ADD(cartId),
        { variantId, quantity },
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi thêm sản phẩm vào giỏ hàng",
      );
    }
  },
);

export const updateItemInCart = createAsyncThunk(
  "cart/updateItemInCart",
  async (
    {
      cartId,
      itemId,
      quantity,
    }: { cartId: string; itemId: string; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiService.put<CartItem>(
        API_ENDPOINTS.CART.UPDATE(cartId, itemId),
        { quantity },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi cập nhật sản phẩm trong giỏ hàng",
      );
    }
  },
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (
    { cartId, itemId }: { cartId: string; itemId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiService.delete<CartItem>(
        API_ENDPOINTS.CART.DELETE(cartId, itemId),
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi xóa sản phẩm khỏi giỏ hàng",
      );
    }
  },
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedCartItem: (state, action: PayloadAction<CartItem | null>) => {
      state.selectedCartItem = action.payload;
    },
    // Helper để tính lại tổng
    recalculateTotals: (state) => {
      state.itemsCount = state.items.length;
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.isLoading = false;
        state.cartId = action.payload.id;
        state.items = action.payload.items;
        // Tính toán từ items nếu API trả về 0
        state.itemsCount = action.payload.items.length;
        state.totalAmount = action.payload.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0,
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addItemToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.isLoading = false;
          // ✅ Kiểm tra xem item đã tồn tại chưa
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id,
          );

          if (existingItemIndex !== -1) {
            // Item đã tồn tại -> Update
            state.items[existingItemIndex] = action.payload;
          } else {
            // Item mới -> Thêm vào array
            state.items.push(action.payload);
          }

          // Tính lại totals
          state.itemsCount = state.items.length;
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + item.totalPrice,
            0,
          );
        },
      )
      .addCase(addItemToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Item in Cart
      .addCase(updateItemInCart.pending, (state) => {
        // state.isLoading = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        updateItemInCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          // Tìm item trong array và update nó
          const updatedItem = action.payload;
          const itemIndex = state.items.findIndex(
            (item) => item.id === updatedItem.id,
          );
          if (itemIndex !== -1) {
            state.items[itemIndex] = updatedItem;
          }
          // Tính lại totals
          state.itemsCount = state.items.length;
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + item.totalPrice,
            0,
          );
        },
      )
      .addCase(updateItemInCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Item from Cart
      .addCase(deleteItemFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteItemFromCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.isLoading = false;
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id,
          );
          state.itemsCount = state.items.length;
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + item.totalPrice,
            0,
          );
        },
      )
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCartItem, recalculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
