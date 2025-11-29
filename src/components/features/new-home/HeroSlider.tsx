import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  id: number
  title: string
  subtitle: string
  image: string
  cta: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Optimal Organization",
    subtitle: "Meets Exquisite Design",
    image: "/luxury-interior-design-organization.jpg",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Transform Your Space",
    subtitle: "With Innovative Solutions",
    image: "/modern-home-decor-showcase.jpg",
    cta: "Explore",
  },
  {
    id: 3,
    title: "Elevate Your Lifestyle",
    subtitle: "Premium Quality Products",
    image: "/luxury-product-display.png",
    cta: "Discover",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white space-y-6 px-4">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-balance">{slides[current].title}</h1>
          <p className="text-xl md:text-2xl text-balance">{slides[current].subtitle}</p>
          <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            {slides[current].cta}
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white transition-colors p-2 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white transition-colors p-2 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? "bg-white w-8" : "bg-white/50 w-2 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
