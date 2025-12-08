import { API_ENDPOINTS } from "@/lib/api";
import { apiService } from "@/services/apiService";
import type { Voucher, VoucherState } from "@/types/voucher.types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialState: VoucherState = {
  vouchers: [],
  publicVouchers: [],
  shopVouchers: [],
  currentVoucher: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

/**
 * Lấy voucher theo ID
 */
export const fetchVoucherById = createAsyncThunk(
  "voucher/fetchById",
  async (voucherId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Voucher>(
        API_ENDPOINTS.VOUCHERS.GET(voucherId)
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy thông tin voucher"
      );
    }
  }
);

/**
 * Lấy voucher theo mã code
 */
export const fetchVoucherByCode = createAsyncThunk(
  "voucher/fetchByCode",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Voucher>(
        API_ENDPOINTS.VOUCHERS.GET_BY_CODE(code)
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Không tìm thấy voucher với mã này"
      );
    }
  }
);

/**
 * Lấy danh sách voucher công khai (toàn sàn)
 */
export const fetchPublicVouchers = createAsyncThunk(
  "voucher/fetchPublic",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Voucher[]>(
        API_ENDPOINTS.VOUCHERS.PUBLIC
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy danh sách voucher"
      );
    }
  }
);

/**
 * Lấy danh sách voucher của shop
 */
export const fetchShopVouchers = createAsyncThunk(
  "voucher/fetchShopVouchers",
  async (shopId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Voucher[]>(
        API_ENDPOINTS.VOUCHERS.SHOP(shopId)
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy danh sách voucher của shop"
      );
    }
  }
);

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    clearCurrentVoucher: (state) => {
      state.currentVoucher = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearShopVouchers: (state) => {
      state.shopVouchers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Voucher by ID
      .addCase(fetchVoucherById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchVoucherById.fulfilled,
        (state, action: PayloadAction<Voucher>) => {
          state.isLoading = false;
          state.currentVoucher = action.payload;
        }
      )
      .addCase(fetchVoucherById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Voucher by Code
      .addCase(fetchVoucherByCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchVoucherByCode.fulfilled,
        (state, action: PayloadAction<Voucher>) => {
          state.isLoading = false;
          state.currentVoucher = action.payload;
          state.successMessage = "Áp dụng voucher thành công!";
        }
      )
      .addCase(fetchVoucherByCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentVoucher = null;
      })
      // Fetch Public Vouchers
      .addCase(fetchPublicVouchers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPublicVouchers.fulfilled,
        (state, action: PayloadAction<Voucher[]>) => {
          state.isLoading = false;
          state.publicVouchers = action.payload;
        }
      )
      .addCase(fetchPublicVouchers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Shop Vouchers
      .addCase(fetchShopVouchers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchShopVouchers.fulfilled,
        (state, action: PayloadAction<Voucher[]>) => {
          state.isLoading = false;
          state.shopVouchers = action.payload;
        }
      )
      .addCase(fetchShopVouchers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearCurrentVoucher,
  clearError,
  clearSuccessMessage,
  clearShopVouchers,
} = voucherSlice.actions;
export default voucherSlice.reducer;

