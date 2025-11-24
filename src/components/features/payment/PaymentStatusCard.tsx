import { Card } from "@/components/ui/card"
import SuccessInfo from "./SuccessInfo"
import FailureInfo from "./FailureInfo"
import IconStatus from "./IconStatus"

interface PaymentStatusCardProps {
  success: boolean
  message: string
  txnRef?: string
  amount?: string
}

export default function PaymentStatusCard({ success, message, txnRef, amount }: PaymentStatusCardProps) {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <div className="p-8 text-center">
        {/* Status Icon */}
        <div className="mb-6 flex justify-center">
          <IconStatus success={success} />
        </div>

        {/* Status Message */}
        <h2 className="text-2xl font-bold mb-2 text-foreground">{success ? "Thanh toán thành công" : "Thanh toán thất bại"}</h2>
        <p className="text-muted-foreground mb-6">{message}</p>

        {/* Status-specific content */}
        {success ? <SuccessInfo txnRef={txnRef} amount={amount} /> : <FailureInfo />}
      </div>
    </Card>
  )
}
