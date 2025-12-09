import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, X } from "lucide-react"

const CANCEL_REASONS = [
  { id: "change_mind", label: "Thay đổi ý định" },
  { id: "found_cheaper", label: "Tìm thấy giá rẻ hơn" },
  { id: "product_unavailable", label: "Sản phẩm không còn hàng" },
  { id: "long_delivery", label: "Thời gian giao hàng quá lâu" },
  { id: "other", label: "Lý do khác" },
]

interface CancelOrderDialogProps {
  isOpen: boolean
  orderId: string | null
  orderNumber?: string
  onConfirm: (orderId: string, reason: string) => void | Promise<void>
  onOpenChange: (open: boolean) => void
}

export function CancelOrderDialog({
  isOpen,
  orderId,
  orderNumber,
  onConfirm,
  onOpenChange,
}: CancelOrderDialogProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form khi dialog mở
  useEffect(() => {
    if (isOpen) {
      setSelectedReason("")
      setCustomReason("")
    }
  }, [isOpen])

  const handleReasonSubmit = async () => {
    if (!selectedReason) {
      alert("Vui lòng chọn lý do hủy")
      return
    }

    const reason = selectedReason === "other" ? customReason : selectedReason

    if (selectedReason === "other" && !customReason.trim()) {
      alert("Vui lòng nhập lý do hủy")
      return
    }

    if (!orderId) return

    try {
      setIsSubmitting(true)
      await onConfirm(orderId, reason)
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <div className="flex justify-between items-start">
          <AlertDialogHeader>
            <AlertDialogTitle>Lý do hủy đơn hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Vui lòng cho chúng tôi biết lý do bạn muốn hủy đơn hàng {orderNumber}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <button
            onClick={() => onOpenChange(false)}
            className="mt-1"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>

        <div className="space-y-4 py-4">
          <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
            <div className="space-y-3">
              {CANCEL_REASONS.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.id} id={reason.id} />
                  <Label
                    htmlFor={reason.id}
                    className="font-normal cursor-pointer flex-1"
                  >
                    {reason.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {selectedReason === "other" && (
            <div className="pt-2">
              <Textarea
                placeholder="Nhập lý do của bạn..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button
            className="bg-destructive hover:bg-destructive/90"
            onClick={handleReasonSubmit}
            disabled={isSubmitting || !selectedReason}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang hủy...
              </>
            ) : (
              "Hủy đơn hàng"
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

