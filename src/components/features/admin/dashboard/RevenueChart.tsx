import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useAnalytics } from "@/hooks/useAnalytics"
import { Skeleton } from "@/components/ui/skeleton"

type TimePeriod = 'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'LAST_WEEK' | 'THIS_MONTH' | 'LAST_MONTH' | 'THIS_QUARTER' | 'LAST_QUARTER' | 'THIS_YEAR' | 'LAST_YEAR';

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

const PERIOD_OPTIONS: TimePeriod[] = ['THIS_MONTH', 'THIS_WEEK', 'TODAY'];

export function RevenueChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('THIS_MONTH');
  const { chartData, realTimeStats, loading, error, refresh } = useAnalytics({
    period: selectedPeriod,
    enableRealTime: true,
  });

  const handlePeriodChange = useCallback((period: TimePeriod) => {
    setSelectedPeriod(period);
  }, []);

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return `${value}M VND`;
  };

  // Transform real-time stats to append to chart data
  const displayData = realTimeStats
    ? [
        ...chartData,
        {
          date: new Date().toLocaleDateString('vi-VN', {
            month: '2-digit',
            day: '2-digit',
          }),
          totalRevenue: Math.round(realTimeStats.revenueInLastHour / 1000000),
          orderCount: realTimeStats.ordersInLastHour,
        },
      ]
    : chartData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Doanh Thu</CardTitle>
          <CardDescription className="flex items-center gap-2">
            Thống kê {PERIOD_LABELS[selectedPeriod]?.toLowerCase()}
            {realTimeStats && (
              <span className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Real-time
              </span>
            )}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {PERIOD_OPTIONS.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange(period)}
            >
              {PERIOD_LABELS[period]}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={loading}
          >
            {loading ? "Đang tải..." : "Làm mới"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            ❌ {error}
          </div>
        )}
        
        {loading && !chartData.length ? (
          <div className="space-y-2">
            <Skeleton className="h-[300px] w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={displayData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: "12px" }}
                  label={{ value: 'VND (Triệu)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number) => [formatCurrency(value), "Doanh Thu"]}
                  labelFormatter={(label) => `Ngày: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Doanh Thu"
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Real-time Stats Display */}
            {realTimeStats && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-medium">Đơn Hàng/Giờ</p>
                  <p className="text-lg font-bold text-blue-700">{realTimeStats.ordersInLastHour}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-xs text-green-600 font-medium">Doanh Thu/Giờ</p>
                  <p className="text-lg font-bold text-green-700">
                    {(realTimeStats.revenueInLastHour / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <p className="text-xs text-purple-600 font-medium">Cập Nhật</p>
                  <p className="text-xs font-bold text-purple-700">
                    {new Date(realTimeStats.lastUpdated).toLocaleTimeString('vi-VN')}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
