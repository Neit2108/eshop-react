import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/order.types";
import { orderStatusMap, paymentStatusMap } from "@/types/order.types";

interface OrderDetailDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmOrder?: (orderId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "SHIPPING":
      return "bg-blue-100 text-blue-800";
    case "PROCESSING":
      return "bg-yellow-100 text-yellow-800";
    case "PENDING":
    case "CONFIRMED":
      return "bg-slate-100 text-slate-800";
    case "CANCELLED":
    case "REFUNDED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-green-50 text-green-700";
    case "PENDING":
      return "bg-orange-50 text-orange-700";
    case "FAILED":
    case "REFUNDED":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

export function OrderDetailDialog({
  order,
  open,
  onOpenChange,
  onConfirmOrder,
}: OrderDetailDialogProps) {
  if (!order) return null;

  const isUnconfirmed = order.status === "PENDING";

  const handleConfirm = () => {
    if (onConfirmOrder) {
      onConfirmOrder(order.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ scrollbarWidth: "none" }}
        className="max-h-[90vh] max-w-2xl overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>{order.orderNumber}</DialogDescription>
            </div>
            {isUnconfirmed && (
              <Button
                onClick={handleConfirm}
                className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Confirm Order
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status Timeline */}
          <div className="grid grid-cols-4 gap-4">
            <div
              className={cn(
                "flex flex-col items-center",
                order.status === "PENDING" && "opacity-50",
              )}
            >
              <div
                className={cn(
                  "mb-2 flex h-10 w-10 items-center justify-center rounded-full",
                  ["PENDING", "PROCESSING", "SHIPPING", "DELIVERED"].includes(
                    order.status,
                  )
                    ? "bg-blue-100"
                    : "bg-slate-100",
                )}
              >
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-center text-xs font-medium">Order Placed</p>
            </div>
            <div
              className={cn(
                "flex flex-col items-center",
                !["PROCESSING", "SHIPPING", "DELIVERED"].includes(
                  order.status,
                ) && "opacity-50",
              )}
            >
              <div
                className={cn(
                  "mb-2 flex h-10 w-10 items-center justify-center rounded-full",
                  ["PROCESSING", "SHIPPING", "DELIVERED"].includes(order.status)
                    ? "bg-yellow-100"
                    : "bg-slate-100",
                )}
              >
                <CheckCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-center text-xs font-medium">Processing</p>
            </div>
            <div
              className={cn(
                "flex flex-col items-center",
                !["SHIPPING", "DELIVERED"].includes(order.status) &&
                  "opacity-50",
              )}
            >
              <div
                className={cn(
                  "mb-2 flex h-10 w-10 items-center justify-center rounded-full",
                  ["SHIPPING", "DELIVERED"].includes(order.status)
                    ? "bg-blue-100"
                    : "bg-slate-100",
                )}
              >
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-center text-xs font-medium">Shipped</p>
            </div>
            <div
              className={cn(
                "flex flex-col items-center",
                order.status !== "DELIVERED" && "opacity-50",
              )}
            >
              <div
                className={cn(
                  "mb-2 flex h-10 w-10 items-center justify-center rounded-full",
                  order.status === "DELIVERED"
                    ? "bg-green-100"
                    : "bg-slate-100",
                )}
              >
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-center text-xs font-medium">Delivered</p>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Customer Information
              </h3>
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-medium text-slate-900">
                    {order.recipientName}
                  </p>
                  <p className="text-sm text-slate-600">
                    {order.recipientPhone}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Shipping Address
              </h3>
              <div className="flex gap-2 text-sm text-slate-700">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-600" />
                <div>
                  <p>{order.recipientName}</p>
                  <p>{order.shippingAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Status and Payment */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={getStatusColor(order.status)}>
                  {orderStatusMap[order.status] || order.status}
                </Badge>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  Payment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="secondary"
                  className={getPaymentStatusColor(order.paymentStatus)}
                >
                  {paymentStatusMap[order.paymentStatus] || order.paymentStatus}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {item.productImageUrl && (
                      <img
                        src={item.productImageUrl}
                        alt={item.productName}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.productName} - {item.variantName}
                      </p>
                      <p className="text-xs text-slate-600">
                        Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-slate-900">
                    ${item.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <Card className="border-slate-200 bg-slate-50">
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="text-slate-900">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-slate-900">${order.shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Discount</span>
                  <span className="text-slate-900">-${order.discount.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-slate-900">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-200"
            >
              Close
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 bg-transparent"
            >
              Print Invoice
            </Button>
            {!isUnconfirmed && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                Ship Order
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
