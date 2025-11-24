import {
  cancelOrder,
  createOrder,
  fetchOrderById,
  updateOrder,
  clearCurrentOrder,
  clearError,
  clearSuccessMessage,
  myOrders,
} from "@/store/slices/orderSlice";
import type { AppDispatch, RootState } from "@/store/store";
import type { CreateOrderInput, Order } from "@/types/order.types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, currentOrder, isLoading, error, successMessage, pagination } =
    useSelector((state: RootState) => state.order);

  return {
    orders,
    currentOrder,
    isLoading,
    error,
    successMessage,
    pagination,
    getMyOrders: useCallback(() => {
      dispatch(myOrders());
    }, [dispatch]),
    createOrder: (orderData: CreateOrderInput) =>
      dispatch(createOrder(orderData)),
    fetchOrderById: (orderId: string) => dispatch(fetchOrderById(orderId)),
    updateOrder: (orderId: string, orderData: Partial<Order>) =>
      dispatch(updateOrder({ orderId, orderData })),
    cancelOrder: (orderId: string) => dispatch(cancelOrder(orderId)),
    clearCurrentOrder: () => dispatch(clearCurrentOrder()),
    clearError: () => dispatch(clearError()),
    clearSuccessMessage: () => dispatch(clearSuccessMessage()),
  };
}
