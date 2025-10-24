import { CartItem } from "./CartItem"
import type { CartItem as CartItemType } from "@/types/cart.types"

interface CartItemsListProps {
  items: CartItemType[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItemsList({ items, onQuantityChange, onRemove }: CartItemsListProps) {
  return (
    <div className="space-y-0">
      {items.map((item) => (
        <CartItem key={item.id} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
      ))}
    </div>
  )
}
