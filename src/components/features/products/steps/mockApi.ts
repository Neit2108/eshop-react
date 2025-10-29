// Mock API utilities for product creation
import type { 
  CreateDraftProductInput, 
  AddProductCategoriesInput,
  AddProductOptionsInput,
  AddProductVariantsInput,
  AddProductImagesInput
} from '@/types/product.types';

// Simulate API delay
const delay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Step 1: Create draft product
  createDraftProduct: async (input: CreateDraftProductInput): Promise<{ productId: string }> => {
    await delay();
    const productId = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('[Mock API] Created draft product:', { productId, ...input });
    return { productId };
  },

  // Step 2: Add categories
  addCategories: async (productId: string, input: AddProductCategoriesInput): Promise<{ success: boolean }> => {
    await delay();
    console.log('[Mock API] Added categories:', { productId, ...input });
    return { success: true };
  },

  // Step 3: Add options
  addOptions: async (productId: string, input: AddProductOptionsInput): Promise<{ success: boolean }> => {
    await delay();
    console.log('[Mock API] Added options:', { productId, ...input });
    return { success: true };
  },

  // Step 4: Add variants
  addVariants: async (productId: string, input: AddProductVariantsInput): Promise<{ success: boolean }> => {
    await delay();
    console.log('[Mock API] Added variants:', { productId, ...input });
    return { success: true };
  },

  // Step 5: Add images
  addImages: async (productId: string, input: AddProductImagesInput): Promise<{ success: boolean }> => {
    await delay();
    console.log('[Mock API] Added images:', { productId, ...input });
    return { success: true };
  },

  // Step 6: Update product status
  updateProductStatus: async (productId: string, status: string): Promise<{ success: boolean }> => {
    await delay();
    console.log('[Mock API] Updated product status:', { productId, status });
    return { success: true };
  },

  // Mock data
  getShops: async (): Promise<Array<{ id: string; name: string }>> => {
    await delay(300);
    return [
      { id: 'shop_1', name: 'Main Shop' },
      { id: 'shop_2', name: 'Secondary Shop' },
      { id: 'shop_3', name: 'Marketplace' },
    ];
  },

  getCategories: async (): Promise<Array<{ id: string; name: string }>> => {
    await delay(300);
    return [
      { id: 'cat_1', name: 'Electronics' },
      { id: 'cat_2', name: 'Clothing' },
      { id: 'cat_3', name: 'Home & Garden' },
      { id: 'cat_4', name: 'Sports' },
      { id: 'cat_5', name: 'Books' },
      { id: 'cat_6', name: 'Toys' },
    ];
  },
};