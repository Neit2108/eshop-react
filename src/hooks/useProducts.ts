import { clearFilters, createProduct, fetchProductById, fetchProductByShopId, fetchProducts, setFilters, setPage, setPageSize } from "@/store/slices/productSlice";
import { type AppDispatch, type RootState } from "@/store/store";
import type { Product, ProductFilters } from "@/types/product.types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useProducts(){
    const dispatch = useDispatch<AppDispatch>();
    const {
        products,
        productsByShop,
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
        productsByShop,
        totalProducts,
        page,
        limit,
        totalPages,
        isLoading,
        error,
        filters,
        selectedProduct,
        fetchProducts: useCallback((searchTerm?: string, currentPage?: number, currentLimit?: number, shopId?: string) => {
            dispatch(fetchProducts({ 
                page: currentPage ?? page, 
                limit: currentLimit ?? limit, 
                filters: {...filters, searchTerm, ...(shopId && { shopId })} 
            }));
        }, [dispatch]),
        fetchProductById: (id: string) => dispatch(fetchProductById(id)),
        fetchProductByShopId: (shopId: string) => dispatch(fetchProductByShopId(shopId)),
        createProduct: (data: Omit<Product, 'id' | 'createdAt'>) => dispatch(createProduct(data)),
        setFilters: (newFilters: ProductFilters) => dispatch(setFilters(newFilters)),
        setPage: (newPage: number) => dispatch(setPage(newPage)),
        setPageSize: (newLimit: number) => dispatch(setPageSize(newLimit)),
        clearFilters: () => dispatch(clearFilters()),
    }
}