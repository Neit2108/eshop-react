import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Sofa, Package, Wind, Palette, Lightbulb, Zap } from "lucide-react"

interface Category {
  id: number
  name: string
  icon: React.ReactNode
  color: string
  products: number
}

const categories: Category[] = [
  {
    id: 1,
    name: "Nội thất",
    icon: <Sofa className="w-8 h-8" />,
    color: "from-blue-50 to-blue-100",
    products: 245,
  },
  {
    id: 2,
    name: "Kho lưu trữ",
    icon: <Package className="w-8 h-8" />,
    color: "from-green-50 to-green-100",
    products: 189,
  },
  {
    id: 3,
    name: "Dệt may",
    icon: <Wind className="w-8 h-8" />,
    color: "from-purple-50 to-purple-100",
    products: 156,
  },
  {
    id: 4,
    name: "Trang trí",
    icon: <Palette className="w-8 h-8" />,
    color: "from-pink-50 to-pink-100",
    products: 312,
  },
  {
    id: 5,
    name: "Chiếu sáng",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "from-yellow-50 to-yellow-100",
    products: 128,
  },
  {
    id: 6,
    name: "Điện tử gia dụng",
    icon: <Zap className="w-8 h-8" />,
    color: "from-red-50 to-red-100",
    products: 95,
  },
]

export default function ProductCategories() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Mua hàng theo danh mục</h2>
          <p className="text-lg text-muted-foreground">Ngắm nhìn bộ sưu tập đa dạng của chúng tôi trên tất cả các phòng ban</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-none cursor-pointer hover:scale-105 transform"
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${category.color} p-8 flex items-center justify-between`}>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">{category.products} sản phẩm</p>
                  </div>
                  <div className="text-primary opacity-70">{category.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
