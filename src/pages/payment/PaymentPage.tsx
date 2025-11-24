import { Suspense } from "react"
import PaymentResultPage from "@/components/features/payment/PaymentResultPage"
import Loading from "@/components/common/Loading"

const metadata = {
  title: "Payment Result",
  description: "Your payment transaction result",
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentResultPage />
    </Suspense>
  )
}
