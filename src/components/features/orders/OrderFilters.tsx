import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import type { OrderStatus, PaymentMethod } from "@/types/order.types"

interface OrderFiltersProps {
  onSearch: (query: string) => void
  onStatusFilterChange: (statuses: OrderStatus[]) => void
  onPaymentMethodFilterChange: (methods: PaymentMethod[]) => void
  onDateRangeChange: (range: [Date | null, Date | null]) => void
}

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPING",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
]

const PAYMENT_METHODS: PaymentMethod[] = ["COD", "BANK_TRANSFER", "E_WALLET", "CREDIT_CARD"]

export function OrderFilters({
  onSearch,
  onStatusFilterChange,
  onPaymentMethodFilterChange,
  onDateRangeChange,
}: OrderFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<OrderStatus[]>([])
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
    setSelectedPaymentMethods([])
    onSearch("")
    onStatusFilterChange([])
    onPaymentMethodFilterChange([])
    onDateRangeChange([null, null])
  }

  return (
    <Card className="mb-6 p-4 md:p-6">
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Tìm kiếm theo mã đơn hàng hoặc tên người nhận..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1"
          />
          <Button variant="secondary" onClick={clearFilters}>
            Xóa bộ lọc
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Tạo đơn hàng</Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Trạng thái
                {selectedStatuses.length > 0 && <Badge className="ml-2 bg-blue-600">{selectedStatuses.length}</Badge>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {STATUS_OPTIONS.map((status) => (
                <DropdownMenuItem key={status} onSelect={() => toggleStatus(status)}>
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Payment Method Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Phương thức thanh toán
                {selectedPaymentMethods.length > 0 && (
                  <Badge className="ml-2 bg-blue-600">{selectedPaymentMethods.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {PAYMENT_METHODS.map((method) => (
                <DropdownMenuItem key={method} onSelect={() => togglePaymentMethod(method)}>
                  <input
                    type="checkbox"
                    checked={selectedPaymentMethods.includes(method)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {method}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters Display */}
        {(selectedStatuses.length > 0 || selectedPaymentMethods.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {selectedStatuses.map((status) => (
              <Badge key={status} variant="secondary" className="cursor-pointer" onClick={() => toggleStatus(status)}>
                {status} ✕
              </Badge>
            ))}
            {selectedPaymentMethods.map((method) => (
              <Badge
                key={method}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => togglePaymentMethod(method)}
              >
                {method} ✕
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
