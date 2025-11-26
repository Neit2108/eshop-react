import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  orderStatusMap,
  paymentStatusMap,
  shippingMethodMap,
  type Order,
} from "@/types/order.types";
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils";
import { PaymentMethodModal } from "./PaymentMethodModal";
import { apiService } from "@/services/apiService";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  if (!order) return null;

  const timeline = [
    { label: "Tạo mới", date: order.createdAt, completed: true },
    {
      label: "Đã xác nhận",
      date: order.confirmedAt,
      completed: !!order.confirmedAt,
    },
    {
      label: "Đã gửi đơn vị vận chuyển",
      date: order.shippedAt,
      completed: !!order.shippedAt,
    },
    {
      label: "Đã giao",
      date: order.deliveredAt,
      completed: !!order.deliveredAt,
    },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // mở modal chọn phương thức thanh toán hoặc chuyển hướng đến trang thanh toán
      console.log("Redirecting to payment gateway...");
      setIsPaymentMethodOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSelect = async (
    method: "COD" | "BANK_TRANSFER" | "CREDIT_CARD" | "E_WALLET",
  ) => {
    try {
      if (method === "COD") {
        setSelectedPayment(method);
        setMessage({
          type: "success",
          text: "Thank you, please make full payment when your order arrives",
        });
      } else if (method === "BANK_TRANSFER" || method === "CREDIT_CARD") {
        const createUrlResult = await apiService.post<string>(
          `/payments/vnpay/create`,
          {
            orderId: order.id,
            amount: order.totalAmount,
            orderInfo: `Pay`,
            locale: "vn",
          },
        );

        setSelectedPayment(method);
        setMessage({
          type: "success",
          text: "Redirecting to payment gateway...",
        });

        setTimeout(() => {
          window.location.href = createUrlResult.data;
        }, 1000);
      } else {
        // E_WALLET not implemented yet
        setMessage({
          type: "error",
          text: "E-Wallet payment is not available yet",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Payment processing failed",
      });
    }
  };

  const getMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      COD: "Cash on Delivery",
      BANK_TRANSFER: "Bank Transfer",
      CREDIT_CARD: "Credit Card",
      E_WALLET: "E-Wallet",
    };
    return labels[method] || "None";
  };

  const isPaymentPending = order.paymentStatus !== "PAID";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          style={{ scrollbarWidth: "none" }}
          className="max-h-[90vh] max-w-2xl overflow-y-auto"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Đơn hàng {order.orderNumber}</span>
              <Badge className={getStatusColor(order.status)}>
                {orderStatusMap[order.status]}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Order Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-xs">Mã đơn hàng</p>
                <p className="font-semibold">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">
                  Trạng thái thanh toán
                </p>
                <p className="font-semibold">
                  {paymentStatusMap[order.paymentStatus]}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Ngày tạo</p>
                <p className="font-semibold">
                  {formatDate(new Date(order.createdAt))}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">
                  Phương thức vận chuyển
                </p>
                <p className="font-semibold">
                  {shippingMethodMap[order.shippingMethod]}
                </p>
              </div>
            </div>

            {/* Notes */}
            {(order.customerNote || order.shopNote) && (
              <Card className="p-4">
                {order.customerNote && (
                  <div className="mb-3">
                    <p className="text-sm font-semibold">Ghi chú khách hàng</p>
                    <p className="text-muted-foreground text-sm">
                      {order.customerNote}
                    </p>
                  </div>
                )}
                {order.shopNote && (
                  <div>
                    <p className="text-sm font-semibold">Ghi chú shop</p>
                    <p className="text-muted-foreground text-sm">
                      {order.shopNote}
                    </p>
                  </div>
                )}
              </Card>
            )}

            {/* Recipient Information */}
            <Card className="p-4">
              <h3 className="mb-3 font-semibold">Thông tin người nhận</h3>
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
              <h3 className="mb-3 font-semibold">Sản phẩm</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b py-2 text-sm last:border-0"
                  >
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-muted-foreground text-xs">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatCurrency(item.totalPrice, order.currency)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Timeline */}
            <Card className="p-4">
              <h3 className="mb-4 font-semibold">Trạng thái giao hàng</h3>
              <div className="space-y-3">
                {timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 rounded-full ${event.completed ? "bg-green-600" : "bg-muted"}`}
                      />
                      {index < timeline.length - 1 && (
                        <div
                          className={`h-8 w-0.5 ${event.completed ? "bg-green-600" : "bg-muted"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-medium">{event.label}</p>
                      {event.date && (
                        <p className="text-muted-foreground text-xs">
                          {formatDate(new Date(event.date))}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Pricing */}
            <Card className="bg-muted/50 p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(order.subtotal, order.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>
                    {formatCurrency(order.shippingFee, order.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span>-{formatCurrency(order.discount, order.currency)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <span>Tổng cộng</span>
                  <span>
                    {formatCurrency(order.totalAmount, order.currency)}
                  </span>
                </div>
                {isPaymentPending && (
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="mt-4 w-full"
                  >
                    {isProcessing ? "Đang xử lý..." : "Thanh toán ngay"}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentMethodModal
        open={isPaymentMethodOpen}
        onOpenChange={setIsPaymentMethodOpen}
        onSelect={handlePaymentSelect}
      />
    </>
  );
}
