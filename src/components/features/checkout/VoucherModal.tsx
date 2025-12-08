import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { Voucher } from "@/types/voucher.types"

interface VoucherModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vouchers: Voucher[]
  onSelect: (voucher: Voucher) => void
}

export function VoucherModal({ open, onOpenChange, vouchers, onSelect }: VoucherModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter and categorize vouchers
  const { discountVouchers, freeShippingVouchers } = useMemo(() => {
    const filtered = vouchers.filter(
      (v) =>
        v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return {
      discountVouchers: filtered.filter((v) => v.type === "FIXED_AMOUNT" || v.type === "PERCENTAGE"),
      freeShippingVouchers: filtered.filter((v) => v.type === "FREE_SHIPPING"),
    }
  }, [vouchers, searchQuery])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chọn mã giảm giá</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <Input
            placeholder="Tìm kiếm theo mã hoặc tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <ScrollArea className="h-96 pr-4">
          <Accordion type="single" collapsible defaultValue="discount">
            {/* Discount Vouchers Section */}
            <AccordionItem value="discount">
              <AccordionTrigger>
                <span className="text-base font-semibold">Mã giảm giá</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {discountVouchers.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">Không tìm thấy mã giảm giá</div>
                  ) : (
                    discountVouchers.map((voucher) => (
                      <VoucherCard key={voucher.id} voucher={voucher} onSelect={onSelect} />
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Free Shipping Vouchers Section */}
            <AccordionItem value="shipping">
              <AccordionTrigger>
                <span className="text-base font-semibold">Mã miễn phí vận chuyển</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {freeShippingVouchers.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">Không tìm thấy mã miễn phí vận chuyển</div>
                  ) : (
                    freeShippingVouchers.map((voucher) => (
                      <VoucherCard key={voucher.id} voucher={voucher} onSelect={onSelect} />
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

interface VoucherCardProps {
  voucher: Voucher
  onSelect: (voucher: Voucher) => void
}

function VoucherCard({ voucher, onSelect }: VoucherCardProps) {
  const isExpired = new Date(voucher.endDate) < new Date()
  const isInactive = voucher.status !== "ACTIVE"
  const isDisabled = isExpired || isInactive

  const startDate = new Date(voucher.startDate).toLocaleDateString()
  const endDate = new Date(voucher.endDate).toLocaleDateString()

  const getDiscountDisplay = () => {
    if (voucher.type === "PERCENTAGE") {
      return `${voucher.discountValue}% (max: ${voucher.maxDiscount})`
    } else if (voucher.type === "FIXED_AMOUNT") {
      return `$${voucher.discountValue}`
    }
    return "Free Shipping"
  }

  const getTypeColor = () => {
    switch (voucher.type) {
      case "PERCENTAGE":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "FIXED_AMOUNT":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "FREE_SHIPPING":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card
      onClick={() => !isDisabled && onSelect(voucher)}
      className={`p-4 cursor-pointer transition-all ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md hover:border-primary"
      }`}
    >
      <div className="space-y-2">
        {/* Code and Status */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-sm">{voucher.code}</h3>
            <p className="text-xs text-muted-foreground">{voucher.name}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={getTypeColor()}>
              {voucher.type === "PERCENTAGE"
                ? "- %"
                : voucher.type === "FIXED_AMOUNT"
                  ? "- VNĐ"
                  : "Miễn phí vận chuyển"}
            </Badge>
            {isExpired && (
              <Badge variant="destructive" className="text-xs">
                Hết hạn
              </Badge>
            )}
            {isInactive && !isExpired && (
              <Badge variant="secondary" className="text-xs">
                Không hoạt động
              </Badge>
            )}
          </div>
        </div>

        {/* Discount Value */}
        <div className="text-sm font-semibold text-primary">{getDiscountDisplay()}</div>

        {/* Description */}
        {voucher.description && <p className="text-xs text-muted-foreground">{voucher.description}</p>}

        {/* Minimum Order Value */}
        <div className="text-xs text-muted-foreground">Giá trị đơn hàng tối thiểu: {voucher.minOrderValue} VNĐ</div>

        {/* Valid Date Range */}
        <div className="text-xs text-muted-foreground">
          Thời gian hiệu lực: {startDate} - {endDate}
        </div>

        {/* Usage Info */}
        <div className="text-xs text-muted-foreground">
          Đã sử dụng: {voucher.usedCount}/{voucher.totalLimit}
        </div>
      </div>
    </Card>
  )
}
