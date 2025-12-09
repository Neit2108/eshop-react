import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RuntimeCardProps {
  startDate: string
  setStartDate: (value: string) => void
  endDate: string
  setEndDate: (value: string) => void
}

export function RuntimeCard({ startDate, setStartDate, endDate, setEndDate }: RuntimeCardProps) {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Thời gian khuyến mãi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from-date" className="text-sm font-medium">
              Từ ngày <span className="text-red-500">*</span>
            </Label>
            <Input
              id="from-date"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-background border-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-date" className="text-sm font-medium">
              Đến ngày <span className="text-red-500">*</span>
            </Label>
            <Input
              id="to-date"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-background border-input"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
