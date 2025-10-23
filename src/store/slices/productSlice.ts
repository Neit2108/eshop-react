import { API_ENDPOINTS } from "@/lib/api";
import { buildQueryString } from "@/lib/helpers/queryBuilder";
import { apiService } from "@/services/apiService";
import type { PaginatedResponse } from "@/types";
import type {
  Product,
  ProductFilters,
  ProductQuery,
  ProductState,
} from "@/types/product.types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialState: ProductState = {
  products: [],
  totalProducts: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  isLoading: false,
  error: null,
  filters: {},
  selectedProduct: null,
};

/**
 * Lấy danh sách sản phẩm với phân trang và lọc
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (query: ProductQuery, { rejectWithValue }) => {
    try {
      const queryString = buildQueryString(
        { page: query.page, limit: query.limit },
        query.filters,
      );

      const response = await apiService.get<PaginatedResponse<Product>>(
        `${API_ENDPOINTS.PRODUCTS.LIST}?${queryString}`,
      );

      console.log("Fetched Products:", response.data);

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      return rejectWithValue(message);
    }
  },
);

/**
 * Lấy chi tiết sản phẩm theo ID
 */
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Product>(
        API_ENDPOINTS.PRODUCTS.GET(productId),
      );  

      console.log("Fetched Product by ID:", response.data);
      return response.data;
    } catch (error: any) {

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      return rejectWithValue(message);
    }
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (
    productData: Omit<Product, "id" | "createdAt">,
    { rejectWithValue },
  ) => {
    try {
      const response = await apiService.post<Product>(
        API_ENDPOINTS.PRODUCTS.CREATE,
        productData,
      );

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      return rejectWithValue(message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (
      state: ProductState,
      action: PayloadAction<ProductFilters>,
    ) => {
      state.filters = action.payload;
      state.page = 1; // Reset to first page when filters change
    },
    setPage: (state: ProductState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state: ProductState, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1; // Reset to first page when page size changes
    },
    clearFilters: (state: ProductState) => {
      state.filters = {};
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state: ProductState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (
          state: ProductState,
          action: PayloadAction<PaginatedResponse<Product>>,
        ) => {
          state.isLoading = false;
          state.products = action.payload.data;
          state.totalProducts = action.payload.pagination.total;
          state.page = action.payload.pagination.currentPage;
          state.limit = action.payload.pagination.limit;
          state.totalPages = action.payload.pagination.totalPages;
        },
      )
      .addCase(fetchProducts.rejected, (state: ProductState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state: ProductState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state: ProductState, action: PayloadAction<Product>) => {
          state.isLoading = false;
          state.selectedProduct = action.payload;
        },
      )
      .addCase(fetchProductById.rejected, (state: ProductState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Product
      .addCase(createProduct.pending, (state: ProductState) => {
        state.isLoading = true;
      })
      .addCase(
        createProduct.fulfilled,
        (state: ProductState, action: PayloadAction<Product>) => {
          state.isLoading = false;
          state.products.unshift(action.payload);
          state.totalProducts += 1;
        },
      )
      .addCase(createProduct.rejected, (state: ProductState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, setPage, setPageSize, clearFilters } =
  productSlice.actions;
export default productSlice.reducer;
