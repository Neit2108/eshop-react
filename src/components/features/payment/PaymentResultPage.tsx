import { useSearchParams } from "react-router-dom";
import PaymentStatusCard from "./PaymentStatusCard";

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success") === "true";
  const message = searchParams.get("message") || "";
  const txnRef = searchParams.get("txnRef") || "";
  const amount = searchParams.get("amount") || "";

  return (
    <>
      {/* Main Content */}
      <div className="flex flex-1 items-center min-h-screen justify-center px-4 py-12">
        <PaymentStatusCard
          success={success}
          message={message}
          txnRef={txnRef}
          amount={amount}
        />
      </div>
    </>
  );
}
