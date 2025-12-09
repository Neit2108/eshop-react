import { API_ENDPOINTS } from "@/lib/api";
import { apiService } from "@/services/apiService";
import type { Shop, ShopState } from "@/types/product.types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ShopState = {
  shops: [],
  shop: null,
  products: [],
  totalProducts: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  isLoading: false,
  error: null,
};

/**
 * Lấy cửa hàng theo người dùng hiện tại
 */
export const fetchShopByUserId = createAsyncThunk(
  "shop/fetchShopByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Shop>(API_ENDPOINTS.SHOPS.GET_BY_USER_ID);
      console.log("response", response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy cửa hàng theo người dùng hiện tại",
      );
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShopByUserId.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchShopByUserId.fulfilled, (state, action: PayloadAction<Shop>) => {
      state.isLoading = false;
      state.shop = action.payload;
    });
    builder.addCase(fetchShopByUserId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default shopSlice.reducer;