import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus } from "lucide-react"
import type { CartItem as CartItemType } from "@/types/cart.types"
import { Link } from "react-router-dom"
import { ROUTES } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { API_ENDPOINTS } from "@/lib/api"

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity)
      onQuantityChange(item.id, newQuantity)
    }
  }

  const subtotal = item.totalPrice

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-b-0 items-center">
      {/* Product Image - Fixed width */}
      <div className="flex-shrink-0 w-20 h-20">
        {item.productImage ? (
          <img 
            src={item.productImage} 
            alt={item.productName} 
            className="w-full h-full rounded-lg object-cover" 
          />
        ) : (
          <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Không có ảnh sản phẩm</span>
          </div>
        )}
      </div>

      {/* Product Details - Flexible width */}
      <div className="flex-1 min-w-0">
        <Link
          to={`${API_ENDPOINTS.PRODUCTS.GET(item.productId)}`}
          className="text-lg font-semibold text-foreground hover:text-orange-600 transition-colors truncate block"
        >
          {item.productName}
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{item.productCategory}</p>
        <p className="text-sm font-medium text-foreground mt-2">{formatPrice(item.unitPrice)}</p>
      </div>

      {/* Quantity Selector - Fixed width */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleQuantityChange(Math.max(1, Number.parseInt(e.target.value) || 1))}
          className="w-12 text-center h-8"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Subtotal - Fixed width */}
      <div className="flex flex-col items-end justify-center w-32 flex-shrink-0">
        <p className="text-lg font-semibold text-foreground truncate w-full text-right">
          {formatPrice(subtotal)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Tổng tiền</p>
      </div>

      {/* Delete Button - Fixed width */}
      <div className="flex items-center flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}