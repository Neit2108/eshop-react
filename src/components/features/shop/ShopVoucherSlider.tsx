import { useEffect, useState } from "react";
import { useVoucher } from "@/hooks/useVoucher";
import { voucherTypeMap } from "@/types/voucher.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function ShopVoucherSlider({ shopId }: { shopId: string }) {
  const { fetchShopVouchers, shopVouchers, isLoading } = useVoucher();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (shopId) {
      fetchShopVouchers(shopId);
    }
  }, [shopId, fetchShopVouchers]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Đang tải voucher...</p>
      </div>
    );
  }

  if (!shopVouchers || shopVouchers.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Mã giảm giá</h2>
        <p className="text-sm text-muted-foreground">
          Khám phá các mã giảm giá độc quyền của cửa hàng
        </p>
      </div>

      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {shopVouchers.map((voucher) => (
            <CarouselItem
              key={voucher.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                        {voucher.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {voucherTypeMap[voucher.type]}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 bg-blue-100 px-2 py-1 rounded text-xs font-bold text-blue-700">
                      {voucher.type === "PERCENTAGE" && `${voucher.discountValue}%`}
                      {voucher.type === "FIXED_AMOUNT" && `₫${voucher.discountValue}`}
                      {voucher.type === "FREE_SHIPPING" && "Miễn phí"}
                    </div>
                  </div>

                  {/* Description */}
                  {voucher.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {voucher.description}
                    </p>
                  )}

                  {/* Details */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    {voucher.minOrderValue && (
                      <p>Đơn tối thiểu: ₫{voucher.minOrderValue.toLocaleString()}</p>
                    )}
                    {voucher.totalLimit && (
                      <p>
                        Còn lại: {(voucher.totalLimit ?? 0) - (voucher.usedCount ?? 0)}
                      </p>
                    )}
                  </div>

                  {/* Code Copy Button */}
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <div className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono font-bold text-center text-foreground">
                      {voucher.code}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => handleCopyCode(voucher.code, voucher.id)}
                    >
                      {copiedId === voucher.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {shopVouchers.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}

