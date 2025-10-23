import { LayoutGrid } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortBarProps {
  productCount: number
  sortBy: string
  onSortChange: (value: string) => void
}

export default function SortBar({ productCount, sortBy, onSortChange }: SortBarProps) {
  const sortOptions = [
    { value: "name-asc", label: "Tên (A → Z)" },
    { value: "price-asc", label: "Giá (Thấp → Cao)" },
    { value: "price-desc", label: "Giá (Cao → Thấp)" },
    { value: "rating", label: "Đánh giá cao nhất" },
  ]

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-gray-200">
      <div className="flex items-center gap-2 sm:gap-3">
        <LayoutGrid size={18} className="text-gray-600 flex-shrink-0" />
        <span className="text-xs sm:text-sm md:text-base text-foreground font-medium">
          Tìm thấy <span className="font-bold text-red-500">{productCount.toLocaleString()}</span> sản phẩm.
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Sắp xếp theo</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300 text-xs sm:text-sm">
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
