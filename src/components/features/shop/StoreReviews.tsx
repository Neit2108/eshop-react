import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare } from "lucide-react"

interface Review {
  id: number
  author: string
  avatar: string
  initials: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
  verified: boolean
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "/diverse-group-avatars.png",
    initials: "SJ",
    rating: 5,
    date: "2024-11-28",
    title: "Excellent quality and fast shipping!",
    content:
      "I ordered the wireless headphones and was impressed with the quality and the fast shipping. The product arrived in perfect condition and works exactly as described. Highly recommended!",
    helpful: 248,
    verified: true,
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "/pandora-ocean-scene.png",
    initials: "MC",
    rating: 4,
    date: "2024-11-26",
    title: "Great value for money",
    content:
      "Good product overall. Takes a bit to setup but once it's configured, it works smoothly. Customer service was very helpful when I had questions.",
    helpful: 156,
    verified: true,
  },
  {
    id: 3,
    author: "Emma Davis",
    avatar: "/diverse-group-futuristic-setting.png",
    initials: "ED",
    rating: 5,
    date: "2024-11-22",
    title: "Best purchase I've made this year!",
    content:
      "This store has amazing products and exceptional customer service. Every item I've purchased has been exactly as described. Will definitely be shopping here again!",
    helpful: 412,
    verified: true,
  },
  {
    id: 4,
    author: "James Wilson",
    avatar: "/diverse-group-futuristic-avatars.png",
    initials: "JW",
    rating: 4,
    date: "2024-11-20",
    title: "Good but could be better",
    content:
      "The product itself is good quality, though the packaging could use some improvement. Delivery was faster than expected which was nice.",
    helpful: 89,
    verified: true,
  },
]

export function StoreReviews() {
  const [expandedReview, setExpandedReview] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Đánh giá khách hàng</h2>
        <p className="text-muted-foreground text-sm mt-1">Xem đánh giá khách hàng về cửa hàng</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={review.id}>
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                    <AvatarFallback>{review.initials}</AvatarFallback>
                  </Avatar>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{review.author}</p>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              Đã xác minh
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex gap-0.5 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Title and Content */}
                    <h4 className="font-semibold text-sm mb-2">{review.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.content}</p>

                    {/* Helpful Button */}
                    <Button variant="ghost" size="sm" className="text-xs gap-1 h-auto p-0 hover:text-primary">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Hữu ích ({review.helpful})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {index < reviews.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline">Xem thêm đánh giá</Button>
      </div>
    </div>
  )
}
