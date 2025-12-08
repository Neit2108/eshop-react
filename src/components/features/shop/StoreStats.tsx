import { Card, CardContent } from "@/components/ui/card"
import { Package, TrendingUp, Star } from "lucide-react"
import type { Shop } from "@/types/product.types"

interface StatCard {
  label: string
  value: string
  icon: typeof Package
  description: string
}

const stats: StatCard[] = [
  {
    label: "Sản phẩm",
    value: "1,250+",
    icon: Package,
    description: "Danh sách sản phẩm",
  },
  {
    label: "Tổng sản phẩm đã bán",
    value: "48.5K",
    icon: TrendingUp,
    description: "Sản phẩm đã bán",
  },
  {
    label: "Đánh giá",
    value: "2,510",
    icon: Star,
    description: "Đánh giá khách hàng",
  },
]

export function StoreStats({ shop }: { shop: Shop }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Thống kê cửa hàng</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
