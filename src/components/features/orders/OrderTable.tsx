import { OrderRow } from "./OrderRow"
import { Card } from "@/components/ui/card"
import type { Order } from "@/types/order.types"

interface OrderTableProps {
  orders: Order[]
  selectedIds: string[]
  onSelectOrder: (id: string) => void
  onViewDetails: (order: Order) => void
  isLoading?: boolean
}

export function OrderTable({ orders, selectedIds, onSelectOrder, onViewDetails, isLoading }: OrderTableProps) {
  if (isLoading) {
    return (
      <Card className="p-4 md:p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </Card>
    )
  }

  if (orders.length === 0) {
    return (
      <Card className="p-8 md:p-12 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium mb-2">Không tìm thấy đơn hàng</p>
          <p className="text-sm">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="p-4 text-left w-12">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      orders.forEach((order) => {
                        if (!selectedIds.includes(order.id)) {
                          onSelectOrder(order.id)
                        }
                      })
                    } else {
                      selectedIds.forEach((id) => onSelectOrder(id))
                    }
                  }}
                  aria-label="Select all orders"
                />
              </th>
              <th className="p-4 text-left font-semibold">Mã đơn hàng</th>
              <th className="p-4 text-left font-semibold">Sản phẩm</th>
              <th className="p-4 text-left font-semibold">Ngày tạo</th>
              <th className="p-4 text-left font-semibold">Trạng thái giao hàng</th>
              <th className="p-4 text-left font-semibold">Trạng thái thanh toán</th>
              <th className="p-4 text-left font-semibold">Tổng cộng</th>
              <th className="p-4 text-left font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                isSelected={selectedIds.includes(order.id)}
                onSelect={onSelectOrder}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
