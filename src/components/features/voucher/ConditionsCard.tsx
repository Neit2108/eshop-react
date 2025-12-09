import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConditionsCardProps {
  scope: string
  setScope: (value: string) => void
  minOrderValue: number | undefined
  setMinOrderValue: (value: number | undefined) => void
  totalLimit: number | undefined
  setTotalLimit: (value: number | undefined) => void
  limitPerUser: number | undefined
  setLimitPerUser: (value: number | undefined) => void
  isAdmin: boolean
}

export function ConditionsCard({
  scope,
  setScope,
  minOrderValue,
  setMinOrderValue,
  totalLimit,
  setTotalLimit,
  limitPerUser,
  setLimitPerUser,
  isAdmin,
}: ConditionsCardProps) {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Điều kiện áp dụng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scope Selection - Only for Admin */}
        {isAdmin && (
          <div className="space-y-2">
            <Label htmlFor="scope" className="text-sm font-medium">
              Loại áp dụng <span className="text-red-500">*</span>
            </Label>
            <Select value={scope} onValueChange={setScope}>
              <SelectTrigger className="w-full bg-background border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHOP">Áp dụng cho cửa hàng cụ thể</SelectItem>
                <SelectItem value="PLATFORM">Toàn sàn (tất cả cửa hàng)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Min Order Value */}
        <div className="space-y-2">
          <Label htmlFor="min-order" className="text-sm font-medium">
            Giá trị đơn hàng tối thiểu (không bắt buộc)
          </Label>
          <Input
            id="min-order"
            type="number"
            min="0"
            placeholder="Để trống nếu không có yêu cầu"
            value={minOrderValue || ""}
            onChange={(e) => setMinOrderValue(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full bg-background border-input"
          />
        </div>

        {/* Limits Section */}
        <div className="border-t border-border pt-4 space-y-4">
          <h4 className="text-sm font-medium">Giới hạn sử dụng</h4>

          {/* Total Limit */}
          <div className="space-y-2">
            <Label htmlFor="total-limit" className="text-sm font-medium">
              Tổng số lượt sử dụng (không bắt buộc)
            </Label>
            <Input
              id="total-limit"
              type="number"
              min="1"
              placeholder="Để trống nếu không giới hạn"
              value={totalLimit || ""}
              onChange={(e) => setTotalLimit(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full bg-background border-input"
            />
          </div>

          {/* Per User Limit */}
          <div className="space-y-2">
            <Label htmlFor="limit-per-user" className="text-sm font-medium">
              Giới hạn mỗi người dùng (không bắt buộc)
            </Label>
            <Input
              id="limit-per-user"
              type="number"
              min="1"
              placeholder="Để trống nếu không giới hạn"
              value={limitPerUser || ""}
              onChange={(e) => setLimitPerUser(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full bg-background border-input"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
