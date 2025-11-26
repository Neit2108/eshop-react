import { addCategories, addImages, addOptions, addVariants, createDraftProduct, goBack, publishProduct, setCurrentStep } from "@/store/slices/productCreationSlice";
import type { AppDispatch, RootState } from "@/store/store";
import type { AddProductCategoriesInput, AddProductImagesInput, AddProductOptionsInput, AddProductVariantsInput, CreateDraftProductInput, UpdateProductStatusInput } from "@/types/product.types";
import { useDispatch, useSelector } from "react-redux";

export const useProductCreation = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        productId,
        currentStep,
        isLoading,
        error,
        draft,
        categoriesData,
        options,
        variants,
        images,
        status
    } = useSelector((state: RootState) => state.productCreation);

    return {
        productId,
        currentStep,
        isLoading,
        error,
        draft,
        categoriesData,
        options,
        variants,
        images,
        status,
        setCurrentStep: (step: number) => {
            dispatch(setCurrentStep(step));
        },
        goBack: () => {
            dispatch(goBack());
        },
        setError: (error: string | null) => {
            console.warn("setError is not implemented yet", error);        
        },
        createDraftProduct: (data: CreateDraftProductInput) => {
            dispatch(createDraftProduct(data));
        },
        addCategories: (productId: string, data: AddProductCategoriesInput) => {
            dispatch(addCategories({ productId, data }));
        },
        addOptions: (productId: string, data: AddProductOptionsInput) => {
            dispatch(addOptions({ productId, data }));
        },
        addVariants: (productId: string, data: AddProductVariantsInput) => {
            dispatch(addVariants({ productId, data }));
        },
        addImages: (productId: string, data: AddProductImagesInput) => {
            dispatch(addImages({ productId, data }));
        },
        publishProduct: (productId: string, data: UpdateProductStatusInput) => {
            dispatch(publishProduct({ productId, data }));
        }
    }
}