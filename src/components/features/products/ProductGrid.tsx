"use client"

import ProductCard from "./ProductCard"
import { Loader2 } from "lucide-react"
import type { Product } from "@/types/product.types"

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  sortBy: string
}

export default function ProductGrid({ products, isLoading, sortBy }: ProductGridProps) {
  // Sort products based on sortBy
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.averageRating - a.averageRating
      case "name-asc":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">Không tìm thấy sản phẩm nào</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
