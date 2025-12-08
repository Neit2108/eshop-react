import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import { StoreSummary } from "./StoreSummary";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { fetchProductById, selectedProduct, isLoading, error } = useProducts();
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is missing in URL parameters.");
      navigate("/products");
      return;
    }

    fetchProductById(productId);
  }, [productId, navigate]);

  if (isLoading || !selectedProduct) {
    return (
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8">
        <Loader2 className="h-12 w-12 animate-spin text-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-500">
          Lỗi tải sản phẩm
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        >
          Quay lại danh sách sản phẩm
        </button>
      </div>
    );
  }

  const handleViewStore = () => {
    if (selectedProduct.shop) {
      navigate(`/shop/${selectedProduct.shop.id}`);
    }
  }

  // Extract image URLs from product data
  const allImages =
    selectedProduct.images && selectedProduct.images.length > 0
      ? selectedProduct.images.map((img) => img.imageUrl)
      : [selectedProduct.imageUrl || "/placeholder.svg"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Product Main Section */}
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductImageGallery images={allImages} thumbnails={allImages} />
        <ProductInfo
          product={selectedProduct}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </div>

      <StoreSummary
        storeLogo={selectedProduct.shop.logoUrl}
        storeName={selectedProduct.shop.name}
        storeId={selectedProduct.shop.id}
        productId={selectedProduct.id}
        reviews={selectedProduct.reviewCount}
        products={selectedProduct.variants.length}
        createdTime={new Date(selectedProduct.createdAt).getFullYear().toString() || "2020"}
        followers={2500}
        onViewStore={handleViewStore}
      />

      {/* Product Tabs Section */}
      <ProductTabs product={selectedProduct} />
    </div>
  );
}
