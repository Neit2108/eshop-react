import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import SidebarFilter from "../../components/features/products/SidebarFilter";
import SortBar from "../../components/features/products/Sortbar";
import ProductGrid from "@/components/features/products/ProductGrid";
import Pagination from "../../components/features/products/Pagination";
import { Menu, X } from "lucide-react";
import type { ProductFilters } from "@/types/product.types";
import { useSearchParams } from "react-router-dom";

export default function ProductListPage() {
  const [searchParams] = useSearchParams();

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
  } = useProducts();

  const [sortBy, setSortBy] = useState("name-asc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const searchTerm = searchParams.get("searchTerm") || "";
    fetchProducts(searchTerm);
  }, [page, filters]);

  const handleCategoryChange = (categoryId: string) => {
    setFilters({
      ...filters,
      categoryId: filters.categoryId === categoryId ? undefined : categoryId,
    });
    setPage(1);
  };

  const handlePriceChange = (range: [number, number]) => {
    setFilters({
      ...filters,
      priceRange: {
        min: range[0],
        max: range[1],
      },
    });
    setPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    // Map UI sort to filter sortBy
    let sortByFilter: ProductFilters["sortBy"];
    switch (newSort) {
      case "price-asc":
      case "price-desc":
        sortByFilter = "price";
        break;
      case "rating":
        sortByFilter = "createdAt";
        break;
      case "name-asc":
      default:
        sortByFilter = "name";
    }
    setFilters({
      ...filters,
      sortBy: sortByFilter,
    });
    setPage(1);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSortBy("name-asc");
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="mb-4 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-foreground flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 transition-colors hover:bg-gray-50"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="font-medium">
            {isSidebarOpen ? "Hide Filters" : "Show Filters"}
          </span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 z-50 h-screen w-64 flex-shrink-0 overflow-y-auto bg-white p-4 pt-16 transition-transform duration-300 md:static md:z-auto md:h-auto md:translate-x-0 md:overflow-y-visible md:p-0 md:pt-0`}
        >
          <SidebarFilter
            filters={filters}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onClearFilters={handleClearFilters}
          />
        </aside>

        {/* Main Content */}
        <main className="w-full flex-1 md:w-auto">
          <SortBar
            productCount={totalProducts}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
          <ProductGrid
            products={products}
            isLoading={isLoading}
            sortBy={sortBy}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </main>
      </div>
    </>
  );
}
