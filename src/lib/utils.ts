import type { OrderStatus } from "@/types/order.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function formatCurrency(
  amount: number,
  currency: string = "VND",
): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
  }).format(amount)
  .replace("₫", "")
  .trim();
}

export function formatNumber(value: number): string {
  if (Number.isInteger(value)) {
    return value.toLocaleString("vi-VN"); // hoặc "en-US" tùy format
  }

  // Nếu là số thập phân thì làm tròn 2 chữ số
  return value.toLocaleString("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "bg-yellow-200 text-yellow-900"
    case "CONFIRMED":
    case "PROCESSING":
      return "bg-blue-200 text-blue-900"
    case "SHIPPING":
      return "bg-indigo-200 text-indigo-900"
    case "DELIVERED":
    case "COMPLETED":
      return "bg-green-200 text-green-900"
    case "CANCELLED":
    case "REFUNDED":
      return "bg-red-200 text-red-900"
    default:
      return "bg-gray-200 text-gray-900"
  }
}

export function productStatusMap(status: string): string {
  switch (status) {
    case "DRAFT":
      return "Nháp"
    case "PUBLISHED":
      return "Đang bán"
    case "ARCHIVED":
      return "Đã khóa"
    case "OUT_OF_STOCK":
      return "Hết hàng trong kho"
    case "DISCONTINUED":
      return "Ngừng bán"
    default:
      return status
  }
}