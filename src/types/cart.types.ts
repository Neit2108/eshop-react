export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName?: string;
  productImage?: string;
  productCategory?: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  itemsCount: number;
}

export interface CartState {
  cartId?: string;
  items: CartItem[];
  itemsCount: number;
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
  selectedCartItem: CartItem | null;
}
