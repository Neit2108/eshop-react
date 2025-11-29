import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Organizer",
    price: 129.99,
    image: "/wooden-storage-organizer.jpg",
    category: "Storage",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Luxury Cushion",
    price: 89.99,
    image: "/modern-home-cushion-pillow.jpg",
    category: "Decor",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Designer Rug",
    price: 249.99,
    image: "/contemporary-area-rug-design.jpg",
    category: "Rugs",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Ceramic Vase",
    price: 79.99,
    image: "/elegant-ceramic-vase-pottery.jpg",
    category: "Vases",
    rating: 4.6,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Featured Collection</h2>
          <p className="text-lg text-muted-foreground">Discover our carefully curated selection of premium products</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none bg-card"
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-muted h-72">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors shadow-md">
                    <Heart className="w-5 h-5 text-foreground" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex gap-0.5">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">{product.rating}</span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">${product.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
