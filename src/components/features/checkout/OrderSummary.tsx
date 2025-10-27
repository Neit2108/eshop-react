import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderItem } from "./OrderItem"
import { formatPrice } from "@/lib/utils"
import type { CartItem } from "@/types/cart.types"

interface OrderSummaryProps {
  items: CartItem[]
  totalAmount: number
  shippingFee?: number
  onPlaceOrder: () => void
}

export function OrderSummary({ items, totalAmount, shippingFee = 0, onPlaceOrder }: OrderSummaryProps) {
  return (
    <Card className="h-fit sticky top-4 p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Tóm tắt đơn hàng</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Giá tiền</span>
          <span className="font-medium text-foreground">{formatPrice(totalAmount)}</span>
        </div>
        {shippingFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Phí vận chuyển</span>
            <span className="font-medium text-foreground">{formatPrice(shippingFee)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
          <span className="text-foreground">Tổng</span>
          <span className="text-primary">{formatPrice(totalAmount + shippingFee)}</span>
        </div>
      </div>

      <Button onClick={onPlaceOrder} className="w-full h-11 text-base font-semibold">
        Đặt hàng ngay
      </Button>
    </Card>
  )
}
