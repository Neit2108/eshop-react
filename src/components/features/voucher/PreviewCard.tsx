import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PreviewCard() {
  return (
    <Card className="border border-border sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Banner Placeholder */}
        <div className="w-full aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
          <div className="text-center">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-sm text-muted-foreground">Banner preview</p>
          </div>
        </div>

        {/* Preview Content */}
        <div className="space-y-3">
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">-20% OFF</Badge>
          <h3 className="text-lg font-semibold text-foreground">Summer Sales 2025</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            Get ready for an amazing summer with our exclusive discounts on all products. Don't miss out on this limited
            time offer!
          </p>

          <div className="bg-muted rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Original:</span>
              <span className="font-medium">$100.00</span>
            </div>
            <div className="flex justify-between text-base font-bold text-accent">
              <span>Sale price:</span>
              <span>$80.00</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-2">
            <p>⏰ Valid: Nov 26 - Dec 10, 2025</p>
            <p>👥 For all users</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
