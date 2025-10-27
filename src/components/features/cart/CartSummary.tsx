
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { ROUTES } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"

interface CartSummaryProps {
  totalItems: number
  subtotal: number
  shippingFee: number
  total: number
}

export function CartSummary({ totalItems, subtotal, shippingFee, total }: CartSummaryProps) {
  return (
    <Card className="p-6 h-fit sticky top-4">
      <h2 className="text-xl font-bold text-foreground mb-4">Tóm tắt đơn hàng</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Sản phẩm ({totalItems})</span>
          <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Phí vận chuyển</span>
          <span className="font-medium text-foreground">{shippingFee > 0 ? formatPrice(shippingFee) : "Miễn phí"}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between mb-6">
        <span className="font-semibold text-foreground">Tổng tiền</span>
        <span className="text-2xl font-bold text-orange-600">{formatPrice(total)}</span>
      </div>

      <div className="space-y-3">
        <Link to={ROUTES.CHECKOUT}>
          <Button className="w-full bg-orange-600 hover:bg-orange-700 cursor-pointer text-white font-semibold py-2 h-auto">
            Tiếp tục thanh toán
          </Button>
        </Link>
        <Link to={ROUTES.PRODUCT_LIST}>
          <Button variant="outline" className="w-full bg-transparent cursor-pointer">
            Tiếp tục mua sắm
          </Button>
        </Link>
      </div>

      {/* Trust badges */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center mb-3">
          ✓ Thanh toán an toàn • Trả hàng miễn phí • Hỗ trợ 24/7
        </p>
      </div>
    </Card>
  )
}
