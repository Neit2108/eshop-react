import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/apiService';
import { API_ENDPOINTS } from '@/lib/api';
import { useAuth } from './useAuth';
import { getSocket } from '@/lib/socketClient';

// Types for Analytics
export interface RevenueTrendData {
  date: string;
  totalRevenue: number;
  orderCount: number;
  averageOrderValue: number;
  paymentMethods?: Array<{
    method: string;
    count: number;
    amount: number;
  }>;
}

export interface RevenueTrendResponse {
  success: boolean;
  data: {
    period: string;
    data: RevenueTrendData[];
    summary: {
      totalRevenue: number;
      paidRevenue: number;
      pendingRevenue: number;
      refundedAmount: number;
      averageOrderValue: number;
      revenueChange: number;
      currency: string;
    };
  };
}

export interface OrderTrendData {
  date: string;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  refundedOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface OrdersTrendResponse {
  success: boolean;
  data: {
    period: string;
    data: OrderTrendData[];
    summary: {
      totalOrders: number;
      completedOrders: number;
      cancelledOrders: number;
      pendingOrders: number;
      shippingOrders: number;
      refundedOrders: number;
      completionRate: number;
      cancellationRate: number;
      averageOrderValue: number;
      orderChange: number;
    };
  };
}

export interface RealTimeStats {
  activeOrders: number;
  totalOnlineShops: number;
  totalOnlineCustomers: number;
  ordersInLastHour: number;
  revenueInLastHour: number;
  lastUpdated: string;
}

export interface AnalyticsChartData {
  date: string;
  totalRevenue: number;
  orderCount: number;
}

export interface ComprehensiveAnalytics {
  success: boolean;
  data: {
    revenueStats: {
      totalRevenue: number;
      paidRevenue: number;
      pendingRevenue: number;
      refundedAmount: number;
      averageOrderValue: number;
      revenueChange: number;
      currency: string;
    };
    orderStats: {
      totalOrders: number;
      completedOrders: number;
      cancelledOrders: number;
      pendingOrders: number;
      shippingOrders: number;
      refundedOrders: number;
      completionRate: number;
      cancellationRate: number;
      averageOrderValue: number;
      orderChange: number;
    };
    paymentStats?: {
      totalPayments: number;
      successfulPayments: number;
      failedPayments: number;
      pendingPayments: number;
      successRate: number;
      totalPaidAmount: number;
      paymentMethods: Array<{
        method: string;
        count: number;
        totalAmount: number;
        percentage: number;
        successRate: number;
      }>;
    };
    productAnalytics?: {
      topSellingProducts: Array<{
        productId: string;
        productName: string;
        shopId: string;
        soldCount: number;
        totalRevenue: number;
        averageRating: number;
      }>;
      totalProductsSold: number;
      totalProductRevenue: number;
    };
    realTimeStats: RealTimeStats;
    ordersByStatus?: Array<{
      status: string;
      count: number;
      percentage: number;
    }>;
    ordersByPaymentStatus?: Array<{
      status: string;
      count: number;
      percentage: number;
    }>;
    period: string;
    dateRange?: {
      from: string;
      to: string;
    };
    generatedAt: string;
  };
}

type TimePeriod = 'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'LAST_WEEK' | 'THIS_MONTH' | 'LAST_MONTH' | 'THIS_QUARTER' | 'LAST_QUARTER' | 'THIS_YEAR' | 'LAST_YEAR' | 'CUSTOM';

interface UseAnalyticsOptions {
  period?: TimePeriod;
  shopId?: string;
  from?: string;
  to?: string;
  enableRealTime?: boolean;
  enableComprehensive?: boolean;
  enableOrdersTrend?: boolean;
}

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const {
    period = 'THIS_MONTH',
    shopId,
    from,
    to,
    enableRealTime = true,
    enableComprehensive = false,
    enableOrdersTrend = false,
  } = options;

