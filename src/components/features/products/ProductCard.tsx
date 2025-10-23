import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Product } from "@/types/product.types"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // log product to debug
  console.log("Product debug:", product)

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < count ? "text-yellow-400" : "text-gray-300"}`}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-lg border transition-all duration-300 overflow-hidden ${
        isHovered ? "border-red-500 shadow-lg scale-105" : "border-gray-200 shadow-sm"
      }`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
          {product.discountPercentage}%
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-2.5 md:p-3 space-y-1.5 sm:space-y-2">
        {/* Brand */}
        <p className="text-xs sm:text-xs md:text-xs text-muted-foreground font-semibold uppercase tracking-wide">TILO Shop</p>

        {/* Product Name */}
        <h3 className="text-xs sm:text-sm md:text-sm font-medium text-foreground line-clamp-1 hover:text-red-500 transition-colors cursor-pointer">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(product.averageRating)}
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(product.price * 0.3)} VNĐ
          </span>
          <span className="text-xs sm:text-sm font-bold text-red-500">{formatPrice(product.price)} VNĐ</span>
        </div>

        {/* Add to Cart Button */}
        <Button
          className={`w-full mt-2 text-xs sm:text-sm py-1.5 sm:py-2 transition-all duration-300 cursor-pointer ${
            isHovered
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white text-red-500 border border-red-500 hover:bg-red-50"
          }`}
          variant={isHovered ? "default" : "outline"}
        >
          <ShoppingCart size={14} className="mr-1 sm:mr-2" />
          <span className="hidden sm:inline">THÊM VÀO GIỎ HÀNG</span>
          <span className="sm:hidden">THÊM</span>
        </Button>
      </div>
    </div>
  )
}
