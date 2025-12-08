import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export function RuntimeCard() {
  const [autoActivate, setAutoActivate] = useState(false)

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Thời gian khuyến mãi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from-date" className="text-sm font-medium">
              Từ ngày
            </Label>
            <Input id="from-date" type="datetime-local" className="w-full bg-background border-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-date" className="text-sm font-medium">
              Đến ngày
            </Label>
            <Input id="to-date" type="datetime-local" className="w-full bg-background border-input" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <Label htmlFor="auto-activate" className="text-sm font-medium cursor-pointer">
            Tự động kích hoạt
          </Label>
          <Switch id="auto-activate" checked={autoActivate} onCheckedChange={setAutoActivate} />
        </div>
      </CardContent>
    </Card>
  )
}
