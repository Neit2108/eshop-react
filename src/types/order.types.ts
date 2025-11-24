export type CreateOrderInput = {
  shippingMethod: 'STANDARD';
  shippingAddress: string;
  recipientName: string;
  recipientPhone: string;
  paymentMethod: 'COD'; // sẽ thêm sau
  customerNote?: string;
  shippingFee?: number;
  discount?: number;
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


export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  shopId: string;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPING" | "DELIVERED" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  paymentStatus: string;
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
  orders: Order[];
  currentOrder: Order | null;
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
};