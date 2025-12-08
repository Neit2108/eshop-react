// Helper functions for order management

import type { Order } from "@/types/order.types";
import {
  Clock,
  CheckCircle,
  Loader,
  Truck,
  Package,
  AlertCircle,
  XCircle,
  RefreshCw,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

// Status color mapping
export const getOrderStatusColor = (status: Order["status"]) => {
  const colorMap: Record<Order["status"], string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
    CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
    PROCESSING: "bg-purple-100 text-purple-800 border-purple-300",
    SHIPPING: "bg-cyan-100 text-cyan-800 border-cyan-300",
    DELIVERED: "bg-teal-100 text-teal-800 border-teal-300",
    COMPLETED: "bg-green-100 text-green-800 border-green-300",
    CANCELLED: "bg-gray-100 text-gray-800 border-gray-300",
    REFUNDED: "bg-orange-100 text-orange-800 border-orange-300",
  };
  return colorMap[status];
};

export const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
  const colorMap: Record<Order["paymentStatus"], string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
    PAID: "bg-green-100 text-green-800 border-green-300",
    FAILED: "bg-red-100 text-red-800 border-red-300",
    REFUNDED: "bg-orange-100 text-orange-800 border-orange-300",
  };
  return colorMap[status];
};

// Status icon mapping
export const getOrderStatusIcon = (status: Order["status"]) => {
  const iconMap: Record<Order["status"], typeof Clock> = {
    PENDING: Clock,
    CONFIRMED: CheckCircle,
    PROCESSING: Loader,
    SHIPPING: Truck,
    DELIVERED: Package,
    COMPLETED: CheckCircle,
    CANCELLED: XCircle,
    REFUNDED: RefreshCw,
  };
  return iconMap[status];
};

export const getPaymentStatusIcon = (status: Order["paymentStatus"]) => {
  const iconMap: Record<Order["paymentStatus"], typeof CreditCard> = {
    PENDING: AlertCircle,
    PAID: CreditCard,
    FAILED: AlertTriangle,
    REFUNDED: RefreshCw,
  };
  return iconMap[status];
};

// Helper to determine if order can be cancelled
export const canCancelOrder = (status: Order["status"]) => {
  const cancellableStatuses: Order["status"][] = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
  ];
  return cancellableStatuses.includes(status);
};

// Helper to determine if order can be reordered
export const canReorderOrder = (status: Order["status"]) => {
  const reorderableStatuses: Order["status"][] = [
    "COMPLETED",
    "DELIVERED",
    "CANCELLED",
  ];
  return reorderableStatuses.includes(status);
};
