import { formatPrice } from "@/lib/utils"
import type { CartItem } from "@/types/cart.types"

interface OrderItemProps {
  item: CartItem
}

export function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-b-0">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        <img src={item.productImage || "/placeholder.svg"} alt={item.variantName} className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h4 className="font-medium text-foreground">{item.variantName}</h4>
          <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
        </div>
        <p className="font-semibold text-foreground">{formatPrice(item.totalPrice)}</p>
      </div>
    </div>
  )
}
