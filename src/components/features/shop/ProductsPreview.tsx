import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductsPreview({ shopId }: { shopId: string }) {
  const { 
    fetchProducts, 
    products, 
    isLoading, 
    error,
    page,
    limit,
    totalPages,
    setPage,
    clearFilters,
  } = useProducts();

  // Lấy sản phẩm của shop với filter theo shopId, page mặc định 1, limit 8
  // Chỉ gọi khi shopId thay đổi
  useEffect(() => {
    if (shopId) {
      clearFilters();
      fetchProducts(undefined, 1, 8, shopId);
    }
  }, [shopId]);

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchProducts(undefined, newPage, limit, shopId);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      fetchProducts(undefined, newPage, limit, shopId);
    }
  };

  if (error) {
    return (
      <div className="py-12">
        <div className="text-center text-red-500">
          <p>Lỗi tải sản phẩm: {error}</p>
        </div>
      </div>
    );
  }

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

      {isLoading && products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Đang tải sản phẩm...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Không có sản phẩm nào</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button 
                variant="outline"
                size="icon"
                onClick={handlePreviousPage}
                disabled={isLoading || page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Trang {page} / {totalPages}
                </span>
              </div>

              <Button 
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={isLoading || page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
