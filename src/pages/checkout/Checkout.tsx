import { useState } from "react"
import { RecipientSection } from "@/components/features/checkout/RecipientSection"
import { OrderSummary } from "@/components/features/checkout/OrderSummary"

const MOCK_ORDER_ITEMS = [
  {
    id: "1",
    name: "Premium Leather Handbag",
    image: "/leather-handbag.png",
    quantity: 1,
    price: 129.99,
  },
  {
    id: "2",
    name: "Silk Scarf",
    image: "/flowing-silk-scarf.png",
    quantity: 2,
    price: 49.99,
  },
  {
    id: "3",
    name: "Designer Sunglasses",
    image: "/designer-sunglasses.png",
    quantity: 1,
    price: 199.99,
  },
]

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState<any>(null)

  const subtotal = MOCK_ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 9.99

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address")
      return
    }
    alert(`Order placed! Shipping to: ${selectedAddress.name}, ${selectedAddress.address}`)
  }

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
              items={MOCK_ORDER_ITEMS}
              subtotal={subtotal}
              shippingFee={shippingFee}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
  )
}
