import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Flame } from "lucide-react"
import { formatCurrency } from '../../../lib/utils';

interface FlashProduct {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  discount: number
}

interface CountdownTime {
  hours: number
  minutes: number
  seconds: number
}

const flashProducts: FlashProduct[] = [
  {
    id: 1,
    name: "Đèn trang trí",
    price: 399000,
    originalPrice: 899000,
    image: "/designer-lamp.png",
    discount: 49,
  },
  {
    id: 2,
    name: "Bộ gối cao cấp",
    price: 349000,
    originalPrice: 799000,
    image: "/premium-pillow.jpg",
    discount: 56,
  },
  {
    id: 3,
    name: "Kệ sách hiện đại",
    price: 990000,
    originalPrice: 1990000,
    image: "/modern-bookshelf.png",
    discount: 50,
  },
  {
    id: 4,
    name: "Gương trang trí",
    price: 590000,
    originalPrice: 1190000,
    image: "/decorative-mirror.jpg",
    discount: 50,
  },
]

export default function FlashSale() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateCountdown = () => {
      // Calculate time until midnight
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setCountdown({ hours, minutes, seconds })
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-destructive/10 rounded-lg px-4 py-3 min-w-20">
        <span className="text-2xl font-bold text-destructive">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="text-xs text-muted-foreground mt-2 uppercase">{label}</span>
    </div>
  )

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header with Countdown */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-8 h-8 text-destructive" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Flash Sale</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-md">
                Ưu đãi có thời hạn trên các sản phẩm bán chạy nhất của chúng tôi. Đừng bỏ lỡ!
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex gap-4 items-center">
              <CountdownUnit value={countdown.hours} label="Giờ" />
              <span className="text-4xl font-bold text-muted-foreground">:</span>
              <CountdownUnit value={countdown.minutes} label="Phút" />
              <span className="text-4xl font-bold text-muted-foreground">:</span>
              <CountdownUnit value={countdown.seconds} label="Giây" />
            </div>
          </div>
        </div>

        {/* Flash Sale Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none bg-card relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground rounded-full w-14 h-14 flex items-center justify-center font-bold text-sm z-10 shadow-lg">
                -{product.discount}%
              </div>

              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-muted h-72">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-3 line-clamp-2">{product.name}</h3>

                  {/* Pricing */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-foreground">{formatCurrency(product.price)}</span>
                    <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</span>
                  </div>

                  {/* CTA */}
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Thêm vào giỏ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
