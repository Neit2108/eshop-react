import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, ChevronLeft, ChevronRight, ShoppingBag, Trash2 } from "lucide-react"
import { useOrders } from "@/hooks/useOrders"
import type { Order } from "@/types/order.types"
import { OrderDetailDialog } from "@/components/features/orders/OrderDetailDialog"
import { CancelOrderDialog } from "@/components/features/orders/CancelOrderDialog"
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils"
import { orderStatusMap, paymentStatusMap } from "@/types/order.types"
import Loading from "@/components/common/Loading"
import { toast } from "sonner"

export function MyOrdersView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null)
  const [cancelOrderNumber, setCancelOrderNumber] = useState<string>("")
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  const { orders, isLoading, userPagination, getMyOrders, cancelOrder } = useOrders()

  // Fetch orders with current filters
  useEffect(() => {
    getMyOrders(currentPage, 10)
  }, [currentPage, getMyOrders])

  // Track when data has been loaded at least once
  useEffect(() => {
    if (!isLoading && !hasLoaded) {
      setHasLoaded(true)
    }
  }, [isLoading, hasLoaded])

  const handleViewDetails = (order: Order) => {
    setSelectedOrderId(order.id)
    setIsModalOpen(true)
  }

  const handleCancelOrder = (order: Order) => {
    // Check if order can be cancelled
    if (order.status !== "PENDING") {
      toast.error("Đơn hàng này hiện không thể hủy.")
      return
    }
    
    setCancelOrderId(order.id)
    setCancelOrderNumber(order.orderNumber)
    setIsCancelDialogOpen(true)
  }

  const handleConfirmCancelOrder = async (orderId: string, reason: string) => {
    try {
      await cancelOrder(orderId, reason)
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error)
    }
  }

  const handleConfirmOrder = (orderId: string) => {
    setIsModalOpen(false)
    console.log(`[MyOrdersView] Order ${orderId} confirmed`)
  }

  const handlePrevPage = useCallback(() => {
    if (userPagination.hasPrev) {
      setCurrentPage((prev) => prev - 1)
    }
  }, [userPagination.hasPrev])

  const handleNextPage = useCallback(() => {
    if (userPagination.hasNext) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [userPagination.hasNext])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  // Only show full page loading on initial load
  if (isLoading && !hasLoaded) {
    return <Loading />
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Đơn hàng của tôi</CardTitle>
          <CardDescription>Xem và quản lý lịch sử đơn hàng của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo Mã đơn hàng hoặc Sản phẩm..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Results Info */}
            {orders.length > 0 && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-blue-600" />
                  <span className="text-muted-foreground">
                    Hiển thị <span className="font-semibold text-foreground">{orders.length}</span> trên{" "}
                    <span className="font-semibold text-foreground">{userPagination.total}</span> đơn hàng
                  </span>
                </div>
                {userPagination.totalPages > 1 && (
                  <span className="text-xs text-muted-foreground">
                    Trang {userPagination.currentPage}/{userPagination.totalPages}
                  </span>
                )}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-6 w-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                  <p className="text-xs text-muted-foreground">Đang cập nhật...</p>
                </div>
              </div>
            )}

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Mã đơn hàng</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Sản phẩm</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Ngày tạo</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Trạng thái giao</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Trạng thái thanh toán</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Tổng cộng</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-foreground font-medium">{order.orderNumber}</td>
                        <td className="px-4 py-3 text-foreground">
                          <div className="max-w-xs truncate">
                            {order.items.length > 0
                              ? `${order.items[0].productName}${order.items.length > 1 ? ` (+${order.items.length - 1})` : ""}`
                              : "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {formatDate(new Date(order.createdAt))}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`capitalize ${getStatusColor(order.status)}`}>
                            {orderStatusMap[order.status]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            className={`capitalize ${
                              order.paymentStatus === "PAID"
                                ? "bg-green-100 text-green-800"
                                : order.paymentStatus === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {paymentStatusMap[order.paymentStatus]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">
                          {formatCurrency(order.totalAmount, order.currency)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleViewDetails(order)}
                              title="Xem chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() => handleCancelOrder(order)}
                              disabled={order.status !== "PENDING"}
                              title={order.status !== "PENDING" ? "Đơn hàng này không thể hủy" : "Hủy đơn hàng"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        {searchQuery ? "Không tìm thấy đơn hàng phù hợp." : "Chưa có đơn hàng nào."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {userPagination.totalPages > 1 && orders.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-xs text-muted-foreground">
                  Trang <span className="font-semibold text-foreground">{userPagination.currentPage}</span> của{" "}
                  <span className="font-semibold text-foreground">{userPagination.totalPages}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={!userPagination.hasPrev}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Trước</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={!userPagination.hasNext}
                    className="gap-1"
                  >
                    <span className="hidden sm:inline">Tiếp theo</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <OrderDetailDialog
        orderId={selectedOrderId}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirmOrder={handleConfirmOrder}
        showAdminActions={false}
      />

      {/* Cancel Order Dialog */}
      <CancelOrderDialog
        isOpen={isCancelDialogOpen}
        orderId={cancelOrderId}
        orderNumber={cancelOrderNumber}
        onConfirm={handleConfirmCancelOrder}
        onOpenChange={setIsCancelDialogOpen}
      />
    </>
  )
}
