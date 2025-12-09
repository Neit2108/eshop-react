import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
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
import { cn, formatCurrency, productStatusMap } from "@/lib/utils"
import { ProductDetailDialog } from "@/components/features/products/detail/ProductDetailDialog"
import { useProducts } from "@/hooks/useProducts"
import { useShop } from "@/hooks/useShop"
import { useAuth } from "@/hooks/useAuth"
import type { Product } from "@/types/product.types"
import Loading from "@/components/common/Loading"
import RatingStars from "@/components/features/reviews/RatingStars"

export function ProductManagement() {
  const { hasRoles } = useAuth()
  const { 
    products, 
    isLoading, 
    error, 
    fetchProducts,
    page,
    limit,
    totalPages,
    totalProducts,
  } = useProducts()
  const { shop, fetchShopByUserId } = useShop()

  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Determine if user is a seller
  const isSeller = hasRoles("SELLER")

  // Load data based on user role
  useEffect(() => {
    if (isSeller) {
      // For sellers, fetch their shop first
      fetchShopByUserId()
      console.log("shop", shop)
      console.log("isSeller", isSeller)
    }
  }, [isSeller, fetchShopByUserId])

  // Load products with shopId for sellers
  useEffect(() => {
    if (isSeller && shop?.id) {
      fetchProducts(undefined, 1, limit, shop.id)
    } else if (!isSeller) {
      fetchProducts(undefined, 1, limit)
    }
  }, [shop?.id, isSeller, fetchProducts, limit])

  // Choose which product list to display - always use products (with or without shopId filter)
  const displayProducts = products

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    fetchProducts(e.target.value, 1, limit, isSeller ? shop?.id : undefined)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800"
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800"
      case "ARCHIVED":
      case "OUT_OF_STOCK":
        return "bg-red-100 text-red-800"
      case "DISCONTINUED":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getTotalStock = (product: Product) => {
    return product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0
  }

  const stats = [
    {
      label: "Tổng sản phẩm",
      value: totalProducts,
      trend: "+12%",
      trendColor: "text-green-600",
    },
    {
      label: "Sản phẩm đang bày bán",
      value: displayProducts.filter((p) => p.status === "PUBLISHED").length,
      trend: "+5%",
      trendColor: "text-green-600",
    },
    {
      label: "Tồn kho thấp",
      value: displayProducts.filter((p) => {
        const stock = getTotalStock(p)
        return stock < 20 && stock > 0
      }).length,
      trend: "-2%",
      trendColor: "text-orange-600",
    },
    {
      label: "Hết hàng",
      value: displayProducts.filter((p) => getTotalStock(p) === 0).length,
      trend: "-100%",
      trendColor: "text-red-600",
    },
  ]

  // Chỉ show loading khi lần đầu load dữ liệu (không có sản phẩm và đang loading)
  if (isLoading && displayProducts.length === 0) {
    return (
      <Loading />
    )
  }

  if (error && displayProducts.length === 0) {
    return (
      <Loading />
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

      {/* Products Table */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quản lý sản phẩm</CardTitle>
              <CardDescription>
                {isSeller ? "Quản lý sản phẩm của cửa hàng" : "Quản lý sản phẩm của khách hàng"}
              </CardDescription>
            </div>
            {isSeller && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm sản phẩm
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm sản phẩm mới</DialogTitle>
                    <DialogDescription>Tạo mới sản phẩm trong kho</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên sản phẩm</Label>
                      <Input id="name" placeholder="Enter product name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">Mã sản phẩm</Label>
                      <Input id="sku" placeholder="Enter SKU" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Giá</Label>
                      <Input id="price" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Số lượng</Label>
                      <Input id="stock" type="number" placeholder="0" />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Tạo sản phẩm</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Tìm kiếm sản phẩm theo tên hoặc mã sản phẩm..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 bg-slate-50 border-slate-200"
                />
              </div>
              <Button variant="outline" className="border-slate-200 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Lọc
              </Button>
            </div>

            {/* Table */}
            {displayProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600">Không tìm thấy sản phẩm</p>
              </div>
            ) : (
              <>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow className="border-slate-200 hover:bg-slate-50">
                        <TableHead className="text-slate-700 font-semibold">Sản phẩm</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Giá</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Tồn kho</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Số lượng đã bán</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Số sao trung bình</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Trạng thái</TableHead>
                        <TableHead className="text-slate-700 font-semibold text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayProducts.map((product) => (
                        <TableRow key={product.id} className="border-slate-200 hover:bg-slate-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <span className="font-medium text-slate-900">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-slate-900">
                            {formatCurrency(product.price)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "px-2 py-1 rounded text-sm font-medium",
                                product.totalStock === 0
                                  ? "bg-red-100 text-red-800"
                                  : product.totalStock && product.totalStock < 20
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800",
                              )}
                            >
                              {product.totalStock || 0}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-600">
                            {product.soldCount || 0}
                          </TableCell>
                          <TableCell className="text-slate-600">
                            {product.averageRating}
                            <RatingStars rating={product.averageRating} />
                          </TableCell>
                          <TableCell className="text-slate-600">
                            <Badge className={getStatusColor(product.status)}>{productStatusMap(product.status)}</Badge>
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
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setSelectedProduct(product)
                                    setIsDetailDialogOpen(true)
                                  }}
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
                    Hiển thị {(page - 1) * limit + 1} đến {Math.min(page * limit, totalProducts)} trên{" "}
                    {totalProducts} sản phẩm
                  </p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchProducts(searchTerm, page - 1, limit, isSeller ? shop?.id : undefined)}
                      disabled={page === 1}
                      className="border-slate-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="min-w-24 text-center">
                      <p className="text-sm font-medium text-slate-700">
                        Trang {page} trên {totalPages}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchProducts(searchTerm, page + 1, limit, isSeller ? shop?.id : undefined)}
                      disabled={page === totalPages}
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

      {/* Product Detail Dialog */}
      <ProductDetailDialog product={selectedProduct as any} open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen} />
    </div>
  )
}
