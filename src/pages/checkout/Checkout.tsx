import { useState } from "react";
import { RecipientSection } from "@/components/features/checkout/RecipientSection";
import { OrderSummary } from "@/components/features/checkout/OrderSummary";
import { useOrders } from "@/hooks/useOrders";
import { toast } from "sonner";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCart } from "@/hooks/useCart";
import { CartEmptyState } from "@/components/features/cart/CartEmptyState";
import type { Voucher } from "@/components/features/checkout/VoucherModal";
import { PaymentMethodModal } from "@/components/features/orders/PaymentMethodModal";
import { apiService } from "@/services/apiService";

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<
    "COD" | "BANK_TRANSFER" | "E_WALLET" | "CREDIT_CARD"
  >("COD");
  const { items, totalAmount } = useCart();
  const { createOrder } = useOrders();

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return <CartEmptyState />;
  }

  const shippingFee = 9.99;

  const handleSelectPaymentMethod = async () => {
    // mở modal chọn phương thức thanh toán hoặc chuyển hướng đến trang thanh toán
    setIsPaymentMethodOpen(true);
  };

  const handlePaymentSelect = async (
    method: "COD" | "BANK_TRANSFER" | "CREDIT_CARD" | "E_WALLET",
  ) => {
    setSelectedPayment(method);
    setIsPaymentMethodOpen(false);

    // Tiếp tục xử lý đặt hàng sau khi chọn phương thức thanh toán
    await handlePlaceOrder();
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    try {
      const resultAction = await createOrder({
        shippingMethod: "STANDARD",
        shippingAddress: selectedAddress.address,
        recipientName: selectedAddress.name,
        recipientPhone: selectedAddress.phone,
        paymentMethod: selectedPayment,
        shippingFee: shippingFee,
        discount: 0,
        voucherCode: selectedVoucher ? selectedVoucher.code : undefined,
      });

      const orderRes = unwrapResult(resultAction);

      if (!orderRes) {
        toast.error("Lỗi khi tạo đơn hàng");
        return;
      }

      if (
        orderRes.paymentMethod === "BANK_TRANSFER" ||
        orderRes.paymentMethod === "E_WALLET" ||
        orderRes.paymentMethod === "CREDIT_CARD"
      ) {
        // Chuyển hướng đến trang thanh toán hoặc xử lý thanh toán tại đây
        const createUrlResult = await apiService.post<string>(
          `/payments/vnpay/create`,
          {
            orderId: orderRes.id,
            amount: orderRes.totalAmount,
            orderInfo: `pay`,
            locale: "vn",
          },
        );

        let countdown = 5;
        const interval = setInterval(() => {
          toast.success(
            `Đang chuyển hướng đến trang thanh toán VNPAY trong ${countdown} giây...`,
          );
          countdown--;
          if (countdown < 0) {
            clearInterval(interval);
            window.location.href = createUrlResult.data;
          }
        }, 1000);
      } else if (orderRes.paymentMethod === "COD") {
        toast.success("Đơn hàng đã được tạo thành công!");
      }
    } catch (err) {
      console.error("Failed to create order:", err);
      toast.error("Lỗi khi tạo đơn hàng");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Main Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Recipient Information */}
        <div className="lg:col-span-2">
          <RecipientSection onAddressSelect={setSelectedAddress} />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={items}
            totalAmount={totalAmount}
            shippingFee={shippingFee}
            onPlaceOrder={handleSelectPaymentMethod}
            onVoucherSelect={setSelectedVoucher}
            vouchers={null}
          />
        </div>
      </div>

      <PaymentMethodModal
        open={isPaymentMethodOpen}
        onOpenChange={setIsPaymentMethodOpen}
        onSelect={handlePaymentSelect}
      />
    </div>
  );
}
