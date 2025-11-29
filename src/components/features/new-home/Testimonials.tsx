import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  text: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Interior Designer",
    image: "/professional-woman-avatar.png",
    text: "The quality and design of these products have completely transformed my clients' spaces. I highly recommend them!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    image: "/professional-man-avatar.png",
    text: "Exceptional customer service and beautiful products. My home has never looked better.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Design Blogger",
    image: "/professional-woman-with-glasses-avatar.jpg",
    text: "Every piece is a work of art. The attention to detail is remarkable and the value is unbeatable.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground">Join thousands of satisfied customers worldwide</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-none bg-background shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">
                        ★
                      </span>
                    ))}
                </div>

                {/* Text */}
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
