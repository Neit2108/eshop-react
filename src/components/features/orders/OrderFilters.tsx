import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import type { OrderStatus, PaymentMethod } from "@/types/order.types"
import { orderStatusMap, paymentStatusMap, paymentMethodMap } from "@/types/order.types"
import { Search, X as XIcon } from "lucide-react"

interface OrderFiltersProps {
  onSearch: (query: string) => void
  onStatusFilterChange: (statuses: OrderStatus[]) => void
  onPaymentStatusFilterChange?: (statuses: string[]) => void
  onPaymentMethodFilterChange: (methods: PaymentMethod[]) => void
  onDateRangeChange: (range: [Date | null, Date | null]) => void
}

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPING",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
]

const PAYMENT_STATUS_OPTIONS = ["PENDING", "PAID", "FAILED", "REFUNDED"]

const PAYMENT_METHODS: PaymentMethod[] = ["COD", "BANK_TRANSFER", "E_WALLET", "CREDIT_CARD"]

export function OrderFilters({
  onSearch,
  onStatusFilterChange,
  onPaymentStatusFilterChange,
  onPaymentMethodFilterChange,
  onDateRangeChange,
}: OrderFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<OrderStatus[]>([])
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<string[]>([])
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<PaymentMethod[]>([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  const toggleStatus = (status: OrderStatus) => {
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status]
    setSelectedStatuses(updated)
    onStatusFilterChange(updated)
  }

  const togglePaymentStatus = (status: string) => {
    const updated = selectedPaymentStatuses.includes(status)
      ? selectedPaymentStatuses.filter((s) => s !== status)
      : [...selectedPaymentStatuses, status]
    setSelectedPaymentStatuses(updated)
    onPaymentStatusFilterChange?.(updated)
  }

  const togglePaymentMethod = (method: PaymentMethod) => {
    const updated = selectedPaymentMethods.includes(method)
      ? selectedPaymentMethods.filter((m) => m !== method)
      : [...selectedPaymentMethods, method]
    setSelectedPaymentMethods(updated)
    onPaymentMethodFilterChange(updated)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedStatuses([])
    setSelectedPaymentStatuses([])
    setSelectedPaymentMethods([])
    onSearch("")
    onStatusFilterChange([])
    onPaymentStatusFilterChange?.([])
    onPaymentMethodFilterChange([])
    onDateRangeChange([null, null])
  }

  const hasActiveFilters =
    searchQuery.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedPaymentStatuses.length > 0 ||
    selectedPaymentMethods.length > 0

  return (
    <Card className="mb-6 p-4 md:p-6 border-0 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm mã đơn hàng, tên người nhận..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="gap-1"
          >
            <XIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Xóa bộ lọc</span>
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {/* Shipping Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                Trạng thái giao hàng
                {selectedStatuses.length > 0 && (
                  <Badge className="bg-blue-600 text-white text-xs">{selectedStatuses.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {ORDER_STATUS_OPTIONS.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onSelect={() => toggleStatus(status)}
                  className="cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span>{orderStatusMap[status]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Payment Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                Trạng thái thanh toán
                {selectedPaymentStatuses.length > 0 && (
                  <Badge className="bg-blue-600 text-white text-xs">{selectedPaymentStatuses.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {PAYMENT_STATUS_OPTIONS.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onSelect={() => togglePaymentStatus(status)}
                  className="cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedPaymentStatuses.includes(status)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span>{paymentStatusMap[status as keyof typeof paymentStatusMap]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Payment Method Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                Phương thức thanh toán
                {selectedPaymentMethods.length > 0 && (
                  <Badge className="bg-blue-600 text-white text-xs">{selectedPaymentMethods.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {PAYMENT_METHODS.map((method) => (
                <DropdownMenuItem
                  key={method}
                  onSelect={() => togglePaymentMethod(method)}
                  className="cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedPaymentMethods.includes(method)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span>{paymentMethodMap[method]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {selectedStatuses.map((status) => (
              <Badge
                key={status}
                variant="secondary"
                className="cursor-pointer hover:bg-muted gap-1"
                onClick={() => toggleStatus(status)}
              >
                {orderStatusMap[status]}
                <XIcon className="h-3 w-3" />
              </Badge>
            ))}
            {selectedPaymentStatuses.map((status) => (
              <Badge
                key={status}
                variant="secondary"
                className="cursor-pointer hover:bg-muted gap-1"
                onClick={() => togglePaymentStatus(status)}
              >
                {paymentStatusMap[status as keyof typeof paymentStatusMap]}
                <XIcon className="h-3 w-3" />
              </Badge>
            ))}
            {selectedPaymentMethods.map((method) => (
              <Badge
                key={method}
                variant="secondary"
                className="cursor-pointer hover:bg-muted gap-1"
                onClick={() => togglePaymentMethod(method)}
              >
                {paymentMethodMap[method]}
                <XIcon className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
