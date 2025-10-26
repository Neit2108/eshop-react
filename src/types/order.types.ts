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

export type Order = {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shippingAddress: string;
  recipientName: string;
  recipientPhone: string;
  shippingMethod: 'STANDARD';
  paymentMethod: 'COD';
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  customerNote?: string;
  shippingFee: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderState = {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
};