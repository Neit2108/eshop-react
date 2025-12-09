import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PreviewCardProps {
  code: string
  name: string
  description: string
  voucherType: string
  discountValue: number
  startDate: string
  endDate: string
}

export function PreviewCard({
  code,
  name,
  description,
  voucherType,
  discountValue,
  startDate,
  endDate,
}: PreviewCardProps) {
  const getDiscountBadge = () => {
    switch (voucherType) {
      case "PERCENTAGE":
        return `-${discountValue}%`
      case "FIXED_AMOUNT":
        return `-${discountValue.toLocaleString("vi-VN")}đ`
      case "FREE_SHIPPING":
        return "MIỄN PHÍ VẬN CHUYỂN"
      default:
        return ""
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" })
  }

  const startFormatted = formatDate(startDate)
  const endFormatted = formatDate(endDate)

  return (
    <Card className="border border-border sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Badge */}
        {getDiscountBadge() && (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{getDiscountBadge()}</Badge>
        )}

        {/* Code */}
        {code && (
          <div className="bg-muted rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground">Mã voucher</p>
            <p className="text-lg font-bold font-mono">{code}</p>
          </div>
        )}

        {/* Name and Description */}
        <div>
          {name && (
            <h3 className="text-base font-semibold text-foreground mb-2">{name}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
          )}
        </div>

        {/* Details */}
        <div className="bg-muted rounded-lg p-3 text-sm space-y-2 border border-border">
          {discountValue > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Giảm giá:</span>
              <span className="font-semibold text-accent">{getDiscountBadge()}</span>
            </div>
          )}
          {(startFormatted || endFormatted) && (
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="text-muted-foreground">Thời hạn:</span>
              <span className="font-medium">
                {startFormatted && endFormatted
                  ? `${startFormatted} - ${endFormatted}`
                  : startFormatted || endFormatted}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
