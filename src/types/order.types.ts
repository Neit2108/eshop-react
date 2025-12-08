import type { PaginationParams } from ".";

export type CreateOrderInput = {
  shippingMethod: 'STANDARD';
  shippingAddress: string;
  recipientName: string;
  recipientPhone: string;
  paymentMethod: "COD" | "BANK_TRANSFER" | "E_WALLET" | "CREDIT_CARD"; // sẽ thêm sau
  customerNote?: string;
  shippingFee?: number;
  discount?: number;
  voucherCode?: string;
};

export interface OrderItem {
  id: string;
  orderId?: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productImageUrl: string;
  sku: string;
}

export const orderStatusMap: Record<Order["status"], string> = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  PROCESSING: "Đang xử lý",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
  REFUNDED: "Đã hoàn tiền",
};

export const paymentMethodMap: Record<Order["paymentMethod"], string> = {
  COD: "Thanh toán khi nhận hàng",
  BANK_TRANSFER: "Chuyển khoản ngân hàng",
  E_WALLET: "Ví điện tử",
  CREDIT_CARD: "Thẻ tín dụng/Ghi nợ",
};

export const shippingMethodMap: Record<Order["shippingMethod"], string> = {
  STANDARD: "Tiêu chuẩn",
  EXPRESS: "Hỏa tốc",
  SAME_DAY: "Trong ngày",
};

export const paymentStatusMap: Record<Order["paymentStatus"], string> = {
  PENDING: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  FAILED: "Thanh toán thất bại",
  REFUNDED: "Đã hoàn tiền",
};

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  shopId: string;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPING" | "DELIVERED" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  shippingMethod: "STANDARD" | "EXPRESS" | "SAME_DAY";
  shippingAddress: string;
  recipientName: string;
  recipientPhone: string;
  paymentMethod: "COD" | "BANK_TRANSFER" | "E_WALLET" | "CREDIT_CARD";
  paidAt: string | null;
  customerNote: string | null;
  shopNote: string | null;
  cancelReason: string | null;
  confirmedAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string | null;
  currency: string;
  items: OrderItem[];
}

export type OrderStatus = Order["status"]
export type PaymentMethod = Order["paymentMethod"]
export type ShippingMethod = Order["shippingMethod"]

export type OrderState = {
  allOrders: Order[];
  shopOrders: Order[];
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  userPagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};


export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: string;
  minTotalAmount?: number;
  maxTotalAmount?: number;
  shopId?: string;
}

export interface OrderQuery extends PaginationParams {
  filters?: OrderFilters;
}