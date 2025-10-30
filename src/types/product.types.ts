import type { PaginationParams } from ".";

export interface Product {
  id: string;
  name: string;
  shopId: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "OUT_OF_STOCK" | "DISCONTINUED"; // hoặc string nếu chưa enum
  averageRating: number;
  reviewCount: number;
  createdAt: string; // trả về dạng ISO string, không phải Date object
  imageUrl: string;
  price: number;
  discountPercentage?: number; // không có trong response, nên để optional
  shop: Shop;
  images: ProductImage[];
  variants: ProductVariant[];
  options?: ProductOption[]; // có thể rỗng
  categories: ProductCategory[];
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price: number;
  currency: string;
  sku: string;
  stock: number;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED"; // hoặc string
  optionValues: VariantOptionValue[];
  images: VariantImage[];
}

export interface VariantOptionValue {
  id: string;
  productOptionId?: string;
  productOptionValueId?: string;
  productOption?: {
    name: string;
  };
  productOptionValue?: {
    value: string;
  };
}

export interface VariantImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  parentCategoryId?: string;
}

export interface Shop {
  id: string;
  name: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: {
    id: string;
    value: string;
  }[];
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


// add product
// Product creation wizard types
export interface CreateDraftProductInput {
  name: string;
  shopId: string;
  description?: string;
}

export interface AddProductCategoriesInput {
  categoryIds: string[];
}

export interface CreateProductOptionValueInput {
  value: string;
  sortOrder?: number;
}

export interface CreateProductOptionInput {
  name: string;
  values: CreateProductOptionValueInput[];
}

export interface AddProductOptionsInput {
  options: CreateProductOptionInput[];
}

export interface CreateProductVariantInput {
  name: string;
  value: string;
  price: number;
  currency?: string;
  description?: string;
  optionCombination?: Record<string, string>;
}

export interface AddProductVariantsInput {
  variants: CreateProductVariantInput[];
}

export interface AddProductImageInput {
  imageUrl: string;
  isPrimary?: boolean;
  sortOrder?: number;
  description?: string;
}

export interface AddProductImagesInput {
  images: AddProductImageInput[];
}

export interface UpdateProductStatusInput {
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'OUT_OF_STOCK' | 'DISCONTINUED';
}

export interface ProductStatusResponse {
  id: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'OUT_OF_STOCK' | 'DISCONTINUED';
  updatedAt: Date;
}


// response types for each step
export interface DraftProductResponse {
  id: string;
  name: string;
  shopId: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "OUT_OF_STOCK" | "DISCONTINUED";
  description?: string;
  createdAt: Date;
}

export interface ProductCategoriesResponse {
  productId: string;
  categories: {
    id: string;
    name: string;
    description?: string;
  }[];
}

export interface ProductOptionsResponse {
  productId: string;
  options: {
    id: string;
    name: string;
    values: {
      id: string;
      value: string;
      sortOrder: number;
    }[];
  }[];
}

export interface ProductVariantsResponse {
  productId: string;
  variants: {
    id: string;
    name: string;
    value: string;
    price: number;
    currency: string;
    sku: string;
    optionValues?: {
      optionName: string;
      optionValue: string;
    }[];
  }[];
}

export interface ProductImagesResponse {
  productId: string;
  images: {
    id: string;
    imageUrl: string;
    isPrimary: boolean;
    sortOrder: number;
    description?: string;
  }[];
}

export interface ProductStatusResponse {
  id: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "OUT_OF_STOCK" | "DISCONTINUED";
  updatedAt: Date;
}


export interface ProductWizardState {
  productId: string | null;
  step: number;
  draft: CreateDraftProductInput;
  categories: AddProductCategoriesInput;
  options: AddProductOptionsInput;
  variants: AddProductVariantsInput;
  images: AddProductImagesInput;
  status: 'draft' | 'published' | 'archived';
  loading: boolean;
  error: string | null;
}

export interface ProductCreationState{
  productId: string | null;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  draft: DraftProductResponse;
  categoriesData: ProductCategoriesResponse;
  options: ProductOptionsResponse;
  variants: ProductVariantsResponse;
  images: ProductImagesResponse;
  status: ProductStatusResponse;
}

export interface Shop {
  id: string;
  name: string;
}

// catory
export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}