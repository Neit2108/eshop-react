import { apiService } from "@/services/apiService";
import type { Category, CategoryState } from "@/types/product.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get<Category[]>("/categories?name=" + name);
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
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});


export default categorySlice.reducer;