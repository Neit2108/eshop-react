import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { orderStatusMap, paymentStatusMap, type Order } from "@/types/order.types"
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils"

interface OrderRowProps {
  order: Order
  isSelected: boolean
  onSelect: (id: string) => void
  onViewDetails: (order: Order) => void
}

export function OrderRow({ order, isSelected, onSelect, onViewDetails }: OrderRowProps) {
  return (
    <tr className="border-b hover:bg-muted/50 transition-colors">
      <td className="p-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(order.id)}
          aria-label={`Select order ${order.orderNumber}`}
        />
      </td>
      <td className="p-4 font-semibold text-blue-600 cursor-pointer hover:underline">
        <button onClick={() => onViewDetails(order)}>{order.orderNumber}</button>
      </td>
      <td className="p-4">
        <div>
          <div className="font-medium">{order.recipientName}</div>
          <div className="text-sm text-muted-foreground">{order.recipientPhone}</div>
        </div>
      </td>
      <td className="p-4 text-sm">{formatDate(new Date(order.createdAt))}</td>
      <td className="p-4 text-sm">{paymentStatusMap[order.paymentStatus]}</td>
      <td className="p-4">
        <Badge className={getStatusColor(order.status)}>{orderStatusMap[order.status]}</Badge>
      </td>
      <td className="p-4 font-semibold">{formatCurrency(order.totalAmount, order.currency)}</td>
      <td className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Hành động
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(order)}>Xem</DropdownMenuItem>
            <DropdownMenuItem>Theo dõi</DropdownMenuItem>
            <DropdownMenuItem>Đặt lại</DropdownMenuItem>
            {order.status !== "CANCELLED" && <DropdownMenuItem className="text-red-600">Hủy</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}
