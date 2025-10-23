import { useEffect, useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import SidebarFilter from "../../components/features/products/SidebarFilter"
import SortBar from "../../components/features/products/Sortbar"
import ProductGrid from "@/components/features/products/ProductGrid"
import Pagination from "../../components/features/products/Pagination"
import { Menu, X } from "lucide-react"
import type { ProductFilters } from "@/types/product.types"

export default function ProductListPage() {
  const {
    products,
    totalProducts,
    page,
    totalPages,
    isLoading,
    filters,
    fetchProducts,
    setFilters,
    setPage,
    clearFilters,
  } = useProducts()

  const [sortBy, setSortBy] = useState("name-asc")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
    console.log("Products", products);
  }, [page, filters])

  const handleCategoryChange = (categoryId: string) => {
    setFilters({
      ...filters,
      categoryId: filters.categoryId === categoryId ? undefined : categoryId,
    })
    setPage(1)
  }

  const handlePriceChange = (range: [number, number]) => {
    setFilters({
      ...filters,
      priceRange: {
        min: range[0],
        max: range[1],
      },
    })
    setPage(1)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    // Map UI sort to filter sortBy
    let sortByFilter: ProductFilters['sortBy']
    switch (newSort) {
      case "price-asc":
      case "price-desc":
        sortByFilter = "price"
        break
      case "rating":
        sortByFilter = "createdAt"
        break
      case "name-asc":
      default:
        sortByFilter = "name"
    }
    setFilters({
      ...filters,
      sortBy: sortByFilter,
    })
    setPage(1)
  }

  const handleClearFilters = () => {
    clearFilters()
    setSortBy("name-asc")
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-foreground hover:bg-gray-50 w-full justify-center transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="font-medium">{isSidebarOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static fixed left-0 top-0 h-screen md:h-auto w-64 flex-shrink-0 bg-white z-50 md:z-auto transition-transform duration-300 overflow-y-auto md:overflow-y-visible pt-16 md:pt-0 p-4 md:p-0`}
        >
          <SidebarFilter
            filters={filters}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onClearFilters={handleClearFilters}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full md:w-auto">
          <SortBar productCount={totalProducts} sortBy={sortBy} onSortChange={handleSortChange} />
          <ProductGrid
            products={products}
            isLoading={isLoading}
            sortBy={sortBy}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </main>
      </div>
    </>
  )
}
