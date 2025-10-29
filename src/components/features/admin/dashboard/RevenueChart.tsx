import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Apr 3", visitors: 2400 },
  { date: "Apr 10", visitors: 1398 },
  { date: "Apr 17", visitors: 9800 },
  { date: "Apr 24", visitors: 3908 },
  { date: "May 1", visitors: 4800 },
  { date: "May 8", visitors: 3800 },
  { date: "May 15", visitors: 4300 },
  { date: "May 23", visitors: 2300 },
  { date: "May 31", visitors: 1900 },
  { date: "Jun 7", visitors: 2398 },
  { date: "Jun 14", visitors: 2210 },
  { date: "Jun 21", visitors: 2290 },
  { date: "Jun 30", visitors: 2000 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription>Total for the last 3 months</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Last 3 months
          </Button>
          <Button variant="outline" size="sm">
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            Last 7 days
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
            <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorVisitors)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
