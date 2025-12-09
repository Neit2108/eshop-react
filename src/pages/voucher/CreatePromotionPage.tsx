import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BasicInfoCard } from "@/components/features/voucher/BasicInfoCard"
import { ConditionsCard } from "@/components/features/voucher/ConditionsCard"
import { DiscountConfigCard } from "@/components/features/voucher/DiscountConfigCard"
import { RuntimeCard } from "@/components/features/voucher/RuntimeCard"
import { PreviewCard } from "@/components/features/voucher/PreviewCard"
import { useAuth } from "@/hooks/useAuth"
import { useShop } from "@/hooks/useShop"
import { apiService } from "@/services/apiService"
import type { Voucher } from "@/types/voucher.types"
import { API_ENDPOINTS } from "@/lib/api"
import { toast } from "sonner"

export function CreatePromotionForm() {
  // Authentication and shop
  const { hasRoles } = useAuth()
  const { shop, fetchShopByUserId } = useShop()

  // Check user role
  const isAdmin = hasRoles("SYSTEM_ADMIN")
  const isSeller = hasRoles("SELLER")

  // Basic Info
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [voucherType, setVoucherType] = useState("PERCENTAGE")

  // Discount Config
  const [discountValue, setDiscountValue] = useState(0)
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(undefined)

  // Conditions
  const [scope, setScope] = useState<string>(isSeller ? "SHOP" : "PLATFORM")
  const [minOrderValue, setMinOrderValue] = useState<number | undefined>(undefined)
  const [totalLimit, setTotalLimit] = useState<number | undefined>(undefined)
  const [limitPerUser, setLimitPerUser] = useState<number | undefined>(undefined)

  // Runtime
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Confirm
  const [confirmed, setConfirmed] = useState(false)

  // Fetch shop when component mounts (for SELLER users)
  useEffect(() => {
    if (isSeller) {
      fetchShopByUserId()
    }
  }, [isSeller, fetchShopByUserId])

  // Set default scope based on user role
  useEffect(() => {
    if (isSeller) {
      setScope("SHOP")
    } else if (isAdmin) {
      setScope("PLATFORM")
    }
  }, [isSeller, isAdmin])

  const handleCreateVoucher = async () => {
    // Build payload
    const payload = {
      code,
      name,
      description: description || undefined,
      type: voucherType,
      discountValue,
      maxDiscount,
      minOrderValue,
      scope: scope as "SHOP" | "PLATFORM",
      shopId: isSeller && shop?.id ? shop.id : undefined,
      totalLimit,
      limitPerUser,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
    }

    console.log("Shop data:", shop)
    console.log("Is Seller:", isSeller)
    console.log("Voucher Payload:", payload)
    
    const response = await apiService.post<Voucher>(API_ENDPOINTS.VOUCHERS.CREATE, payload)
    if(response.success){
      toast.success("Khuyến mãi đã được tạo thành công")
    } else {
      toast.error(response.message)
    }
  }

  // Validation
  const isFormValid = () => {
    return code && name && voucherType && discountValue > 0 && startDate && endDate && confirmed
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Main Content - Left Column (2/3) */}
      <div className="col-span-2 space-y-6">
        {/* Card 1: Basic Information */}
        <BasicInfoCard
          code={code}
          setCode={setCode}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          voucherType={voucherType}
          setVoucherType={setVoucherType}
        />

        {/* Card 2: Conditions Apply */}
        <ConditionsCard
          scope={scope}
          setScope={setScope}
          minOrderValue={minOrderValue}
          setMinOrderValue={setMinOrderValue}
          totalLimit={totalLimit}
          setTotalLimit={setTotalLimit}
          limitPerUser={limitPerUser}
          setLimitPerUser={setLimitPerUser}
          isAdmin={isAdmin}
        />

        {/* Card 3: Discount Configuration */}
        <DiscountConfigCard
          voucherType={voucherType}
          discountValue={discountValue}
          setDiscountValue={setDiscountValue}
          maxDiscount={maxDiscount}
          setMaxDiscount={setMaxDiscount}
        />

        {/* Card 4: Program Runtime */}
        <RuntimeCard
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {/* Card 5: Confirm */}
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
              disabled={!isFormValid()}
              onClick={handleCreateVoucher}
            >
              Tạo khuyến mãi
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Preview - Right Column (1/3) */}
      <div className="col-span-1">
        <PreviewCard
          code={code}
          name={name}
          description={description}
          voucherType={voucherType}
          discountValue={discountValue}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  )
}
