import { apiService } from "@/services/apiService";
import type { DashboardState, SummaryStats } from "@/types/admin.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: DashboardState = {
  summaryStats: [],
  loading: false,
  error: null,
};

export const fetchSummaryStats = createAsyncThunk(
  "admin/fetchSummaryStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get<SummaryStats[]>("/admin/summary");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi lấy dữ liệu tổng hợp",
      );
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummaryStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummaryStats.fulfilled, (state, action) => {
        state.loading = false;
        state.summaryStats = action.payload;
      })
      .addCase(fetchSummaryStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;
