import { StoreHeader } from "@/components/features/shop/StoreHeader";
import { StoreInfo } from "@/components/features/shop/StoreInfo";
import { StoreStats } from "@/components/features/shop/StoreStats";
import { ProductsPreview } from "@/components/features/shop/ProductsPreview";
import { StoreReviews } from "@/components/features/shop/StoreReviews";
import { Separator } from "@/components/ui/separator";
import { useFetch } from "@/hooks/useFetch";
import { API_ENDPOINTS } from "@/lib/api";
import type { Shop } from "@/types/product.types";
import Loading from "@/components/common/Loading";
import { useParams } from "react-router-dom";
export function StoreDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useFetch<Shop>(
    API_ENDPOINTS.SHOPS.GET(id || "")
  );

  if (!data) return <div>Không tìm thấy cửa hàng</div>;

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <main className="bg-background min-h-screen">
      <StoreHeader shop={data} />
      <Separator className="my-8" />
      <div className="container mx-auto space-y-12 px-4 py-8">
        <StoreInfo shop={data} />
        <Separator />
        <StoreStats shop={data} />
        <Separator />
        <ProductsPreview shopId={data.id} />
        <Separator />
        <StoreReviews />
      </div>
    </main>
  );
}
