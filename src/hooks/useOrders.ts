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
} from "@/store/slices/orderSlice";
import type { AppDispatch, RootState } from "@/store/store";
import type { CreateOrderInput, Order } from "@/types/order.types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { allOrders, shopOrders, orders, currentOrder, isLoading, error, successMessage, pagination } =
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
    getMyOrders: useCallback(() => {
      dispatch(myOrders());
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
    fetchOrderById: (orderId: string) => dispatch(fetchOrderById(orderId)),
    updateOrder: (orderId: string, orderData: Partial<Order>) =>
      dispatch(updateOrder({ orderId, orderData })),
    cancelOrder: (orderId: string) => dispatch(cancelOrder(orderId)),
    clearCurrentOrder: () => dispatch(clearCurrentOrder()),
    clearError: () => dispatch(clearError()),
    clearSuccessMessage: () => dispatch(clearSuccessMessage()),
  };
}
