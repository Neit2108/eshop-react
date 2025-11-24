"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Order } from "@/types/order.types"
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils"

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  if (!order) return null

  const timeline = [
    { label: "Created", date: order.createdAt, completed: true },
    {
      label: "Confirmed",
      date: order.confirmedAt,
      completed: !!order.confirmedAt,
    },
    { label: "Shipped", date: order.shippedAt, completed: !!order.shippedAt },
    {
      label: "Delivered",
      date: order.deliveredAt,
      completed: !!order.deliveredAt,
    },
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // TODO: Integrate with payment provider (Stripe, etc.)
      console.log("[v0] Processing payment for order:", order.orderNumber)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert(`Payment initiated for order ${order.orderNumber}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const isPaymentPending = order.paymentStatus !== "PAID"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Đơn hàng {order.orderNumber}</span>
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Mã đơn hàng</p>
              <p className="font-semibold">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Trạng thái thanh toán</p>
              <p className="font-semibold">{order.paymentStatus}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ngày tạo</p>
              <p className="font-semibold">{formatDate(new Date(order.createdAt))}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phương thức vận chuyển</p>
              <p className="font-semibold">{order.shippingMethod}</p>
            </div>
          </div>

          {/* Notes */}
          {(order.customerNote || order.shopNote) && (
            <Card className="p-4">
              {order.customerNote && (
                <div className="mb-3">
                  <p className="font-semibold text-sm">Ghi chú khách hàng</p>
                  <p className="text-sm text-muted-foreground">{order.customerNote}</p>
                </div>
              )}
              {order.shopNote && (
                <div>
                  <p className="font-semibold text-sm">Ghi chú shop</p>
                  <p className="text-sm text-muted-foreground">{order.shopNote}</p>
                </div>
              )}
            </Card>
          )}

          {/* Recipient Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Thông tin người nhận</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Tên</p>
                <p className="font-medium">{order.recipientName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Số điện thoại</p>
                <p className="font-medium">{order.recipientPhone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Địa chỉ</p>
                <p className="font-medium">{order.shippingAddress}</p>
              </div>
            </div>
          </Card>

          {/* Items */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Sản phẩm</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">Số lượng: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{formatCurrency(item.totalPrice, order.currency)}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Order Timeline */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Trạng thái giao hàng</h3>
            <div className="space-y-3">
              {timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${event.completed ? "bg-green-600" : "bg-muted"}`} />
                    {index < timeline.length - 1 && (
                      <div className={`w-0.5 h-8 ${event.completed ? "bg-green-600" : "bg-muted"}`} />
                    )}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="font-medium text-sm">{event.label}</p>
                    {event.date && <p className="text-xs text-muted-foreground">{formatDate(new Date(event.date))}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Order Pricing */}
          <Card className="p-4 bg-muted/50">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatCurrency(order.subtotal, order.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatCurrency(order.shippingFee, order.currency)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Giảm giá</span>
                <span>-{formatCurrency(order.discount, order.currency)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t">
                <span>Tổng cộng</span>
                <span>{formatCurrency(order.totalAmount, order.currency)}</span>
              </div>
              {isPaymentPending && (
                <Button onClick={handlePayment} disabled={isProcessing} className="w-full mt-4">
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
