import { CartItemsList } from "@/components/features/cart/CartItemsList"
import { CartSummary } from "@/components/features/cart/CartSummary"
import { CartEmptyState } from "@/components/features/cart/CartEmptyState"
import { useCart } from "@/hooks/useCart"
import { useEffect } from "react"
import Loading from "@/components/common/Loading"
import { useOrders } from "@/hooks/useOrders"

const SHIPPING_FEE = 9.99

export default function CartPage() {
  const { cartId, items, itemsCount, totalAmount, isLoading, error, fetchCart, updateItemInCart, deleteItemFromCart } = useCart()
  
  useEffect(() => {
    fetchCart()
  }, [])

  // Calculate totals
  const totalItems = itemsCount
  const subtotal = totalAmount
  const total = subtotal + SHIPPING_FEE

  // Handle quantity change
  const handleQuantityChange = (id: string, quantity: number) => {
    if (cartId && quantity > 0) {
      updateItemInCart(cartId, id, quantity)
    }
  }

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    if (cartId) {
      deleteItemFromCart(cartId, id)
    }
  }

  const isEmpty = items.length === 0

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <CartHeader /> */}

        {isEmpty ? (
          <CartEmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Sản phẩm trong giỏ hàng ({totalItems})</h2>
                <CartItemsList items={items} onQuantityChange={handleQuantityChange} onRemove={handleRemoveItem} />
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="lg:col-span-1">
              <CartSummary totalItems={totalItems} subtotal={subtotal} shippingFee={SHIPPING_FEE} total={total} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
