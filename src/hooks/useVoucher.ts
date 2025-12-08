import {
  fetchVoucherById,
  fetchVoucherByCode,
  fetchPublicVouchers,
  fetchShopVouchers,
  clearCurrentVoucher,
  clearError,
  clearSuccessMessage,
  clearShopVouchers,
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

    // Actions
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

