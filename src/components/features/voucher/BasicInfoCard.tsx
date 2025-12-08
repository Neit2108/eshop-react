import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface BasicInfoCardProps {
  promotionType: string
  setPromotionType: (value: string) => void
}

export function BasicInfoCard({ promotionType, setPromotionType }: BasicInfoCardProps) {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Thông tin cơ bản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Program Name */}
        <div className="space-y-2">
          <Label htmlFor="program-name" className="text-sm font-medium">
            Tên chương trình khuyến mãi
          </Label>
          <Input id="program-name" placeholder="Enter promotion name" className="w-full bg-background border-input" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Mô tả
          </Label>
          <Textarea
            id="description"
            placeholder="Enter promotion description"
            className="w-full min-h-24 bg-background border-input"
          />
        </div>

        {/* Promotion Type */}
        <div className="space-y-2">
          <Label htmlFor="promotion-type" className="text-sm font-medium">
            Loại khuyến mãi
          </Label>
          <Select value={promotionType} onValueChange={setPromotionType}>
            <SelectTrigger className="w-full bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percent">Giảm % giá</SelectItem>
              <SelectItem value="amount">Giá giá tiền</SelectItem>
              <SelectItem value="coupon">Mã giảm giá (Coupon)</SelectItem>
              <SelectItem value="flash-sale">Flash sale</SelectItem>
              <SelectItem value="buy-get">Mua X tặng Y</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Banner Upload */}
        <div className="space-y-2">
          <Label htmlFor="banner" className="text-sm font-medium">
            Tải lên hình ảnh banner
          </Label>
          <Button variant="outline" className="w-full gap-2 border-dashed bg-transparent" asChild>
            <label className="cursor-pointer">
              <Upload className="h-4 w-4" />
              Click to upload banner
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </Button>
          <p className="text-xs text-muted-foreground">PNG, JPG hoặc GIF (tối đa 5MB)</p>
        </div>
      </CardContent>
    </Card>
  )
}
