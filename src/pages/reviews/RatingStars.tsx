import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  size?: number
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export default function RatingStars({ rating, size = 16, interactive = false, onRatingChange }: RatingStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onRatingChange?.(star)}
          disabled={!interactive}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={size}
            className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
          />
        </button>
      ))}
    </div>
  )
}
