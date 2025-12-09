import { API_ENDPOINTS } from "@/lib/api";
import { apiService } from "@/services/apiService";
import type { CreateOrderInput, Order, OrderFilters, OrderQuery, OrderState } from "@/types/order.types";
import type { PaginatedResponse } from '../../types/index';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { buildOrderQueryString } from "@/lib/helpers/queryBuilder";

const initialState: OrderState = {
  allOrders: [],
  shopOrders: [],
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
  successMessage: null,
  userPagination: {
    total: 0,
    totalPages: 0,
    currentPage: 0,
    limit: 10,
    hasNext: false,
    hasPrev: false,
  },
  pagination: {
    total: 0,
    totalPages: 0,
    currentPage: 0,
    limit: 10,
    hasNext: false,
    hasPrev: false,
  },
};


/**
 * Lấy tất cả đơn hàng
 */
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (query: OrderQuery, { rejectWithValue }) => {
    try {
      const queryString = buildOrderQueryString(
        { page: query.page, limit: query.limit },
        query.filters as OrderFilters,
      );
      console.log("queryString", queryString)
      const response = await apiService.get<PaginatedResponse<Order>>(
        `${API_ENDPOINTS.ORDERS.ALL}?${queryString}`,
      );
      return response.data;
    }
    catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy tất cả đơn hàng",
      );
    }
  },
);

/**
 * Lấy đơn hàng theo cửa hàng
 */
export const fetchOrdersByShop = createAsyncThunk(
  "order/fetchOrdersByShop",
  async (shopId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get<PaginatedResponse<Order>>(
        API_ENDPOINTS.ORDERS.BY_SHOP(shopId),
      );
      return response.data;
    }
    catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy đơn hàng theo cửa hàng",
      );
    }
  },
);
/**
 * Lấy danh sách đơn hàng của người dùng hiện tại
 */
export const myOrders = createAsyncThunk(
  "order/myOrders",
  async (query: OrderQuery, { rejectWithValue }) => {
    try {
      const queryString = buildOrderQueryString(
        { page: query.page, limit: query.limit },
        query.filters as OrderFilters,
      );
      const response = await apiService.get<PaginatedResponse<Order>>(
        `${API_ENDPOINTS.ORDERS.MY_ORDERS}?${queryString}`,
      );
      console.log("Fetched orders in myOrders:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy danh sách đơn hàng",
      );
    }
  },
);

/**
 * Tạo đơn hàng mới
 */
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData: CreateOrderInput, { rejectWithValue }) => {
    try {
      console.log("Creating order with data:", orderData);
      const response = await apiService.post<Order>(
        API_ENDPOINTS.ORDERS.CREATE,
        orderData,
      );
      console.log("Response data:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Lỗi khi tạo đơn hàng",
      );
    }
  },
);

/**
 * Lấy thông tin đơn hàng theo ID
 */
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Order>(
        API_ENDPOINTS.ORDERS.GET(orderId),
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy thông tin đơn hàng",
      );
    }
  },
);

/**
 * Cập nhật đơn hàng
 */
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (
    { orderId, orderData }: { orderId: string; orderData: Partial<Order> },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiService.put<Order>(
        API_ENDPOINTS.ORDERS.UPDATE(orderId),
        orderData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi cập nhật đơn hàng",
      );
    }
  },
);

/**
 * Hủy đơn hàng
 */
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.delete<Order>(
        API_ENDPOINTS.ORDERS.DELETE(orderId),
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi hủy đơn hàng",
      );
    }
  },
);

/**
 * Xác nhận đơn hàng
 */
export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.post<Order>(
        API_ENDPOINTS.ORDERS.CONFIRM(orderId),
      );
      return response.data;
    }
    catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi xác nhận đơn hàng",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<PaginatedResponse<Order>>) => {
        state.isLoading = false;
        state.allOrders = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Orders by Shop
      .addCase(fetchOrdersByShop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchOrdersByShop.fulfilled, (state, action: PayloadAction<PaginatedResponse<Order>>) => {
        state.isLoading = false;
        state.shopOrders = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchOrdersByShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // My Orders
      .addCase(myOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(myOrders.fulfilled, (state, action: PayloadAction<PaginatedResponse<Order>>) => {
        state.isLoading = false;
        console.log("Fetched orders:", action.payload);
        state.orders = action.payload.data;
        state.userPagination = action.payload.pagination;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
        state.successMessage = "Tạo đơn hàng thành công!";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.isLoading = false;
          state.currentOrder = action.payload;
          // Cập nhật trong danh sách nếu đã tồn tại
          const existingIndex = state.orders.findIndex(
            (order) => order.id === action.payload.id,
          );
          if (existingIndex !== -1) {
            state.orders[existingIndex] = action.payload;
          } else {
            state.orders.push(action.payload);
          }
        },
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        // Cập nhật trong danh sách
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id,
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.successMessage = "Cập nhật đơn hàng thành công!";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        // Cập nhật trạng thái trong danh sách
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id,
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
        state.successMessage = "Hủy đơn hàng thành công!";
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Confirm Order
      .addCase(confirmOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.successMessage = "Xác nhận đơn hàng thành công!";
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentOrder, clearError, clearSuccessMessage } =
  orderSlice.actions;
export default orderSlice.reducer;
