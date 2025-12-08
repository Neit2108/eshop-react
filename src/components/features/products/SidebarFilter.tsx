import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { Category, ProductFilters } from "@/types/product.types"
import { Button } from "@/components/ui"

interface SidebarFilterProps {
  filters: ProductFilters
  categories: Category[]
  onCategoryChange: (categoryId: string) => void
  onPriceChange: (range: [number, number]) => void
  onClearFilters: () => void
}

const MAX_VISIBLE_CATEGORIES = 5

export default function SidebarFilter({
  filters,
  categories,
  onCategoryChange,
  onPriceChange,
  onClearFilters,
}: SidebarFilterProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [showAllCategories, setShowAllCategories] = useState(false)

  const priceMin = filters.priceRange?.min ?? 0
  const priceMax = filters.priceRange?.max ?? 100000000
  const selectedCategoryId = filters.categoryId

  // const renderStars = (count: number) => {
  //   return (
  //     <div className="flex gap-1">
  //       {[...Array(5)].map((_, i) => (
  //         <span key={i} className={`text-lg ${i < count ? "text-yellow-400" : "text-gray-300"}`}>
  //           ★
  //         </span>
  //       ))}
  //     </div>
  //   )
  // }

  // const hasActiveFilters = selectedCategoryId || filters.priceRange || filters.searchTerm

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Active Filters Indicator and Clear Button 
      {hasActiveFilters && (
        <div className="flex items-center justify-between gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
          <span className="text-xs sm:text-sm text-red-700 font-medium">Bộ lọc đang hoạt động</span>
          <button
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700 transition-colors"
            title="Xóa tất cả bộ lọc"
          >
            <X size={16} />
          </button>
        </div>
      )}*/}

      {/* Category Filter */}
      <div className="border-b pb-3 sm:pb-4">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full mb-3 sm:mb-4 hover:text-red-500 transition-colors"
        >
          <h3 className="font-semibold text-sm sm:text-base text-foreground">Danh mục sản phẩm</h3>
          <ChevronUp size={18} className={`sm:w-5 sm:h-5 transition-transform ${isCategoryOpen ? "" : "rotate-180"}`} />
        </button>
        {isCategoryOpen && (
          <div className="space-y-2 sm:space-y-3">
            {categories.length > 0 ? (
              <>
                {categories.slice(0, showAllCategories ? undefined : MAX_VISIBLE_CATEGORIES).map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:text-red-500 transition-colors"
                  >
                    <Checkbox
                      checked={selectedCategoryId === category.id}
                      onCheckedChange={() => onCategoryChange(category.id)}
                      className="border-gray-300"
                    />
                    <span className="text-xs sm:text-sm text-foreground">{category.name}</span>
                  </label>
                ))}
                {categories.length > MAX_VISIBLE_CATEGORIES && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="flex items-center gap-1 text-xs sm:text-sm text-red-500 hover:text-red-600 transition-colors mt-2 font-medium"
                  >
                    {showAllCategories ? (
                      <>
                        <ChevronUp size={14} />
                        Ẩn bớt
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} />
                        Xem thêm ({categories.length - MAX_VISIBLE_CATEGORIES})
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <p className="text-xs sm:text-sm text-muted-foreground">Không có danh mục nào</p>
            )}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b pb-3 sm:pb-4">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full mb-3 sm:mb-4 hover:text-red-500 transition-colors"
        >
          <h3 className="font-semibold text-sm sm:text-base text-foreground">Lọc theo giá</h3>
          <ChevronUp size={18} className={`sm:w-5 sm:h-5 transition-transform ${isPriceOpen ? "" : "rotate-180"}`} />
        </button>
        {isPriceOpen && (
          <div className="space-y-3 sm:space-y-4">
            <Slider
              value={[priceMin, priceMax]}
              onValueChange={(value) => onPriceChange([value[0], value[1]])}
              min={0}
              max={100000000}
              step={100000}
              className="w-full"
            />
            <div className="flex justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="truncate">Từ: {priceMin.toLocaleString()} VNĐ</span>
              <span className="truncate">Đến: {priceMax.toLocaleString()} VNĐ</span>
            </div>
          </div>
        )}
      </div>

      {/* Filter Info */}
      <div className="pt-2 border-t text-xs text-muted-foreground space-y-1">
        {selectedCategoryId && <p>📁 Danh mục: {categories.find(c => c.id === selectedCategoryId)?.name}</p>}
        {filters.priceRange && (
          <p>💰 Giá: {priceMin.toLocaleString()} - {priceMax.toLocaleString()} VNĐ</p>
        )}
        {filters.searchTerm && <p>🔍 Tìm kiếm: {filters.searchTerm}</p>}
        <Button variant="link" size="sm" onClick={onClearFilters} className="p-0">
          Xóa tất cả bộ lọc
        </Button>
      </div>
    </div>
  )
}
