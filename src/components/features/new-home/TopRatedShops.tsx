import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/lib/api";
import type { Shop } from "@/types/product.types";
import { Store } from "lucide-react";
import { apiService } from "@/services/apiService";
import { useNavigate } from "react-router-dom";

export default function TopRatedShops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTopRatedShops = async () => {
      try {
        setLoading(true);
        const response = await apiService.get<Shop[]>(API_ENDPOINTS.SHOPS.TOP_RATED);
        console.log("response", response.data);
        setShops(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopRatedShops();
  }, []);
  const renderStars = (rating: number | undefined = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${i < fullStars ? "text-amber-400" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Store className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Cửa hàng được yêu thích
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Khám phá những cửa hàng hàng đầu được khách hàng tin tưởng
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">Không thể tải dữ liệu</p>
          </div>
        )}

        {!loading && !error && shops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {shops.map((shop) => (
              <Card
                key={shop.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-none bg-card hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                      {shop.logoUrl ? (
                        <img
                          src={shop.logoUrl}
                          alt={shop.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Store className="w-10 h-10 text-primary" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2 text-center line-clamp-2">
                    {shop.name}
                  </h3>

                  <div className="flex flex-col items-center mb-4">
                    <div className="flex gap-0.5 mb-1">
                      {renderStars(shop.rating)}
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {shop.rating?.toFixed(1) || "0.0"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({shop.reviewCount || 0} đánh giá)
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-center text-sm text-muted-foreground flex-grow">
                    <div className="flex justify-center gap-4">
                      <div>
                        <p className="font-semibold text-foreground">{shop.totalProducts || 0}</p>
                        <p className="text-xs">Sản phẩm</p>
                      </div>
                      <div className="w-px bg-border"></div>
                      <div>
                        <p className="font-semibold text-foreground">{shop.totalOrders || 0}</p>
                        <p className="text-xs">Đơn hàng</p>
                      </div>
                    </div>
                  </div>

                  {shop.address && (
                    <p className="text-xs text-muted-foreground text-center mb-4 line-clamp-2">
                      {shop.address}
                    </p>
                  )}

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="sm"
                    onClick={() => navigate(`/shop/${shop.id}`)}
                  >
                    Xem cửa hàng
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && shops.length === 0 && (
          <div className="text-center py-20">
            <Store className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">Chưa có cửa hàng nào</p>
          </div>
        )}

        {!loading && !error && shops.length > 0 && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Xem tất cả cửa hàng
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
