import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Link } from "react-router-dom"

interface SuccessInfoProps {
  txnRef?: string
  amount?: string
}

export default function SuccessInfo({ txnRef, amount }: SuccessInfoProps) {
  // Format amount if provided
  const formattedAmount = formatCurrency(Number(amount));

  return (
    <>
      {/* Transaction Details */}
      <div className="bg-secondary/30 rounded-lg p-4 mb-6 space-y-3 text-left">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Mã đơn hàng:</span>
          <span className="font-mono font-semibold text-foreground">{txnRef || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Số tiền:</span>
          <span className="font-semibold text-foreground">{formattedAmount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Link to="/" className="w-full">
          <Button className="w-full" size="lg">
            Về trang chủ
          </Button>
        </Link>
        <Link to="/orders" className="w-full">
          <Button variant="outline" className="w-full bg-transparent" size="lg">
            Xem đơn hàng
          </Button>
        </Link>
      </div>
    </>
  )
}
