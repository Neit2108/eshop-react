import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Order } from "@/types/order.types"
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils"

interface OrderCardProps {
  order: Order
  onViewDetails: (order: Order) => void
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  return (
    <Card className="p-4 mb-4">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="font-semibold text-sm text-blue-600">{order.orderNumber}</p>
            <p className="text-xs text-muted-foreground">{formatDate(new Date(order.createdAt))}</p>
          </div>
          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
        </div>

        <div className="text-sm">
          <p className="font-medium">{order.recipientName}</p>
          <p className="text-xs text-muted-foreground">{order.recipientPhone}</p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-semibold text-sm">{formatCurrency(order.totalAmount, order.currency)}</span>
          <Button size="sm" variant="outline" onClick={() => onViewDetails(order)}>
            Chi tiết
          </Button>
        </div>
      </div>
    </Card>
  )
}
