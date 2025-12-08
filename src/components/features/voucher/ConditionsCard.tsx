import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

interface ConditionsCardProps {
  applicationType: string
  setApplicationType: (value: string) => void
}

const MOCK_CATEGORIES = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Fashion" },
  { id: "3", name: "Home & Garden" },
  { id: "4", name: "Sports" },
]

const MOCK_PRODUCTS = [
  { id: "1", name: "Laptop Pro" },
  { id: "2", name: "Wireless Headphones" },
  { id: "3", name: "Smart Watch" },
  { id: "4", name: "Phone Case" },
]

const MOCK_TAGS = [
  { id: "1", name: "Summer" },
  { id: "2", name: "New Arrival" },
  { id: "3", name: "Best Seller" },
  { id: "4", name: "Limited" },
]

export function ConditionsCard({ applicationType, setApplicationType }: ConditionsCardProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [newUserOnly, setNewUserOnly] = useState(false)
  const [allowCumulative, setAllowCumulative] = useState(false)

  const getItemsList = () => {
    switch (applicationType) {
      case "category":
        return MOCK_CATEGORIES
      case "product":
        return MOCK_PRODUCTS
      case "tag":
        return MOCK_TAGS
      default:
        return []
    }
  }

  const items = getItemsList()

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getSelectedNames = () => {
    return items.filter((item) => selectedItems.includes(item.id)).map((item) => item.name)
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Điều kiện áp dụng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Application Type */}
        <div className="space-y-2">
          <Label htmlFor="app-type" className="text-sm font-medium">
              Chọn loại áp dụng
          </Label>
          <Select value={applicationType} onValueChange={setApplicationType}>
            <SelectTrigger className="w-full bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whole-shop">Toàn bộ cửa hàng</SelectItem>
              <SelectItem value="category">Theo danh mục</SelectItem>
              <SelectItem value="product">Theo sản phẩm</SelectItem>
              <SelectItem value="tag">Theo nhãn sản phẩm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Multi-select for Category/Product/Tag */}
        {applicationType !== "whole-shop" && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Select{" "}
              {applicationType === "category" ? "categories" : applicationType === "product" ? "products" : "tags"}
            </Label>
            <div className="border border-input rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto bg-background">
              {items.map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{item.name}</span>
                </label>
              ))}
            </div>
            {selectedItems.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {getSelectedNames().map((name) => (
                  <Badge key={name} variant="secondary" className="gap-1">
                    {name}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Order Conditions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-order" className="text-sm font-medium">
              Giá trị đơn hàng tối thiểu
            </Label>
            <Input id="min-order" type="number" placeholder="0" className="w-full bg-background border-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="min-qty" className="text-sm font-medium">
              Số lượng tối thiểu
            </Label>
            <Input id="min-qty" type="number" placeholder="0" className="w-full bg-background border-input" />
          </div>
        </div>

        {/* Applicable Objects */}
        <div className="space-y-4 border-t border-border pt-4">
          <h4 className="text-sm font-medium">Đối tượng áp dụng</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-users" className="text-sm font-medium cursor-pointer">
                Chỉ người dùng mới
              </Label>
              <Switch id="new-users" checked={newUserOnly} onCheckedChange={setNewUserOnly} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="cumulative" className="text-sm font-medium cursor-pointer">
                Cho phép cộng dồn khuyến mãi
              </Label>
              <Switch id="cumulative" checked={allowCumulative} onCheckedChange={setAllowCumulative} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
