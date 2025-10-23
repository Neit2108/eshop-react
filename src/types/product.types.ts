import type { PaginationParams } from ".";

export interface Product {
  id: string;
  name: string;
  shopId: string;
  status: string;
  averageRating: number;
  reviewCount: number;
  createdAt: Date;
  price: number;
  discountPercentage: number;
  imageUrl?: string;
}

export interface ProductFilters {
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "OUT_OF_STOCK" | "DISCONTINUED";
  categoryId?: string;
  searchTerm?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  sortBy?: "createdAt" | "price" | "name";
}

export interface ProductState {
  products: Product[];
  totalProducts: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  selectedProduct: Product | null;
}

export interface ProductQuery extends PaginationParams {
  filters?: ProductFilters;
}
