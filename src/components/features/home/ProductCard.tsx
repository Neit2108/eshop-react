// src/pages/home/components/ProductCard.tsx

import React from 'react';
import { Card } from '@/components/ui/card';
import { type IProduct } from '@/pages/home/mockData';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discountPercentage = product.discount || 0;
  const sellProgressPercentage = product.stockLimit
    ? Math.round((product.sold / product.stockLimit) * 100)
    : 0;

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded font-bold text-xs sm:text-sm">
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        {/* Hot Badge */}
        {product.sold > 1000 && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
            HOT 🔥
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        {/* Vendor Name */}
        {product.vendor && (
          <p className="text-xs text-gray-500 mb-1 truncate">{product.vendor}</p>
        )}

        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-10">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm sm:text-base font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.round(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            ({product.reviewCount.toLocaleString('vi-VN')})
          </span>
        </div>

        {/* Sales Progress Bar */}
        {product.stockLimit && (
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-orange-500 h-full transition-all duration-300"
                style={{ width: `${sellProgressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Đã bán {product.sold.toLocaleString('vi-VN')}
            </p>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(product.id)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition-colors flex items-center justify-center gap-2 mt-auto text-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Thêm vào giỏ
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;