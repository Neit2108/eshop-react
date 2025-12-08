import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Order } from "@/types/order.types"
import { formatDate, formatCurrency } from "@/lib/utils"
import { orderStatusMap, paymentStatusMap } from "@/types/order.types"
import {
  getOrderStatusColor,
  getPaymentStatusColor,
  getOrderStatusIcon,
  getPaymentStatusIcon,
  canCancelOrder,
  canReorderOrder,
} from "@/lib/orderHelpers"
import { Eye, Navigation, RotateCcw, X as XIcon } from "lucide-react"

interface OrderCardProps {
  order: Order
  onViewDetails: (order: Order) => void
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const OrderStatusIcon = getOrderStatusIcon(order.status)
  const PaymentStatusIcon = getPaymentStatusIcon(order.paymentStatus)

  // Get first product image
  const firstProductImage = order.items[0]?.productImageUrl

  return (
    <Card className="p-4 mb-4 overflow-hidden">
      <div className="space-y-4">
        {/* Header: Order ID + Status */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <p className="font-semibold text-sm text-blue-600 truncate">{order.orderNumber}</p>
            <p className="text-xs text-muted-foreground">{formatDate(new Date(order.createdAt))}</p>
          </div>
          <Badge className={`${getOrderStatusColor(order.status)} border flex-shrink-0`}>
            <OrderStatusIcon className="h-3 w-3 mr-1" />
            {orderStatusMap[order.status]}
          </Badge>
        </div>

        {/* Product Info with Image */}
        <div className="flex gap-3 pb-3 border-b">
          {firstProductImage && (
            <div className="flex-shrink-0">
              <img
                src={firstProductImage}
                alt={order.items[0]?.productName}
                className="h-16 w-16 object-cover rounded border bg-muted"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm line-clamp-1">{order.items[0]?.productName}</p>
            {order.items.length > 1 && (
              <p className="text-xs text-muted-foreground">
                +{order.items.length - 1} sản phẩm khác
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              SL: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
          </div>
        </div>

        {/* Recipient Info */}
        <div className="text-sm pb-3 border-b">
          <p className="font-medium text-gray-700">{order.recipientName}</p>
          <p className="text-xs text-muted-foreground">{order.recipientPhone}</p>
        </div>

        {/* Status Badges */}
        <div className="flex gap-2 flex-wrap">
          <Badge className={`${getPaymentStatusColor(order.paymentStatus)} border text-xs`}>
            <PaymentStatusIcon className="h-3 w-3 mr-1" />
            {paymentStatusMap[order.paymentStatus]}
          </Badge>
        </div>

        {/* Total & Actions */}
        <div className="space-y-3">
          <div className="flex justify-between items-center pt-2 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Tổng cộng</p>
              <p className="font-semibold">{formatCurrency(order.totalAmount, order.currency)}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(order)}
              className="h-8"
              title="Xem chi tiết"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              title="Theo dõi"
            >
              <Navigation className="h-4 w-4" />
            </Button>
            {canReorderOrder(order.status) && (
              <Button
                size="sm"
                variant="outline"
                className="h-8"
                title="Mua lại"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
            {canCancelOrder(order.status) && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 hover:text-red-600 hover:border-red-300"
                title="Hủy đơn"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
