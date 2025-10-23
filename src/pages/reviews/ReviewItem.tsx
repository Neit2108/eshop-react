import RatingStars from "./RatingStars"

interface Review {
  id: number
  author: string
  date: string
  comment: string
  rating: number
  avatar: string
}

interface ReviewItemProps {
  review: Review
}

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="flex gap-4 pb-6 border-b border-border">
      {/* Avatar */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-teal-600 flex items-center justify-center">
        <span className="text-white font-bold text-lg">{review.author.charAt(0).toUpperCase()}</span>
      </div>

      {/* Review Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-semibold text-foreground">{review.author}</h4>
            <p className="text-sm text-muted-foreground">{review.date}</p>
          </div>
          <RatingStars rating={review.rating} size={16} />
        </div>
        <p className="text-muted-foreground">{review.comment}</p>
      </div>
    </div>
  )
}
