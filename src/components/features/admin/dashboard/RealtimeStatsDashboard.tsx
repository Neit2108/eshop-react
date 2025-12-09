import { useAnalytics } from "@/hooks/useAnalytics"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * 📊 Real-time Stats Dashboard
 * Hiển thị thông tin real-time mỗi 30 giây từ backend
 * 
 * Cách sử dụng:
 * <RealtimeStatsDashboard />
 */

interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorStyles = {
  blue: 'bg-blue-50 border-blue-200 text-blue-600',
  green: 'bg-green-50 border-green-200 text-green-600',
  purple: 'bg-purple-50 border-purple-200 text-purple-600',
  orange: 'bg-orange-50 border-orange-200 text-orange-600',
  red: 'bg-red-50 border-red-200 text-red-600',
} as const;

const colorValueStyles = {
  blue: 'text-blue-700',
  green: 'text-green-700',
  purple: 'text-purple-700',
  orange: 'text-orange-700',
  red: 'text-red-700',
} as const;

interface RealtimeStatCardProps {
  stat: StatCard;
}

function RealtimeStatCard({ stat }: RealtimeStatCardProps) {
  return (
    <Card className={`border ${colorStyles[stat.color]}`}>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">{stat.title}</p>
          <div className="flex items-baseline justify-between">
            <p className={`text-2xl font-bold ${colorValueStyles[stat.color]}`}>
              {stat.value}
            </p>
            {stat.change && (
              <span className="text-xs font-medium text-gray-500">
                {stat.change}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface RealtimeStatsDashboardProps {
  className?: string;
}

export function RealtimeStatsDashboard({ className }: RealtimeStatsDashboardProps) {
  const { realTimeStats, loading } = useAnalytics({
    enableRealTime: true,
  });

  if (loading || !realTimeStats) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${className}`}>
        {Array(5).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats: StatCard[] = [
    {
      title: "Đơn Hàng Đang Xử Lý",
      value: realTimeStats.activeOrders,
      color: 'blue',
    },
    {
      title: "Shop Online",
      value: realTimeStats.totalOnlineShops,
      color: 'green',
    },
    {
      title: "Khách Online",
      value: realTimeStats.totalOnlineCustomers,
      color: 'purple',
    },
    {
      title: "Đơn Hàng/Giờ",
      value: realTimeStats.ordersInLastHour,
      color: 'orange',
    },
    {
      title: "Doanh Thu/Giờ",
      value: `${(realTimeStats.revenueInLastHour / 1000000).toFixed(1)}M`,
      color: 'green',
    },
  ];

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${className}`}>
        {stats.map((stat, index) => (
          <RealtimeStatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Last Update Info */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        🔄 Cập nhật lúc: {new Date(realTimeStats.lastUpdated).toLocaleTimeString('vi-VN')}
        <span className="ml-2 inline-block">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
          {' '}Live
        </span>
      </div>
    </>
  )
}

