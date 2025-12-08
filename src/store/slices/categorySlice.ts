import { apiService } from "@/services/apiService";
import type { Category, CategoryState } from "@/types/product.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Category[]>("/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});


export default categorySlice.reducer;