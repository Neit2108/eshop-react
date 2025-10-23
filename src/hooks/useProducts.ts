import { clearFilters, createProduct, fetchProductById, fetchProducts, setFilters, setPage, setPageSize } from "@/store/slices/productSlice";
import { type AppDispatch, type RootState } from "@/store/store";
import type { Product, ProductFilters } from "@/types/product.types";
import { useDispatch, useSelector } from "react-redux";

export function useProducts(){
    const dispatch = useDispatch<AppDispatch>();
    const {
        products,
        totalProducts,
        page,
        limit,
        totalPages,
        isLoading,
        error,
        filters,
        selectedProduct,
    } = useSelector((state: RootState) => state.products);

    return {
        products,
        totalProducts,
        page,
        limit,
        totalPages,
        isLoading,
        error,
        filters,
        selectedProduct,
        fetchProducts: (searchTerm?: string) => {
            dispatch(fetchProducts({ page, limit, filters: {...filters, searchTerm} }));
        },
        fetchProductById: (id: string) => dispatch(fetchProductById(id)),
        createProduct: (data: Omit<Product, 'id' | 'createdAt'>) => dispatch(createProduct(data)),
        setFilters: (newFilters: ProductFilters) => dispatch(setFilters(newFilters)),
        setPage: (newPage: number) => dispatch(setPage(newPage)),
        setPageSize: (newLimit: number) => dispatch(setPageSize(newLimit)),
        clearFilters: () => dispatch(clearFilters()),
    }
}