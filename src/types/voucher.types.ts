import type { PaginationParams } from ".";

// Enum cho loại voucher
export type VoucherType = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';

// Enum cho phạm vi áp dụng voucher
export type VoucherScope = 'PLATFORM' | 'SHOP';

// Enum cho trạng thái voucher
export type VoucherStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'USED_UP';

export interface Voucher {
  id: string;
  code: string;
  name: string;
  description?: string;
  type: VoucherType;
  discountValue: number;
  maxDiscount?: number;
  minOrderValue?: number;
  scope: VoucherScope;
  shopId?: string | null;
  totalLimit?: number | null;
  usedCount?: number | null;
  limitPerUser?: number | null;
  startDate: string;
  endDate: string;
  status: VoucherStatus;
}

export const voucherTypeMap: Record<VoucherType, string> = {
  PERCENTAGE: 'Giảm theo phần trăm',
  FIXED_AMOUNT: 'Giảm số tiền cố định',
  FREE_SHIPPING: 'Miễn phí vận chuyển',
};

export const voucherScopeMap: Record<VoucherScope, string> = {
  PLATFORM: 'Toàn sàn',
  SHOP: 'Cửa hàng',
};

export const voucherStatusMap: Record<VoucherStatus, string> = {
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Chưa kích hoạt',
  EXPIRED: 'Đã hết hạn',
  USED_UP: 'Đã hết lượt sử dụng',
};

export interface VoucherState {
  vouchers: Voucher[];
  publicVouchers: Voucher[];
  shopVouchers: Voucher[];
  currentVoucher: Voucher | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface VoucherFilters {
  code?: string;
  name?: string;
  status?: VoucherStatus;
  scope?: VoucherScope;
  shopId?: string;
}

export interface VoucherQuery extends PaginationParams {
  filters?: VoucherFilters;
}