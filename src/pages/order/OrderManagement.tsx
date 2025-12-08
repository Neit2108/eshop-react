import type React from "react"
import { useState, useEffect } from "react"
import { Search, MoreHorizontal, Download, Eye, Printer, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency, formatPrice } from "@/lib/utils"
import { OrderDetailDialog } from "@/components/features/orders/OrderDetailDialog"
import { useOrders } from "@/hooks/useOrders"
import { useShop } from "@/hooks/useShop"
import { useAuth } from "@/hooks/useAuth"
import type { Order } from "@/types/order.types"
import { orderStatusMap, paymentStatusMap } from "@/types/order.types"
import Loading from "@/components/common/Loading"

export function OrderManagement() {
  const { hasRoles } = useAuth()
  const { 
    allOrders, 
    isLoading, 
    error, 
    getAllOrders,
    pagination,
  } = useOrders()
  const { shop, fetchShopByUserId } = useShop()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Determine if user is a seller
  const isSeller = hasRoles("SELLER")

  // Load data based on user role
  useEffect(() => {
    if (isSeller) {
      // For sellers, fetch their shop first
      fetchShopByUserId()
    }
  }, [isSeller, fetchShopByUserId])

  // Load orders with shopId for sellers
  useEffect(() => {
    if (isSeller && shop?.id) {
      getAllOrders(1, pagination.limit, shop.id)
    } else if (!isSeller) {
      getAllOrders(1, pagination.limit)
    }
  }, [shop?.id, isSeller, getAllOrders, pagination.limit])

  // Choose which orders to display - always use allOrders (with or without shopId filter)
  const displayOrders = allOrders

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    getAllOrders(1, pagination.limit)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status)
  }

  const handleConfirmOrder = (orderId: string) => {
    setIsDetailDialogOpen(false)
    console.log(`[Order Management] Order ${orderId} confirmed`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800"
      case "SHIPPING":
        return "bg-blue-100 text-blue-800"
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800"
      case "PENDING":
      case "CONFIRMED":
        return "bg-slate-100 text-slate-800"
      case "CANCELLED":
      case "REFUNDED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-50 text-green-700"
      case "PENDING":
        return "bg-orange-50 text-orange-700"
      case "FAILED":
      case "REFUNDED":
        return "bg-red-50 text-red-700"
      default:
        return "bg-slate-50 text-slate-700"
    }
  }

  const stats = [
    {
      label: "Tổng đơn hàng",
      value: pagination.total,
      trend: "+24%",
      trendColor: "text-green-600",
    },
    {
      label: "Chờ xác nhận",
      value: displayOrders.filter((o) => o.status === "PENDING").length,
      trend: "-5%",
      trendColor: "text-orange-600",
    },
    {
      label: "Đã giao",
      value: displayOrders.filter((o) => o.status === "DELIVERED").length,
      trend: "+18%",
      trendColor: "text-green-600",
    },
    {
      label: "Doanh thu",
      value: `${formatCurrency(displayOrders
        .filter((o) => o.paymentStatus === "PAID")
        .reduce((sum, o) => sum + o.totalAmount, 0))}`,
      trend: "+12%",
      trendColor: "text-green-600",
    },
  ]

  // Chỉ show loading khi lần đầu load dữ liệu (không có đơn hàng và đang loading)
  if (isLoading && displayOrders.length === 0) {
    return (
      <Loading />
    )
  }

  if (error && displayOrders.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-600">Error loading orders: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-200 bg-white hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-slate-600">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <Badge variant="secondary" className={cn("text-xs", stat.trendColor)}>
                    {stat.trend}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Table */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quản lý đơn hàng</CardTitle>
              <CardDescription>
                {isSeller ? "Theo dõi và quản lý đơn hàng của cửa hàng" : "Theo dõi và quản lý đơn hàng của khách hàng"}
              </CardDescription>
            </div>
            <Button variant="outline" className="border-slate-200 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Xuất file
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search orders by number or recipient..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 bg-slate-50 border-slate-200"
                />
              </div>
              <div className="flex gap-2">
                {["PENDING", "PROCESSING", "SHIPPING", "DELIVERED"].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusFilter(status)}
                    className={cn(
                      "capitalize border-slate-200",
                      statusFilter === status ? "bg-blue-600 text-white" : "",
                    )}
                  >
                    {status.toLowerCase()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Table */}
            {displayOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600">Không tìm thấy đơn hàng</p>
              </div>
            ) : (
              <>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow className="border-slate-200 hover:bg-slate-50">
                        <TableHead className="text-slate-700 font-semibold">Mã đơn hàng</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Người nhận</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Giảm giá</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Tổng tiền</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Ngày đặt</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Trạng thái</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Thanh toán</TableHead>
                        <TableHead className="text-slate-700 font-semibold text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayOrders.map((order) => (
                        <TableRow key={order.id} className="border-slate-200 hover:bg-slate-50">
                          <TableCell>
                            <span className="font-semibold text-slate-900">{order.orderNumber}</span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-slate-900">{order.recipientName}</p>
                              <p className="text-xs text-slate-500">{order.recipientPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-600">{formatCurrency(order.discount)}</TableCell>
                          <TableCell className="font-semibold text-slate-900">{formatCurrency(order.totalAmount)}</TableCell>
                          <TableCell className="text-slate-600">
                            {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {orderStatusMap[order.status] || order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={getPaymentStatusColor(order.paymentStatus)}
                            >
                              {paymentStatusMap[order.paymentStatus] || order.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white border-slate-200">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedOrder(order)
                                    setIsDetailDialogOpen(true)
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Printer className="w-4 h-4 mr-2" />
                                  In hóa đơn
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Download className="w-4 h-4 mr-2" />
                                  Tải xuống
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    Hiển thị {(pagination.currentPage - 1) * pagination.limit + 1} đến {Math.min(pagination.currentPage * pagination.limit, pagination.total)} trên{" "}
                    {pagination.total} đơn hàng
                  </p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => getAllOrders(pagination.currentPage - 1, pagination.limit, isSeller ? shop?.id : undefined)}
                      disabled={pagination.currentPage === 1}
                      className="border-slate-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="min-w-24 text-center">
                      <p className="text-sm font-medium text-slate-700">
                        Trang {pagination.currentPage} trên {pagination.totalPages}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => getAllOrders(pagination.currentPage + 1, pagination.limit, isSeller ? shop?.id : undefined)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="border-slate-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <OrderDetailDialog
        order={selectedOrder}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  )
}
