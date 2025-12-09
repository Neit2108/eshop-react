import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useAnalytics } from "@/hooks/useAnalytics"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * 📊 Component để hiển thị Trend Đơn Hàng (Orders)
 * Dùng BarChart để so sánh đơn hàng mỗi ngày
 * 
 * Cách sử dụng:
 * <OrdersTrendChart period="THIS_MONTH" />
 */

type TimePeriod = 'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'LAST_WEEK' | 'THIS_MONTH' | 'LAST_MONTH' | 'THIS_QUARTER' | 'LAST_QUARTER' | 'THIS_YEAR' | 'LAST_YEAR';

interface OrdersTrendChartProps {
  period?: TimePeriod;
  shopId?: string;
}

export function OrdersTrendChart({ 
  period = 'THIS_MONTH',
  shopId 
}: OrdersTrendChartProps) {
  const { ordersTrendData, loading, error, refresh } = useAnalytics({
    period,
    shopId,
    enableOrdersTrend: true,
    enableRealTime: false,
  });

  const PERIOD_LABELS = {
    TODAY: 'Hôm nay',
    YESTERDAY: 'Hôm qua',
    THIS_WEEK: 'Tuần này',
    LAST_WEEK: 'Tuần trước',
    THIS_MONTH: 'Tháng này',
    LAST_MONTH: 'Tháng trước',
    THIS_QUARTER: 'Quý này',
    LAST_QUARTER: 'Quý trước',
    THIS_YEAR: 'Năm này',
    LAST_YEAR: 'Năm trước',
  } as const;

  // Transform data for display
  const displayData = ordersTrendData.map(item => ({
    date: new Date(item.date).toLocaleDateString('vi-VN', {
      month: '2-digit',
      day: '2-digit',
    }),
    totalOrders: item.totalOrders,
    completedOrders: item.completedOrders,
    cancelledOrders: item.cancelledOrders,
    refundedOrders: item.refundedOrders,
    totalRevenue: Math.round(item.totalRevenue / 1000000),
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Xu Hướng Đơn Hàng</CardTitle>
          <CardDescription>
            Số đơn hàng {PERIOD_LABELS[period]?.toLowerCase()}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refresh}
          disabled={loading}
        >
          {loading ? "Đang tải..." : "Làm mới"}
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {loading && !displayData.length ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number) => [value, "Đơn hàng"]}
              />
              <Legend />
              <Bar
                dataKey="totalOrders"
                fill="hsl(var(--chart-2))"
                radius={[8, 8, 0, 0]}
                name="Tổng Đơn"
              />
              <Bar
                dataKey="completedOrders"
                fill="hsl(var(--chart-3))"
                radius={[8, 8, 0, 0]}
                name="Hoàn Thành"
              />
              <Bar
                dataKey="cancelledOrders"
                fill="hsl(var(--chart-4))"
                radius={[8, 8, 0, 0]}
                name="Đã Hủy"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}


