import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import RatingStars from "./RatingStars"

interface AddReviewFormProps {
  onSubmit: (review: { author: string; comment: string; rating: number }) => void
}

export default function AddReviewForm({ onSubmit }: AddReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [author, setAuthor] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim() && rating > 0 && author.trim()) {
      onSubmit({ author, comment, rating })
      setRating(0)
      setComment("")
      setAuthor("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border pt-8">
      <h4 className="text-lg font-bold text-foreground mb-6">Add a review</h4>

      {/* Author Name */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
        />
      </div>

      {/* Review Text */}
      <div className="mb-6">
        <textarea
          placeholder="Write a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] resize-none"
        />
      </div>

      {/* Rating */}
      <div className="mb-6">
        <RatingStars rating={rating} size={24} interactive onRatingChange={setRating} />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!comment.trim() || rating === 0 || !author.trim()}
        className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        SUBMIT REVIEW
      </Button>
    </form>
  )
}
