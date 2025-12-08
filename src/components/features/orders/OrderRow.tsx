import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { orderStatusMap, paymentStatusMap, type Order } from "@/types/order.types"
import { formatDate, formatCurrency } from "@/lib/utils"
import {
  getOrderStatusColor,
  getPaymentStatusColor,
  getOrderStatusIcon,
  getPaymentStatusIcon,
  canCancelOrder,
  canReorderOrder,
} from "@/lib/orderHelpers"
import { Eye, Navigation, RotateCcw, X as XIcon } from "lucide-react"

interface OrderRowProps {
  order: Order
  isSelected: boolean
  onSelect: (id: string) => void
  onViewDetails: (order: Order) => void
}

export function OrderRow({ order, isSelected, onSelect, onViewDetails }: OrderRowProps) {
  const OrderStatusIcon = getOrderStatusIcon(order.status)
  const PaymentStatusIcon = getPaymentStatusIcon(order.paymentStatus)

  // Display product names
  const productNames = order.items
    .slice(0, 2)
    .map((item) => item.productName)
    .join(", ")
  const hasMoreProducts = order.items.length > 2

  return (
    <tr className="border-b hover:bg-muted/50 transition-colors">
      <td className="p-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(order.id)}
          aria-label={`Select order ${order.orderNumber}`}
        />
      </td>
      {/* Mã đơn hàng */}
      <td className="p-4 font-semibold text-blue-600 cursor-pointer hover:underline min-w-[120px]">
        <button onClick={() => onViewDetails(order)}>{order.orderNumber}</button>
      </td>
      {/* Sản phẩm */}
      <td className="p-4 text-sm min-w-[200px]">
        <div className="line-clamp-2">
          <p className="font-medium">{productNames}</p>
          {hasMoreProducts && (
            <p className="text-xs text-muted-foreground">
              +{order.items.length - 2} sản phẩm khác
            </p>
          )}
        </div>
      </td>
      {/* Ngày tạo */}
      <td className="p-4 text-sm min-w-[110px]">{formatDate(new Date(order.createdAt))}</td>
      {/* Trạng thái giao hàng */}
      <td className="p-4 min-w-[150px]">
        <Badge className={`${getOrderStatusColor(order.status)} border`}>
          <OrderStatusIcon className="h-3 w-3 mr-1" />
          {orderStatusMap[order.status]}
        </Badge>
      </td>
      {/* Trạng thái thanh toán */}
      <td className="p-4 min-w-[140px]">
        <Badge className={`${getPaymentStatusColor(order.paymentStatus)} border`}>
          <PaymentStatusIcon className="h-3 w-3 mr-1" />
          {paymentStatusMap[order.paymentStatus]}
        </Badge>
      </td>
      {/* Tổng cộng */}
      <td className="p-4 font-semibold min-w-[100px]">
        {formatCurrency(order.totalAmount, order.currency)}
      </td>
      {/* Hành động */}
      <td className="p-4 min-w-[180px]">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(order)}
            title="Xem chi tiết"
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Theo dõi đơn hàng" className="h-8 w-8 p-0">
            <Navigation className="h-4 w-4" />
          </Button>
          {canReorderOrder(order.status) && (
            <Button
              variant="ghost"
              size="sm"
              title="Mua lại"
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          {canCancelOrder(order.status) && (
            <Button
              variant="ghost"
              size="sm"
              title="Hủy đơn"
              className="h-8 w-8 p-0 hover:text-red-600"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  )
}
