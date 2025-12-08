import { fetchShopByUserId } from "@/store/slices/shopSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useShop() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    shops,
    shop,
    products,
    totalProducts,
    page,
    limit,
    totalPages,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.shop);

  return {
    shops,
    shop,
    products,
    totalProducts,
    page,
    limit,
    totalPages,
    isLoading,
    error,
    fetchShopByUserId: useCallback(
      () => dispatch(fetchShopByUserId()),
      [dispatch]
    ),
  };
}
