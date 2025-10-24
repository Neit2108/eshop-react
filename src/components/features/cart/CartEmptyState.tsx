import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

export function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Giỏ hàng của bạn đang trống</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Không có sản phẩm nào trong giỏ hàng. Bắt đầu mua sắm để tìm kiếm sản phẩm tuyệt vời!
      </p>
      <Link to={ROUTES.PRODUCT_LIST}>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold">Mua sắm ngay</Button>
      </Link>
    </div>
  )
}
