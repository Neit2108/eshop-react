import { useState } from "react";
import { RecipientSection } from "@/components/features/checkout/RecipientSection";
import { OrderSummary } from "@/components/features/checkout/OrderSummary";
import { useOrders } from "@/hooks/useOrders";
import { toast } from "sonner";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCart } from "@/hooks/useCart";
import { CartEmptyState } from "@/components/features/cart/CartEmptyState";

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const { items, totalAmount } = useCart();
  const { createOrder } = useOrders();

  const isEmpty = items.length === 0;

  if(isEmpty){
    return <CartEmptyState />;
  }

  const shippingFee = 9.99;

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
        paymentMethod: "COD",
        shippingFee: shippingFee,
        discount: 0,
      });

      const orderRes = unwrapResult(resultAction);

      if(orderRes.error){
        console.log("Order creation error:", orderRes.error);
        toast.error(orderRes.error);
        return;
      }

      toast.success(orderRes.message || "Đặt hàng thành công!");
      console.log("Created order:", orderRes);

    } catch (err: any) {
      console.error("Failed to create order:", err);
      toast.error(err || "Lỗi khi tạo đơn hàng");
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
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
}