  const { user } = useAuth();
  const [trendData, setTrendData] = useState<RevenueTrendData[]>([]);
  const [chartData, setChartData] = useState<AnalyticsChartData[]>([]);
  const [ordersTrendData, setOrdersTrendData] = useState<OrderTrendData[]>([]);
  const [realTimeStats, setRealTimeStats] = useState<RealTimeStats | null>(null);
  const [comprehensiveData, setComprehensiveData] = useState<ComprehensiveAnalytics['data'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch revenue trend data
  const fetchRevenueTrend = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('period', period);
      if (shopId) params.append('shopId', shopId);
      if (from) params.append('from', from);
      if (to) params.append('to', to);

      const response = await apiService.get<RevenueTrendResponse>(
        `${API_ENDPOINTS.ANALYTICS.REVENUE_TREND}?${params.toString()}`
      );

      if (response.success && response.data?.data?.data) {
        setTrendData(response.data.data.data);
        
        // Transform data for chart
        const transformed = response.data.data.data.map((item: RevenueTrendData) => ({
          date: new Date(item.date).toLocaleDateString('vi-VN', {
            month: '2-digit',
            day: '2-digit',
          }),
          totalRevenue: Math.round(item.totalRevenue / 1000000), // Convert to millions
          orderCount: item.orderCount,
        }));
        setChartData(transformed);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch revenue trend';
      setError(message);
      console.error('❌ Error fetching revenue trend:', err);
    } finally {
      setLoading(false);
    }
  }, [user, period, shopId, from, to]);

  // Fetch orders trend data
  const fetchOrdersTrend = useCallback(async () => {
    if (!user || !enableOrdersTrend) return;

    try {
      const params = new URLSearchParams();
      params.append('period', period);
      if (shopId) params.append('shopId', shopId);
      if (from) params.append('from', from);
      if (to) params.append('to', to);

      const response = await apiService.get<OrdersTrendResponse>(
        `${API_ENDPOINTS.ANALYTICS.ORDERS_TREND}?${params.toString()}`
      );

      if (response.success && response.data?.data?.data) {
        setOrdersTrendData(response.data.data.data);
      }
    } catch (err) {
      console.error('❌ Error fetching orders trend:', err);
    }
  }, [user, period, shopId, from, to, enableOrdersTrend]);

  // Fetch comprehensive analytics
  const fetchComprehensive = useCallback(async () => {
    console.log('📊 fetchComprehensive called - user:', user, 'enableComprehensive:', enableComprehensive);
    if (!user || !enableComprehensive) {
      console.warn('⚠️ Skipping fetchComprehensive - user:', !!user, 'enableComprehensive:', enableComprehensive);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('period', period);
      if (shopId) params.append('shopId', shopId);
      if (from) params.append('from', from);
      if (to) params.append('to', to);

      console.log('📊 Fetching comprehensive analytics:', params.toString());

      const response = await apiService.get<ComprehensiveAnalytics>(
        `${API_ENDPOINTS.ANALYTICS.COMPREHENSIVE}?${params.toString()}`
      );

      console.log('📊 Comprehensive response:', response);

      if (response.success && response.data?.data) {
        setComprehensiveData(response.data.data);
        // Also set real-time stats from comprehensive data
        if (response.data.data.realTimeStats) {
          setRealTimeStats(response.data.data.realTimeStats);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch comprehensive analytics';
      setError(message);
      console.error('❌ Error fetching comprehensive analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [user, period, shopId, from, to, enableComprehensive]);

  // Listen to real-time updates via WebSocket
  const setupRealtimeListener = useCallback(() => {
    if (!enableRealTime || !user) return;

    // Delay socket check để đảm bảo socket đã kết nối
    const checkSocket = () => {
      const socket = getSocket();
      if (socket?.connected) {
        const handleRealtimeUpdate = (data: RealTimeStats) => {
          console.log('📊 Real-time update received:', data);
          setRealTimeStats(data);
        };

        socket.on('analytics:realtime-update', handleRealtimeUpdate);
        console.log('✅ Real-time listener setup successfully');

        return () => {
          socket.off('analytics:realtime-update', handleRealtimeUpdate);
        };
      } else {
        console.warn('⚠️ Socket not connected yet, retrying in 1s...');
        // Retry sau 1 giây
        setTimeout(checkSocket, 1000);
      }
    };

    return checkSocket();
  }, [enableRealTime, user]);

  // Initial load and real-time setup
  useEffect(() => {
    if (enableComprehensive) {
      fetchComprehensive();
    } else {
      fetchRevenueTrend();
    }

    if (enableOrdersTrend) {
      fetchOrdersTrend();
    }

    const cleanup = setupRealtimeListener();

    // Refresh data every 5 minutes
    const refreshInterval = setInterval(() => {
      if (enableComprehensive) {
        fetchComprehensive();
      } else {
        fetchRevenueTrend();
      }
      if (enableOrdersTrend) {
        fetchOrdersTrend();
      }
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
      cleanup?.();
    };
  }, [fetchRevenueTrend, fetchComprehensive, fetchOrdersTrend, setupRealtimeListener, enableComprehensive, enableOrdersTrend]);

  // Manual refresh function
  const refresh = useCallback(() => {
    if (enableComprehensive) {
      fetchComprehensive();
    } else {
      fetchRevenueTrend();
    }
    if (enableOrdersTrend) {
      fetchOrdersTrend();
    }
  }, [fetchRevenueTrend, fetchComprehensive, fetchOrdersTrend, enableComprehensive, enableOrdersTrend]);

  return {
    trendData,
    chartData,
    ordersTrendData,
    realTimeStats,
    comprehensiveData,
    loading,
    error,
    refresh,
  };
};

