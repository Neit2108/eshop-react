import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="bg-primary/10 rounded-lg p-8 md:p-12 text-center border border-primary/20">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary/20 p-4 rounded-full">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for exclusive deals, new collections, and design inspiration.
          </p>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
              {subscribed ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>

          {/* Success Message */}
          {subscribed && <p className="text-primary mt-4 text-sm font-medium">Thank you for subscribing!</p>}
        </div>
      </div>
    </section>
  )
}
