import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BasicInfoCard } from "@/components/features/voucher/BasicInfoCard"
import { ConditionsCard } from "@/components/features/voucher/ConditionsCard"
import { DiscountConfigCard } from "@/components/features/voucher/DiscountConfigCard"
import { RuntimeCard } from "@/components/features/voucher/RuntimeCard"
import { PreviewCard } from "@/components/features/voucher/PreviewCard"

export function CreatePromotionForm() {
  const [promotionType, setPromotionType] = useState<string>("percent")
  const [applicationType, setApplicationType] = useState<string>("whole-shop")
  const [confirmed, setConfirmed] = useState(false)

  return (
      <div className="grid grid-cols-3 gap-6">
        {/* Main Content - Left Column (2/3) */}
        <div className="col-span-2 space-y-6">
          {/* Card 1: Basic Information */}
          <BasicInfoCard promotionType={promotionType} setPromotionType={setPromotionType} />

          {/* Card 2: Conditions Apply */}
          <ConditionsCard applicationType={applicationType} setApplicationType={setApplicationType} />

          {/* Card 3: Discount Configuration */}
          <DiscountConfigCard promotionType={promotionType} />

          {/* Card 4: Program Runtime */}
          <RuntimeCard />

          {/* Card 6: Confirm */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Xác nhận</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="confirm"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                  className="w-5 h-5"
                />
                <Label htmlFor="confirm" className="text-base font-medium cursor-pointer">
                  Tôi xác nhận thông tin khuyến mãi ở trên là chính xác và đầy đủ.
                </Label>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
                disabled={!confirmed}
              >
                Tạo khuyến mãi
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview - Right Column (1/3) */}
        <div className="col-span-1">
          <PreviewCard />
        </div>
      </div>
  )
}
