import { useState } from "react"
import ReviewItem from "../../reviews/ReviewItem"
import AddReviewForm from "../../reviews/AddReviewForm"
import { mockReviews } from "@/pages/product/mock-data"

interface ReviewsTabProps {
  productId: number
}

export default function ReviewsTab({ productId }: ReviewsTabProps) {
  const [reviews, setReviews] = useState(mockReviews)

  const handleAddReview = (newReview: {
    author: string
    comment: string
    rating: number
  }) => {
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split("T")[0],
      avatar: "/diverse-user-avatars.png",
    }
    setReviews([...reviews, review])
  }

  return (
    <div className="py-6">
      <h3 className="text-xl font-bold text-foreground mb-6">Customer questions & answers</h3>

      {/* Reviews List */}
      <div className="space-y-6 mb-8">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      {/* Add Review Form */}
      <AddReviewForm onSubmit={handleAddReview} />
    </div>
  )
}
