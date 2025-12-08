import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const products = [
  {
    id: 1,
    image: "/premium-electronics-product.jpg",
    name: "Premium Wireless Headphones",
    price: 129.99,
    originalPrice: 199.99,
    rating: 5,
    reviews: 324,
    badge: "Sale",
    badgeVariant: "destructive" as const,
  },
  {
    id: 2,
    image: "/luxury-handbag-fashion.jpg",
    name: "Luxury Designer Handbag",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4,
    reviews: 215,
    badge: "New",
    badgeVariant: "secondary" as const,
  },
  {
    id: 3,
    image: "/smart-watch-technology.jpg",
    name: "Smart Watch Pro",
    price: 199.99,
    originalPrice: 299.99,
    rating: 5,
    reviews: 487,
    badge: "Popular",
  },
  {
    id: 4,
    image: "/wireless-earbuds-audio.jpg",
    name: "True Wireless Earbuds",
    price: 79.99,
    rating: 4,
    reviews: 156,
  },
  {
    id: 5,
    image: "/portable-speaker-bluetooth.jpg",
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    originalPrice: 129.99,
    rating: 5,
    reviews: 298,
    badge: "Hot",
    badgeVariant: "destructive" as const,
  },
  {
    id: 6,
    image: "/phone-case-protection.jpg",
    name: "Premium Phone Case",
    price: 34.99,
    rating: 4,
    reviews: 412,
  },
  {
    id: 7,
    image: "/camera-lens-professional.jpg",
    name: "Professional Camera Lens",
    price: 399.99,
    rating: 5,
    reviews: 89,
  },
  {
    id: 8,
    image: "/usb-type-c-cable-charger.jpg",
    name: "Fast Charging Cable Set",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4,
    reviews: 734,
    badge: "Deal",
    badgeVariant: "secondary" as const,
  },
]

export function ProductsPreview({ shopId }: { shopId: string }) {
  const { fetchProductByShopId, productsByShop } = useProducts();
  useEffect(() => {
    fetchProductByShopId(shopId);
  }, [shopId]);
  return (
    <div className="py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sản phẩm nổi bật</h2>
          <p className="text-sm text-muted-foreground">Khám phá sản phẩm bán chạy và mới nhất</p>
        </div>
        <Button variant="outline">Xem tất cả sản phẩm</Button>
      </div>

      <Separator className="mb-6" />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsByShop.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button size="lg" variant="outline">
          Xem thêm sản phẩm
        </Button>
      </div>
    </div>
  )
}
