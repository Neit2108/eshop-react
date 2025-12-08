import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Shop } from "@/types/product.types"

export function StoreInfo({ shop }: { shop: Shop }) {
  const year = new Date(shop.createdAt || "").getFullYear();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Về cửa hàng</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Chào mừng đến với cửa hàng {shop.name} - điểm đến cuối cùng cho sản phẩm chất lượng và dịch vụ khách hàng tốt nhất. Chúng tôi tự hào về việc tuyển chọn sản phẩm tốt nhất để đáp ứng tất cả nhu cầu của bạn. Với hơn 10 năm kinh nghiệm trong ngành, chúng tôi cam kết cung cấp trải nghiệm mua sắm vượt trội.
        </p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Thông tin cửa hàng</TabsTrigger>
          <TabsTrigger value="shipping">Chính sách vận chuyển</TabsTrigger>
          <TabsTrigger value="return">Chính sách đổi trả</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cửa hàng</CardTitle>
              <CardDescription>Thông tin chung về cửa hàng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Ngày thành lập</p>
                  <p className="text-base font-semibold">{year}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Địa chỉ</p>
                  <p className="text-base font-semibold">{shop.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Thời gian phản hồi</p>
                  <p className="text-base font-semibold">{"<"} 2 giờ</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Đánh giá tích cực</p>
                  <p className="text-base font-semibold">{shop.reviewCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Chính sách vận chuyển</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">Vận chuyển trong nước</h4>
                  <p className="text-sm text-muted-foreground">
                    Miễn phí vận chuyển trên đơn hàng trên 50$ và vận chuyển tiêu chuẩn 3-5 ngày làm việc.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Vận chuyển quốc tế</h4>
                  <p className="text-sm text-muted-foreground">
                    Có sẵn cho 150+ quốc gia. Chi phí vận chuyển được tính tại thời điểm thanh toán. Giao hàng 7-14 ngày làm việc.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Vận chuyển nhanh</h4>
                  <p className="text-sm text-muted-foreground">
                    Giao hàng ngay sau khi thanh toán. Thêm phí phát sinh.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="return" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Chính sách đổi trả</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">30 ngày đổi trả</h4>
                  <p className="text-sm text-muted-foreground">
                    Tất cả sản phẩm có thể đổi trả trong vòng 30 ngày sau khi mua hàng, không có câu hỏi gì thêm.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Điều kiện đổi trả</h4>
                  <p className="text-sm text-muted-foreground">
                    Sản phẩm phải chưa sử dụng và đóng gói nguyên vẹn. Sử dụng một chút từ việc kiểm tra là chấp nhận được.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Vận chuyển đổi trả</h4>
                  <p className="text-sm text-muted-foreground">
                    Miễn phí vận chuyển đổi trả cho các đơn hàng do lỗi của chúng tôi. Khách hàng phải trả phí vận chuyển cho các đơn hàng khác.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Store Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Danh mục phổ biến</h3>
        <div className="flex flex-wrap gap-2">
          {["Điện tử", "Thời trang", "Nhà & Vườn", "Thể thao", "Sách", "Mỹ phẩm", "Trẻ em", "Sức khỏe"].map(
            (category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                {category}
              </Badge>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
