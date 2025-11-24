import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function FailureInfo() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground mb-2">
        Please review your payment details and try again, or contact support for assistance.
      </p>
      <Link to="/checkout" className="w-full">
        <Button className="w-full" size="lg">
          Try Again
        </Button>
      </Link>
      <Link to="/" className="w-full">
        <Button variant="outline" className="w-full bg-transparent" size="lg">
          Return to Home
        </Button>
      </Link>
    </div>
  )
}
