import type { PaginationParams } from "@/types";
import type { OrderFilters } from "@/types/order.types";
import type { ProductFilters } from "@/types/product.types";

export function buildQueryString(
  pagination: PaginationParams,
  filters?: ProductFilters,
): string {
  const params = new URLSearchParams();

  params.append("page", String(pagination.page ?? 1));
  params.append("limit", String(pagination.limit ?? 10));

  if (filters) {
    if (filters.status) {
      params.append("status", filters.status);
    }
    if (filters.categoryId) {
      params.append("categoryId", filters.categoryId);
    }
    if (filters.searchTerm) {
      params.append("searchTerm", filters.searchTerm);
    }
    if (filters.priceRange) {
      if (filters.priceRange.min !== undefined) {
        params.append("minPrice", String(filters.priceRange.min));
      }
      if (filters.priceRange.max !== undefined) {
        params.append("maxPrice", String(filters.priceRange.max));
      }
    }
    if (filters.sortBy) {
      params.append("sortBy", filters.sortBy);
    }
  }

  return params.toString();
}

export function buildOrderQueryString(
  pagination: PaginationParams,
  filters?: OrderFilters,
): string {
  const params = new URLSearchParams();

  params.append("page", String(pagination.page ?? 1));
  params.append("limit", String(pagination.limit ?? 10));

  if (filters) {
    if (filters.status) {
      params.append("status", filters.status);
    }
    if (filters.paymentStatus) {
      params.append("paymentStatus", filters.paymentStatus);
    }
    if (filters.minTotalAmount) {
      params.append("minTotalAmount", String(filters.minTotalAmount));
    }
    if (filters.maxTotalAmount) {
      params.append("maxTotalAmount", String(filters.maxTotalAmount));
    }
    if (filters.shopId) {
      params.append("shopId", filters.shopId);
    }
  }

  return params.toString();
}
