import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, ChevronLeft, ChevronRight, Copy } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency } from "@/lib/utils"
import { useVoucher } from "@/hooks/useVoucher"
import { useShop } from "@/hooks/useShop"
import { useAuth } from "@/hooks/useAuth"
import type { Voucher } from "@/types/voucher.types"
import { voucherTypeMap, voucherStatusMap, voucherScopeMap } from "@/types/voucher.types"
import Loading from "@/components/common/Loading"

export function VoucherManagement() {
  const { hasRoles } = useAuth()
  const {
    vouchers,
    isLoading,
    error,
    getAllVouchers,
    pagination,
  } = useVoucher()
  const { shop, fetchShopByUserId } = useShop()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Determine if user is a seller
  const isSeller = hasRoles("SELLER")

  // Load data based on user role
  useEffect(() => {
    if (isSeller) {
      // For sellers, fetch their shop first
      fetchShopByUserId()
    } else {
      // For admins, fetch public vouchers
      getAllVouchers(1, pagination.limit)
    }
  }, [isSeller, fetchShopByUserId, getAllVouchers, pagination.limit])

  // Load vouchers with shopId for sellers
  useEffect(() => {
    if (isSeller && shop?.id) {
      getAllVouchers(1, pagination.limit, shop.id)
    }
  }, [shop?.id, isSeller, getAllVouchers, pagination.limit])

  // Choose which vouchers to display
  const displayVouchers = vouchers

  // Filter by search term
  const filteredVouchers = displayVouchers.filter((v) => {
    const matchSearch = 
      v.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = !statusFilter || v.status === statusFilter
    return matchSearch && matchStatus
  })

  // Pagination
  const paginatedVouchers = filteredVouchers.slice(
    (pagination.currentPage - 1) * pagination.limit,
    pagination.currentPage * pagination.limit
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    getAllVouchers(1, pagination.limit)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status)
    getAllVouchers(1, pagination.limit)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "INACTIVE":
        return "bg-slate-100 text-slate-800"
      case "EXPIRED":
        return "bg-red-100 text-red-800"
      case "USED_UP":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case "PLATFORM":
        return "bg-blue-50 text-blue-700"
      case "SHOP":
        return "bg-purple-50 text-purple-700"
      default:
        return "bg-slate-50 text-slate-700"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PERCENTAGE":
        return "bg-green-50 text-green-700"
      case "FIXED_AMOUNT":
        return "bg-blue-50 text-blue-700"
      case "FREE_SHIPPING":
        return "bg-amber-50 text-amber-700"
      default:
        return "bg-slate-50 text-slate-700"
    }
  }

  const stats = [
    {
      label: isSeller ? "Tổng voucher cửa hàng" : "Tổng voucher nền tảng",
      value: displayVouchers.length,
      trend: "+12%",
      trendColor: "text-green-600",
    },
    {
      label: "Đang hoạt động",
      value: displayVouchers.filter((v) => v.status === "ACTIVE").length,
      trend: "+5%",
      trendColor: "text-green-600",
    },
    {
      label: "Đã hết hạn",
      value: displayVouchers.filter((v) => v.status === "EXPIRED").length,
      trend: "-2%",
      trendColor: "text-orange-600",
    },
    {
      label: "Hết lượt sử dụng",
      value: displayVouchers.filter((v) => v.status === "USED_UP").length,
      trend: "0%",
      trendColor: "text-slate-600",
    },
  ]

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  // Show loading only when first load data (no vouchers and loading)
  if (isLoading && displayVouchers.length === 0) {
    return <Loading />
  }

  if (error && displayVouchers.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-600">Error loading vouchers: {error}</p>
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

      {/* Vouchers Table */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quản lý voucher</CardTitle>
              <CardDescription>
                {isSeller ? "Quản lý voucher của cửa hàng" : "Quản lý voucher của nền tảng"}
              </CardDescription>
            </div>
            {isSeller && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo voucher
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tạo voucher mới</DialogTitle>
                    <DialogDescription>Tạo một voucher mới cho cửa hàng</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">Mã voucher</Label>
                      <Input id="code" placeholder="VD: SUMMER2024" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên voucher</Label>
                      <Input id="name" placeholder="Tên voucher" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Loại giảm giá</Label>
                      <select className="w-full px-3 py-2 border border-slate-200 rounded-md">
                        <option value="PERCENTAGE">Giảm theo phần trăm (%)</option>
                        <option value="FIXED_AMOUNT">Giảm số tiền cố định</option>
                        <option value="FREE_SHIPPING">Miễn phí vận chuyển</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Giá trị</Label>
                      <Input id="value" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Ngày bắt đầu</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Ngày kết thúc</Label>
                      <Input id="endDate" type="date" />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Tạo voucher</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Tìm kiếm voucher theo mã hoặc tên..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 bg-slate-50 border-slate-200"
                />
              </div>
              <div className="flex gap-2">
                {["ACTIVE", "INACTIVE", "EXPIRED", "USED_UP"].map((status) => (
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
                    {status === "ACTIVE" ? "Hoạt động" : status === "INACTIVE" ? "Chưa kích hoạt" : status === "EXPIRED" ? "Hết hạn" : "Hết lượt"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Table */}
            {paginatedVouchers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600">Không tìm thấy voucher</p>
              </div>
            ) : (
              <>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow className="border-slate-200 hover:bg-slate-50">
                        <TableHead className="text-slate-700 font-semibold">Mã</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Tên</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Loại</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Giá trị</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Phạm vi</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Trạng thái</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Hạn sử dụng</TableHead>
                        <TableHead className="text-slate-700 font-semibold text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedVouchers.map((voucher) => (
                        <TableRow key={voucher.id} className="border-slate-200 hover:bg-slate-50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900">{voucher.code}</span>
                              <button
                                onClick={() => copyToClipboard(voucher.code)}
                                className="p-1 hover:bg-slate-100 rounded"
                                title="Sao chép mã"
                              >
                                <Copy className="w-4 h-4 text-slate-500" />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-slate-900">{voucher.name}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(voucher.type)}>
                              {voucherTypeMap[voucher.type] || voucher.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-slate-900">
                            {voucher.type === "PERCENTAGE"
                              ? `${voucher.discountValue}%`
                              : formatCurrency(voucher.discountValue)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={getScopeColor(voucher.scope)}>
                              {voucherScopeMap[voucher.scope] || voucher.scope}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(voucher.status)}>
                              {voucherStatusMap[voucher.status] || voucher.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600">
                            <div className="text-sm">
                              <p>{new Date(voucher.startDate).toLocaleDateString("vi-VN")}</p>
                              <p className="text-xs text-slate-500">-</p>
                              <p>{new Date(voucher.endDate).toLocaleDateString("vi-VN")}</p>
                            </div>
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
                                    setSelectedVoucher(voucher)
                                    setIsDetailDialogOpen(true)
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Xem chi tiết
                                </DropdownMenuItem>
                                {isSeller && (
                                  <>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Edit className="w-4 h-4 mr-2" />
                                      Sửa
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-red-600">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Xóa
                                    </DropdownMenuItem>
                                  </>
                                )}
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
                    Hiển thị {(pagination.currentPage - 1) * pagination.limit + 1} đến {Math.min(pagination.currentPage * pagination.limit, filteredVouchers.length)} trên {filteredVouchers.length} voucher
                  </p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => getAllVouchers(Math.max(1, pagination.currentPage - 1), pagination.limit)}
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
                      onClick={() => getAllVouchers(Math.min(pagination.totalPages, pagination.currentPage + 1), pagination.limit)}
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

      {/* Voucher Detail Dialog */}
      {selectedVoucher && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi tiết voucher</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Mã voucher</p>
                  <p className="text-lg font-semibold text-slate-900">{selectedVoucher.code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Tên voucher</p>
                  <p className="text-lg font-semibold text-slate-900">{selectedVoucher.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Loại</p>
                  <Badge className={getTypeColor(selectedVoucher.type)}>
                    {voucherTypeMap[selectedVoucher.type]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Giá trị</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {selectedVoucher.type === "PERCENTAGE"
                      ? `${selectedVoucher.discountValue}%`
                      : formatCurrency(selectedVoucher.discountValue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Phạm vi</p>
                  <Badge variant="secondary" className={getScopeColor(selectedVoucher.scope)}>
                    {voucherScopeMap[selectedVoucher.scope]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Trạng thái</p>
                  <Badge className={getStatusColor(selectedVoucher.status)}>
                    {voucherStatusMap[selectedVoucher.status]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Ngày bắt đầu</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {new Date(selectedVoucher.startDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Ngày kết thúc</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {new Date(selectedVoucher.endDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                {selectedVoucher.minOrderValue && (
                  <div>
                    <p className="text-sm font-medium text-slate-600">Giá trị đơn tối thiểu</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(selectedVoucher.minOrderValue)}
                    </p>
                  </div>
                )}
                {selectedVoucher.maxDiscount && (
                  <div>
                    <p className="text-sm font-medium text-slate-600">Giảm giá tối đa</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(selectedVoucher.maxDiscount)}
                    </p>
                  </div>
                )}
                {selectedVoucher.totalLimit && (
                  <div>
                    <p className="text-sm font-medium text-slate-600">Lượt sử dụng tối đa</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedVoucher.totalLimit}</p>
                  </div>
                )}
                {selectedVoucher.usedCount !== undefined && (
                  <div>
                    <p className="text-sm font-medium text-slate-600">Đã sử dụng</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedVoucher.usedCount}</p>
                  </div>
                )}
                {selectedVoucher.limitPerUser && (
                  <div>
                    <p className="text-sm font-medium text-slate-600">Giới hạn mỗi người dùng</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedVoucher.limitPerUser}</p>
                  </div>
                )}
              </div>
              {selectedVoucher.description && (
                <div>
                  <p className="text-sm font-medium text-slate-600">Mô tả</p>
                  <p className="text-slate-700">{selectedVoucher.description}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

