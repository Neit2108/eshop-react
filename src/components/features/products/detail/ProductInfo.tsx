import { Heart, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product.types"
import RatingStars from "../../reviews/RatingStars"

interface ProductInfoProps {
  product: Product
  selectedVariant: string
  onVariantChange: (variant: string) => void
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export default function ProductInfo({
  product,
  selectedVariant,
  onVariantChange,
  quantity,
  onQuantityChange,
}: ProductInfoProps) {
  // Get available variants for selection
  const variantNames = product.variants?.map(v => v.name) || []
  
  // Get current selected variant details
  const currentVariant = product.variants?.find(v => v.id === selectedVariant)
  
  // Calculate available stock from variants or use default
  const availableStock = currentVariant?.stock || (product.variants?.[0]?.stock ?? 0)
  
  // Get the correct price (from variant if selected, otherwise from product)
  const displayPrice = currentVariant?.price ?? product.price
  const displayCurrency = currentVariant?.currency ?? "VND"

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: product.id,
      productName: product.name,
      variant: selectedVariant || "default",
      quantity,
      price: displayPrice,
    })
  }

  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", {
      productId: product.id,
      productName: product.name,
    })
  }

  const handleAddToCompare = () => {
    console.log("Added to compare:", {
      productId: product.id,
      productName: product.name,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Title and Brand */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">Shop:</span>
          <span className="font-semibold text-foreground">{product.shop.name}</span>
          <RatingStars rating={Math.round(product.averageRating)} />
          <span className="text-muted-foreground text-sm">Review ({product.reviewCount})</span>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-[#FF6B6B]">
          {displayPrice.toLocaleString()} {displayCurrency}
        </span>
        <span className="text-sm text-green-600 font-semibold">
          Available In Stock: {availableStock} items
        </span>
      </div>

      {/* Variant Selection */}
      {variantNames.length > 0 && (
        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">
            LỰA CHỌN:
          </label>
          <div className="flex gap-3 flex-wrap">
            {product.variants?.map((variant) => (
              <button
                key={variant.id}
                onClick={() => onVariantChange(variant.id)}
                className={`px-6 py-2 border-2 rounded-lg font-semibold transition-colors ${
                  selectedVariant === variant.id
                    ? "border-[#FF6B6B] bg-[#FF6B6B] text-white"
                    : "border-border text-foreground hover:border-[#FF6B6B]"
                }`}
                disabled={variant.stock === 0}
              >
                {variant.name} {variant.stock === 0 ? "(Hết hàng)" : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shipping Info */}
      <div className="text-sm text-muted-foreground">Free Shipping (Est. Delivery Time 2-3 Days)</div>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-foreground hover:bg-muted"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-12 text-center border-0 bg-transparent text-foreground"
            min="1"
            max={availableStock}
          />
          <button 
            onClick={() => onQuantityChange(Math.min(availableStock, quantity + 1))} 
            className="px-3 py-2 text-foreground hover:bg-muted"
            disabled={quantity >= availableStock}
          >
            +
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-2 rounded-lg"
          disabled={availableStock === 0}
        >
          🛒 ADD TO CART
        </Button>
      </div>

      {/* Wishlist and Compare */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToWishlist}
          className="flex items-center gap-2 text-foreground hover:text-[#FF6B6B] transition-colors"
        >
          <Heart size={20} />
          <span>Add to Wishlist</span>
        </button>
        <button
          onClick={handleAddToCompare}
          className="flex items-center gap-2 text-foreground hover:text-[#FF6B6B] transition-colors"
        >
          <ArrowRightLeft size={20} />
          <span>Add to Compare</span>
        </button>
      </div>
    </div>
  )
}
