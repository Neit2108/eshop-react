import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BasicInfoCardProps {
  code: string
  setCode: (value: string) => void
  name: string
  setName: (value: string) => void
  description: string
  setDescription: (value: string) => void
  voucherType: string
  setVoucherType: (value: string) => void
}

export function BasicInfoCard({
  code,
  setCode,
  name,
  setName,
  description,
  setDescription,
  voucherType,
  setVoucherType,
}: BasicInfoCardProps) {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Thông tin cơ bản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voucher Code */}
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium">
            Mã voucher <span className="text-red-500">*</span>
          </Label>
          <Input
            id="code"
            placeholder="VD: SUMMER2025"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full bg-background border-input"
          />
        </div>

        {/* Program Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Tên chương trình khuyến mãi <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="VD: Chương trình giảm giá mùa hè"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-background border-input"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Mô tả
          </Label>
          <Textarea
            id="description"
            placeholder="Nhập mô tả chi tiết về chương trình khuyến mãi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-24 bg-background border-input"
          />
        </div>

        {/* Voucher Type */}
        <div className="space-y-2">
          <Label htmlFor="voucher-type" className="text-sm font-medium">
            Loại khuyến mãi <span className="text-red-500">*</span>
          </Label>
          <Select value={voucherType} onValueChange={setVoucherType}>
            <SelectTrigger className="w-full bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE">Giảm % giá</SelectItem>
              <SelectItem value="FIXED_AMOUNT">Giảm số tiền cố định</SelectItem>
              <SelectItem value="FREE_SHIPPING">Miễn phí vận chuyển</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
