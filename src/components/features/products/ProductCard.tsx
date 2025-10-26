import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Product } from "@/types/product.types";
import { formatPrice } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  // onAddToCart: (productId: string, variantId: string, quantity: number) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate(`/products/${product.id}`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;

          if (rating >= starValue) {
            return (
              <span key={i} className="text-sm text-yellow-400">
                ★
              </span>
            );
          } else if (rating >= starValue - 0.5) {
            return (
              <span key={i} className="relative text-sm">
                <span className="text-gray-300">★</span>
                <span className="absolute inset-0 w-1/2 overflow-hidden text-yellow-400">
                  ★
                </span>
              </span>
            );
          } else {
            return (
              <span key={i} className="text-sm text-gray-300">
                ★
              </span>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-all duration-300 ${
        isHovered
          ? "scale-105 border-red-500 shadow-lg"
          : "border-gray-200 shadow-sm"
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-white">
          30%
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-1.5 p-2 sm:space-y-2 sm:p-2.5 md:p-3">
        {/* Brand */}
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase sm:text-xs md:text-xs"></p>

        {/* Product Name */}
        <h3 className="text-foreground line-clamp-1 cursor-pointer text-xs font-medium transition-colors hover:text-red-500 sm:text-sm md:text-sm">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(product.averageRating)}
          <span className="text-muted-foreground ml-1 text-xs">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price - Fixed to prevent wrapping */}
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground truncate text-xs line-through">
            {formatPrice(product.price * 0.3)}
          </span>
          <span className="truncate text-xs font-bold text-red-500 sm:text-sm">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Add to Cart Button - Push to bottom */}
        <div className="mt-auto pt-2">
          <Button
            onClick={handleAddToCart}
            className={`w-full cursor-pointer py-1.5 text-xs transition-all duration-300 sm:py-2 sm:text-sm ${
              isHovered
                ? "bg-red-500 text-white hover:bg-red-600"
                : "border border-red-500 bg-white text-red-500 hover:bg-red-50"
            }`}
            variant={isHovered ? "default" : "outline"}
          >
            <ShoppingCart size={14} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">THÊM VÀO GIỎ HÀNG</span>
            <span className="sm:hidden">THÊM</span>
          </Button>
        </div>
      </div>
    </div>
  );
}