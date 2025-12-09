import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DiscountConfigCardProps {
  voucherType: string
  discountValue: number
  setDiscountValue: (value: number) => void
  maxDiscount: number | undefined
  setMaxDiscount: (value: number | undefined) => void
}

export function DiscountConfigCard({
  voucherType,
  discountValue,
  setDiscountValue,
  maxDiscount,
  setMaxDiscount,
}: DiscountConfigCardProps) {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Cài đặt khuyến mãi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Percent Discount */}
        {voucherType === "PERCENTAGE" && (
          <div className="space-y-2">
            <Label htmlFor="percent" className="text-sm font-medium">
              Phần trăm giảm giá <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="percent"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="flex-1 bg-background border-input"
              />
              <span className="flex items-center px-3 bg-muted text-muted-foreground text-sm rounded-md">%</span>
            </div>
          </div>
        )}

        {/* Fixed Amount Discount */}
        {voucherType === "FIXED_AMOUNT" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Số tiền giảm giá <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                min="0"
                placeholder="0"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full bg-background border-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-discount" className="text-sm font-medium">
                Giới hạn giảm giá tối đa (không bắt buộc)
              </Label>
              <Input
                id="max-discount"
                type="number"
                min="0"
                placeholder="Để trống nếu không giới hạn"
                value={maxDiscount || ""}
                onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full bg-background border-input"
              />
            </div>
          </div>
        )}

        {/* Free Shipping */}
        {voucherType === "FREE_SHIPPING" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Loại khuyến mãi: Miễn phí vận chuyển
            </Label>
            <p className="text-sm text-muted-foreground">
              Voucher này sẽ miễn phí vận chuyển cho khách hàng. Không cần nhập giá trị giảm giá.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
