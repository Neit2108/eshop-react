import { formatPrice } from "@/lib/utils"

interface OrderItemProps {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

export function OrderItem({ name, image, quantity, price }: OrderItemProps) {
  const subtotal = price * quantity

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-b-0">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        <img src={image || "/placeholder.svg"} alt={name} className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h4 className="font-medium text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">Số lượng: {quantity}</p>
        </div>
        <p className="font-semibold text-foreground">{formatPrice(subtotal)}</p>
      </div>
    </div>
  )
}
