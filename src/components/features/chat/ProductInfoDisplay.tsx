import React from 'react';
import type { Product } from '@/types/product.types';
import { AlertCircle } from 'lucide-react';

interface ProductInfoDisplayProps {
  product: Product | null;
  isLoading?: boolean;
  onDetail?: () => void;
}

export const ProductInfoDisplay: React.FC<ProductInfoDisplayProps> = ({
  product,
  isLoading = false,
  onDetail,
}) => {
  if (!product && !isLoading) return null;

  if (isLoading) {
    return (
      <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const imageUrl = product.images?.[0]?.imageUrl || product.imageUrl;
  const priceDisplay = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price);

  return (
    <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-4 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-colors">
      <div className="flex items-start gap-3 cursor-pointer group" onClick={onDetail}>
        {/* Product Image */}
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            Từ cửa hàng:{' '}
            <span className="font-medium text-gray-800">
              {product.shop?.name || 'Không rõ'}
            </span>
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-indigo-600">
              {priceDisplay}
            </span>
            {product.status === 'OUT_OF_STOCK' && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded font-medium">
                Hết hàng
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

