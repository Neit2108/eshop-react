import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

interface DiscountConfigCardProps {
  promotionType: string
}

const MOCK_PRODUCTS = [
  { id: "1", name: "Laptop Pro", originalPrice: 1200 },
  { id: "2", name: "Wireless Headphones", originalPrice: 150 },
  { id: "3", name: "Smart Watch", originalPrice: 300 },
]

export function DiscountConfigCard({ promotionType }: DiscountConfigCardProps) {
  const [discountPercent, setDiscountPercent] = useState("")
  const [discountAmount, setDiscountAmount] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [numCodes, setNumCodes] = useState("")
  const [limitPerUser, setLimitPerUser] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1-hour")
  const [inventoryLimit, setInventoryLimit] = useState("")

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Cài đặt khuyến mãi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Percent Discount */}
        {promotionType === "percent" && (
          <div className="space-y-2">
            <Label htmlFor="percent" className="text-sm font-medium">
              Phần trăm giảm giá
            </Label>
            <div className="flex gap-2">
              <Input
                id="percent"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="flex-1 bg-background border-input"
              />
              <span className="flex items-center px-3 bg-muted text-muted-foreground text-sm rounded-md">%</span>
            </div>
          </div>
        )}

        {/* Amount Discount */}
        {promotionType === "amount" && (
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Số tiền giảm giá
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              className="w-full bg-background border-input"
            />
          </div>
        )}

        {/* Coupon Configuration */}
        {promotionType === "coupon" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coupon-code" className="text-sm font-medium">
                  Mã giảm giá
                </Label>
                <Input
                  id="coupon-code"
                  placeholder="e.g., SUMMER2025"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-background border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="num-codes" className="text-sm font-medium">
                  Số lượng mã
                </Label>
                <Input
                  id="num-codes"
                  type="number"
                  placeholder="1000"
                  value={numCodes}
                  onChange={(e) => setNumCodes(e.target.value)}
                  className="w-full bg-background border-input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date" className="text-sm font-medium">
                  Ngày hết hạn
                </Label>
                <Input
                  id="expiry-date"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-background border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit-per-user" className="text-sm font-medium">
                  Giới hạn mỗi người dùng
                </Label>
                <Input
                  id="limit-per-user"
                  type="number"
                  placeholder="1"
                  value={limitPerUser}
                  onChange={(e) => setLimitPerUser(e.target.value)}
                  className="w-full bg-background border-input"
                />
              </div>
            </div>
          </div>
        )}

        {/* Flash Sale Configuration */}
        {promotionType === "flash-sale" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timeframe" className="text-sm font-medium">
                Chọn khung thời gian
              </Label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-full bg-background border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-hour">1 Giờ</SelectItem>
                  <SelectItem value="3-hour">3 Giờ</SelectItem>
                  <SelectItem value="6-hour">6 Giờ</SelectItem>
                  <SelectItem value="12-hour">12 Giờ</SelectItem>
                  <SelectItem value="24-hour">24 Giờ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Giá bán cho mỗi sản phẩm</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Giá ban đầu</TableHead>
                    <TableHead>Giá khuyến mãi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PRODUCTS.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{formatCurrency(product.originalPrice)}</TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0" className="w-24 h-8 bg-background border-input" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inventory" className="text-sm font-medium">
                Giới hạn tồn kho
              </Label>
              <Input
                id="inventory"
                type="number"
                placeholder="1000"
                value={inventoryLimit}
                onChange={(e) => setInventoryLimit(e.target.value)}
                className="w-full bg-background border-input"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
