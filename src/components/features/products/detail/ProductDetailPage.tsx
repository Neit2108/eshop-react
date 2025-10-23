import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useProducts } from "@/hooks/useProducts"
import { Loader2 } from "lucide-react"
import ProductImageGallery from "./ProductImageGallery"
import ProductInfo from "./ProductInfo"
import ProductTabs from "./ProductTabs"

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { fetchProductById, selectedProduct, isLoading, error } = useProducts()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    if (!productId) {
      navigate('/products')
      return
    }

    fetchProductById(productId)
  }, [productId, navigate])

  if (isLoading || !selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-red-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Lỗi tải sản phẩm</h2>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Quay lại danh sách sản phẩm
        </button>
      </div>
    )
  }

  // Format product data for display components
  const formattedProduct: any = {
    id: selectedProduct.id,
    title: selectedProduct.name,
    brand: selectedProduct.shop.name,
    originalPrice: selectedProduct.price,
    currentPrice: selectedProduct.price * 0.7,
    rating: Math.round(selectedProduct.averageRating),
    reviewCount: selectedProduct.reviewCount,
    stockQuantity: 100,
    description: "Sản phẩm chất lượng cao, được kiểm tra kỹ lưỡng trước khi gửi đến khách hàng.",
    sizes: ["S", "M", "L", "XL"],
    images: [selectedProduct.imageUrl || "/placeholder.svg"],
    thumbnails: [selectedProduct.imageUrl || "/placeholder.svg"],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductImageGallery images={formattedProduct.images} thumbnails={formattedProduct.thumbnails} />
        <ProductInfo
          product={formattedProduct}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </div>

      {/* Product Tabs Section */}
      <ProductTabs product={formattedProduct} />
    </div>
  )
}
