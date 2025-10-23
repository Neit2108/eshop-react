import type { ProductCategory, ProductOption } from "@/types/product.types"

interface DescriptionTabProps {
  categories: ProductCategory[]
  productOption?: ProductOption[]
  status: string
}

export default function DescriptionTab({ categories, productOption, status }: DescriptionTabProps) {
  return (
    <div className="py-6 space-y-6">
      {/* Status */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-2">Status:</h4>
        <p className="text-muted-foreground">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "PUBLISHED" ? "bg-green-100 text-green-800" :
            status === "DRAFT" ? "bg-blue-100 text-blue-800" :
            status === "OUT_OF_STOCK" ? "bg-red-100 text-red-800" :
            "bg-gray-100 text-gray-800"
          }`}>
            {status}
          </span>
        </p>
      </div>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">Categories:</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className="px-3 py-1 bg-muted text-foreground rounded-full text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Product Options */}
      {productOption && productOption.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Available Options:</h4>
          <div className="space-y-3">
            {productOption.map((option) => (
              <div key={option.id}>
                <p className="text-sm font-medium text-foreground mb-1">{option.name}:</p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <span
                      key={value.id}
                      className="px-3 py-1 border border-border rounded text-sm text-muted-foreground"
                    >
                      {value.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
