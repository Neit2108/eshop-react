import { useState } from "react"
import type { Product } from "@/types/product.types"
import DescriptionTab from "./DescriptionTab"
import ReviewsTab from "./ReviewsTab"

interface ProductTabsProps {
  product: Product
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description")

  return (
    <div className="border-t border-border pt-8">
      {/* Tab Navigation */}
      <div className="flex gap-8 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-4 font-semibold text-lg transition-colors ${
            activeTab === "description"
              ? "text-[#FF6B6B] border-b-2 border-[#FF6B6B]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-4 font-semibold text-lg transition-colors ${
            activeTab === "reviews"
              ? "text-[#FF6B6B] border-b-2 border-[#FF6B6B]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Reviews ({product.reviewCount})
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "description" && (
          <DescriptionTab 
            categories={product.categories}
            productOption={product.options}
            status={product.status}
          />
        )}
        {activeTab === "reviews" && <ReviewsTab productId={product.id} />}
      </div>
    </div>
  )
}
