import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown} from "lucide-react"
import { useAnalytics } from "@/hooks/useAnalytics"
import { useMemo } from "react"
import Loading from "@/components/common/Loading"
import { formatNumber } from "@/lib/utils"

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  description: string;
  trend: string;
}

export function StatsCards() {
  const { comprehensiveData, loading, error } = useAnalytics({
    enableComprehensive: true,
  });

  console.log('📊 StatsCards - Loading:', loading, 'Data:', comprehensiveData, 'Error:', error);

  const statCards = useMemo<StatCard[]>(() => {
    if (!comprehensiveData) {
      return [];
    }

    const { revenueStats, orderStats } = comprehensiveData;

    return [
      {
        title: "Doanh Thu",
        value: `${formatNumber(revenueStats.totalRevenue / 1000000)}M`,
        change: revenueStats.revenueChange,
        description: `Đã thanh toán: ${formatNumber(revenueStats.paidRevenue / 1000000)}M`,
        trend: `Chờ: ${formatNumber(revenueStats.pendingRevenue / 1000000)}M`,
      },
      {
        title: "Tổng Đơn Hàng",
        value: formatNumber(orderStats.totalOrders),
        change: orderStats.orderChange,
        description: `Hoàn thành: ${formatNumber(orderStats.completedOrders)}`,
        trend: `Tỉ lệ: ${formatNumber(orderStats.completionRate)}%`,
      },
      {
        title: "Đơn Hàng Đang Xử Lý",
        value: formatNumber(orderStats.pendingOrders + orderStats.shippingOrders),
        change: 0,
        description: `Chờ xử lý: ${formatNumber(orderStats.pendingOrders)}`,
        trend: `Đang giao: ${formatNumber(orderStats.shippingOrders)}`,
      },
      {
        title: "Giá Trị Trung Bình",
        value: `${formatNumber(orderStats.averageOrderValue / 1000000)}M`,
        change: 0,
        description: `Hoàn tiền: ${formatNumber(revenueStats.refundedAmount / 1000000)}M`,
        trend: `Hủy: ${formatNumber(orderStats.cancelledOrders)}`,
      },
    ];
  }, [comprehensiveData]);

  if (loading && !comprehensiveData) {
    return <Loading />;
  }

  if (!comprehensiveData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statCards.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Badge variant={stat.change >= 0 ? "default" : "destructive"} className="ml-auto">
                <span className="flex items-center gap-1">
                  {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change >= 0 ? "+" : ""}
                  {formatNumber(stat.change)}%
                </span>
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-1 pt-2">
              <p className="text-xs font-semibold text-foreground">{stat.description}</p>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
