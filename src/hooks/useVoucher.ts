import {
  fetchVoucherById,
  fetchVoucherByCode,
  fetchPublicVouchers,
  fetchShopVouchers,
  clearCurrentVoucher,
  clearError,
  clearSuccessMessage,
  clearShopVouchers,
  fetchAllVouchers,
} from "@/store/slices/voucherSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useVoucher() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    vouchers,
    publicVouchers,
    shopVouchers,
    currentVoucher,
    isLoading,
    error,
    successMessage,
    pagination,
  } = useSelector((state: RootState) => state.voucher);

  return {
    // State
    vouchers,
    publicVouchers,
    shopVouchers,
    currentVoucher,
    isLoading,
    error,
    successMessage,
    pagination,
    // Actions

    getAllVouchers: useCallback((page?: number, limit?: number, shopId?: string) => {
      dispatch(fetchAllVouchers({ 
        page: page ?? 1, 
        limit: limit ?? 10,
        filters: shopId ? { shopId } : {}
      }));
    }, [dispatch]),
    fetchVoucherById: useCallback(
      (voucherId: string) => dispatch(fetchVoucherById(voucherId)),
      [dispatch]
    ),
    fetchVoucherByCode: useCallback(
      (code: string) => dispatch(fetchVoucherByCode(code)),
      [dispatch]
    ),
    fetchPublicVouchers: useCallback(
      () => dispatch(fetchPublicVouchers()),
      [dispatch]
    ),
    fetchShopVouchers: useCallback(
      (shopId: string) => dispatch(fetchShopVouchers(shopId)),
      [dispatch]
    ),
    clearCurrentVoucher: useCallback(
      () => dispatch(clearCurrentVoucher()),
      [dispatch]
    ),
    clearError: useCallback(() => dispatch(clearError()), [dispatch]),
    clearSuccessMessage: useCallback(
      () => dispatch(clearSuccessMessage()),
      [dispatch]
    ),
    clearShopVouchers: useCallback(
      () => dispatch(clearShopVouchers()),
      [dispatch]
    ),
  };
}

