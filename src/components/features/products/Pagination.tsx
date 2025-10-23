import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // Don't show pagination if only one page
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 mb-2 sm:mb-4 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-1.5 sm:p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
        title="Trang trước"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors font-medium ${
              page === currentPage
                ? "bg-red-500 text-white shadow-md"
                : page === "..."
                  ? "cursor-default text-gray-400 bg-transparent"
                  : "border border-gray-300 hover:bg-red-50 hover:border-red-300 text-gray-700"
            }`}
            title={typeof page === "number" ? `Go to page ${page}` : ""}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-1.5 sm:p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
        title="Trang tiếp theo"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </button>

      {/* Page Info */}
      <div className="text-xs sm:text-sm text-muted-foreground ml-2">
        Trang {currentPage} / {totalPages}
      </div>
    </div>
  )
}
