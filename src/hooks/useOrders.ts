import {
  cancelOrder,
  createOrder,
  fetchOrderById,
  updateOrder,
  clearCurrentOrder,
  clearError,
  clearSuccessMessage,
  myOrders,
  fetchOrdersByShop,
  fetchAllOrders,
  confirmOrder,
} from "@/store/slices/orderSlice";
import type { AppDispatch, RootState } from "@/store/store";
import type { CreateOrderInput, Order, OrderStatus } from "@/types/order.types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { allOrders, shopOrders, orders, currentOrder, isLoading, error, successMessage, pagination, userPagination } =
    useSelector((state: RootState) => state.order);

  return {
    allOrders,
    shopOrders,
    orders,
    currentOrder,
    isLoading,
    error,
    successMessage,
    pagination,
    userPagination,
    getMyOrders: useCallback((page?: number, limit?: number, status?: OrderStatus, paymentStatus?: string, minTotalAmount?: number, maxTotalAmount?: number) => {
      dispatch(myOrders({
        page: page ?? 1,
        limit: limit ?? 10,
        filters: {
          status: status ?? undefined,
          paymentStatus: paymentStatus ?? undefined,
          minTotalAmount: minTotalAmount ?? undefined,
          maxTotalAmount: maxTotalAmount ?? undefined,
        },
      }));
    }, [dispatch]),
    getAllOrders: useCallback((page?: number, limit?: number, shopId?: string) => {
      dispatch(fetchAllOrders({ 
        page: page ?? 1, 
        limit: limit ?? 10,
        filters: shopId ? { shopId } : {}
      }));
    }, [dispatch]),
    getOrdersByShop: useCallback((shopId: string) => {
      dispatch(fetchOrdersByShop(shopId));
    }, [dispatch]),
    createOrder: (orderData: CreateOrderInput) =>
      dispatch(createOrder(orderData)),
    fetchOrderById: useCallback((orderId: string) => dispatch(fetchOrderById(orderId)), [dispatch]),
    updateOrder: (orderId: string, orderData: Partial<Order>) =>
      dispatch(updateOrder({ orderId, orderData })),
    cancelOrder: (orderId: string) => dispatch(cancelOrder(orderId)),
    confirmOrder: useCallback((orderId: string) => dispatch(confirmOrder(orderId)), [dispatch]),
    clearCurrentOrder: () => dispatch(clearCurrentOrder()),
    clearError: () => dispatch(clearError()),
    clearSuccessMessage: () => dispatch(clearSuccessMessage()),
  };
}
