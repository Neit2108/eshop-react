import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Shop } from "@/types/product.types"
import { Heart, Share2, Star } from "lucide-react"

export function StoreHeader({ shop }: { shop: Shop }) {
  return (
    <div className="relative w-full">
      {/* Banner Image */}
      <div
        className="w-full h-56 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800"
        style={{
          backgroundImage: `url(${`https://placehold.co/1920x1080?text=Classy&font=roboto`})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Store Info Card */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-12 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* Left Section: Logo and Store Details */}
          <div className="flex items-end gap-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={shop.logoUrl} alt="Store" />
              <AvatarFallback>{shop.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{shop.name}</h1>
                <Badge variant="secondary" className="flex items-center gap-1 bg-green-500 text-white">
                  <Star className="h-3 w-3 fill-current" />
                  Đã xác minh
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">{shop.rating}</span>
                  <span>({shop.reviewCount} đánh giá)</span>
                </div>

                <div>
                  <span className="font-semibold text-foreground">126.5K</span>
                  <span> người theo dõi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="flex items-center gap-2 pb-2">
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button className="bg-primary hover:bg-primary/90">Theo dõi</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
