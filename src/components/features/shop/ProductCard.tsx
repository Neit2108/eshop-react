import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"
import { StarIcon } from "./StarIcon"
import { formatPrice } from "@/lib/utils"
import type{ Product } from "@/types/product.types"
import { useNavigate } from "react-router-dom"

interface ProductCardProps {
  product: Product
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
}

export function ProductCard({
  product,  
  badgeVariant = "default",
}: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="relative p-0">
        <AspectRatio ratio={1}>
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name || "Product Image"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* {badge && (
            <Badge className="absolute right-2 top-2" variant={badgeVariant}>
              {badge}
            </Badge>
          )} */}
        </AspectRatio>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <p className="line-clamp-2 text-sm font-medium text-foreground">{product.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < product.averageRating} size="sm" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.discountPercentage && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex w-full gap-2">
          <Button size="sm" className="flex-1" onClick={() => navigate(`/products/${product.id}`)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Thêm vào giỏ hàng
          </Button>
          <Button size="sm" variant="outline">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
