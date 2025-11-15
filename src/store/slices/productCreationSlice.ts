import { apiService } from "@/services/apiService";
import { type DraftProductResponse, type ProductCategoriesResponse, type AddProductCategoriesInput, type AddProductImagesInput, type AddProductOptionsInput, type AddProductVariantsInput, type CreateDraftProductInput, type ProductCreationState, type ProductImagesResponse, type ProductOptionsResponse, type ProductStatusResponse, type ProductVariantsResponse, type UpdateProductStatusInput } from "@/types/product.types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductCreationState = {
    productId: null,
    currentStep: 0,
    isLoading: false,
    error: null,
    draft: {
        id: '',
        name: '',
        description: '',
        shopId: 'b059c23f-c595-4167-b9de-71aece84ad6b',
        createdAt: new Date(),
        status: 'DRAFT',
    },
    categoriesData: {
        productId: '',
        categories: [],
    },
    options: {
        productId: '',
        options: [],
    },
    variants: {
        productId: '',
        variants: [],
    },
    images: {
        productId: '',
        images: [],
    },
    status: {
        id: '',
        status: 'DRAFT',
        updatedAt: new Date(),
    },
}

export const createDraftProduct = createAsyncThunk(
    "productCreation/createDraftProduct",
    async (data: CreateDraftProductInput, {rejectWithValue}) => {
        try{
            const response = await apiService.post<DraftProductResponse>("/products", data);
            return response.data;
        }
        catch{
            return rejectWithValue("Lỗi khi tạo sản phẩm nháp");
        }
    }
)

export const addCategories = createAsyncThunk(
    "productCreation/addCategories",
    async ({productId, data} :{productId: string, data: AddProductCategoriesInput}, {rejectWithValue}) => {
        try{
            const response = await apiService.put<ProductCategoriesResponse>(`/products/${productId}/categories`, data);
            return response.data;
        }
        catch{
            return rejectWithValue("Lỗi khi thêm danh mục sản phẩm");
        }
    }
)

export const addOptions = createAsyncThunk(
    "productCreation/addOptions",
    async ({productId, data} :{productId: string, data: AddProductOptionsInput}, {rejectWithValue}) => {
        try{
            const response = await apiService.post<ProductOptionsResponse>(`/products/${productId}/options`, data);
            return response.data;
        }
        catch{
            return rejectWithValue("Lỗi khi thêm tùy chọn sản phẩm");
        }
    }
)

export const addVariants = createAsyncThunk(
    "productCreation/addVariants",
    async ({productId, data} :{productId: string, data: AddProductVariantsInput}, {rejectWithValue}) => {
        try{
            const response = await apiService.post<ProductVariantsResponse>(`/products/${productId}/variants`, data);
            return response.data;
        }
        catch{
            return rejectWithValue("Lỗi khi thêm biến thể sản phẩm");
        }
    }
)

export const addImages = createAsyncThunk(
    "productCreation/addImages",
    async ({productId, data} :{productId: string, data: AddProductImagesInput}, {rejectWithValue}) => {
        try{
            const response = await apiService.post<ProductImagesResponse>(`/products/${productId}/images`, data);
            return response.data;
        }
        catch{
            return rejectWithValue("Lỗi khi thêm hình ảnh sản phẩm");
        }
    }
)

export const publishProduct = createAsyncThunk(
    "productCreation/publishProduct",
    async ({productId, data}: {productId: string, data: UpdateProductStatusInput}, {rejectWithValue}) => {
        try{
            const response = await apiService.put<ProductStatusResponse>(`/products/${productId}/status`, data);
            return response.data;
        }
        catch{
            return rejectWithValue("Lỗi khi cập nhật trạng thái sản phẩm");
        }
    }
)

const productCreationSlice = createSlice({
    name: "productCreation",
    initialState,
    reducers: {
        setCurrentStep(state, action: PayloadAction<number>) {
            state.currentStep = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        goBack(state) {
            if(state.currentStep > 0){
                state.currentStep -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createDraftProduct.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createDraftProduct.fulfilled, (state, action: PayloadAction<DraftProductResponse>) => {
            state.isLoading = false;
            state.draft = action.payload;
            state.productId = action.payload.id;
            state.currentStep = 1;
        })
        .addCase(createDraftProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        .addCase(addCategories.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addCategories.fulfilled, (state, action: PayloadAction<ProductCategoriesResponse>) => {
            state.isLoading = false;
            state.categoriesData = action.payload;
            state.currentStep = 2;
        })
        .addCase(addCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        .addCase(addVariants.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addVariants.fulfilled, (state, action: PayloadAction<ProductVariantsResponse>) => {
            state.isLoading = false;
            state.variants = action.payload;
            state.currentStep = 3;
        })
        .addCase(addVariants.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        .addCase(addImages.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addImages.fulfilled, (state, action: PayloadAction<ProductImagesResponse>) => {
            state.isLoading = false;
            state.images = action.payload;
            state.currentStep = 4;
        })
        .addCase(addImages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        .addCase(publishProduct.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(publishProduct.fulfilled, (state, action: PayloadAction<ProductStatusResponse>) => {
            state.isLoading = false;
            state.status = action.payload;
            // state.currentStep = 5;
        })
        .addCase(publishProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    }
})

export const {setCurrentStep, setError, goBack} = productCreationSlice.actions;

export default productCreationSlice.reducer;