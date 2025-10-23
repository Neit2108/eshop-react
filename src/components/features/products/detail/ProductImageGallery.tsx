import { useState } from "react"

interface ProductImageGalleryProps {
  images: string[]
  thumbnails: string[]
}

export default function ProductImageGallery({ images, thumbnails }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
        <img
          src={images[selectedImageIndex] || "/placeholder.svg"}
          alt="Product main image"
          
          className="object-cover"
          
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3">
        {thumbnails.map((thumbnail, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImageIndex === index ? "border-[#FF6B6B]" : "border-border hover:border-muted-foreground"
            }`}
          >
            <img
              src={thumbnail || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
