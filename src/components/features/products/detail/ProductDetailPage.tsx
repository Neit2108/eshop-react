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
  const [selectedVariant, setSelectedVariant] = useState<string>("")
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

  // Extract image URLs from product data
  const allImages = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images.map(img => img.imageUrl)
    : [selectedProduct.imageUrl || "/placeholder.svg"]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductImageGallery images={allImages} thumbnails={allImages} />
        <ProductInfo
          product={selectedProduct}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </div>

      {/* Product Tabs Section */}
      <ProductTabs product={selectedProduct} />
    </div>
  )
}
