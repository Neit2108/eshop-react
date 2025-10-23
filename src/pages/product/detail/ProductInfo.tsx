import { Heart, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import RatingStars from "../../reviews/RatingStars"

interface Product {
  id: number
  title: string
  brand: string
  originalPrice: number
  currentPrice: number
  rating: number
  reviewCount: number
  stockQuantity: number
  description: string
  sizes: string[]
}

interface ProductInfoProps {
  product: Product
  selectedSize: string
  onSizeChange: (size: string) => void
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export default function ProductInfo({
  product,
  selectedSize,
  onSizeChange,
  quantity,
  onQuantityChange,
}: ProductInfoProps) {
  const handleAddToCart = () => {
    console.log("Added to cart:", { product: product.id, size: selectedSize, quantity })
  }

  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", product.id)
  }

  const handleAddToCompare = () => {
    console.log("Added to compare:", product.id)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Title and Brand */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">Brands:</span>
          <span className="font-semibold text-foreground">{product.brand}</span>
          <RatingStars rating={product.rating} />
          <span className="text-muted-foreground text-sm">Review ({product.reviewCount})</span>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-4">
        <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
        <span className="text-3xl font-bold text-[#FF6B6B]">₹{product.currentPrice}</span>
        <span className="text-sm text-green-600 font-semibold">Available In Stock: {product.stockQuantity} items</span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Size Selection */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">SIZE:</label>
        <div className="flex gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-6 py-2 border-2 rounded-lg font-semibold transition-colors ${
                selectedSize === size
                  ? "border-[#FF6B6B] bg-[#FF6B6B] text-white"
                  : "border-border text-foreground hover:border-[#FF6B6B]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

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
          />
          <button onClick={() => onQuantityChange(quantity + 1)} className="px-3 py-2 text-foreground hover:bg-muted">
            +
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-2 rounded-lg"
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
