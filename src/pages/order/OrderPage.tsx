import { useState, useCallback, useEffect } from "react";
import { OrderFilters } from "@/components/features/orders/OrderFilters";
import { OrderTable } from "@/components/features/orders/OrderTable";
import { OrderCard } from "@/components/features/orders/OrderCard";
import { OrderDetailsModal } from "@/components/features/orders/OrderDetailsModal";
import { useOrders } from "@/hooks/useOrders";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Order } from "@/types/order.types";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui";
import Loading from "@/components/common/Loading";
import { Card } from "@/components/ui/card";

export default function OrdersPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<string | undefined>();
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string | undefined>();
  const [hasLoaded, setHasLoaded] = useState(false);

  const isMobile = useIsMobile();

  const { orders, isLoading, userPagination, getMyOrders } = useOrders();

  const handleSelectOrder = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  }, []);

  const handleViewDetails = (order: Order) => {
    setSelectedOrderId(order.id);
    setIsModalOpen(true);
  };

  // Fetch orders with current filters
  useEffect(() => {
    getMyOrders(currentPage, 10, selectedOrderStatus as any, selectedPaymentStatus);
  }, [currentPage, selectedOrderStatus, selectedPaymentStatus, getMyOrders]);

  // Track when data has been loaded at least once (for initial load vs filter change)
  useEffect(() => {
    if (!isLoading && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isLoading, hasLoaded]);

  // Handle search filter change
  const handleSearch = useCallback((_query: string) => {
    // Search is typically handled on backend, adjust as needed
    setCurrentPage(1);
  }, []);

  // Handle order status filter change
  const handleOrderStatusChange = useCallback((statuses: string[]) => {
    setSelectedOrderStatus(statuses.length > 0 ? statuses[0] : undefined);
    setCurrentPage(1);
  }, []);

  // Handle payment status filter change
  const handlePaymentStatusChange = useCallback((statuses: string[]) => {
    setSelectedPaymentStatus(statuses.length > 0 ? statuses[0] : undefined);
    setCurrentPage(1);
  }, []);

  // Handle payment method filter change
  const handlePaymentMethodChange = useCallback((_methods: string[]) => {
    // Payment method filtering can be added to backend if needed
    setCurrentPage(1);
  }, []);

  // Handle pagination
  const handlePrevPage = useCallback(() => {
    if (userPagination.hasPrev) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [userPagination.hasPrev]);

  const handleNextPage = useCallback(() => {
    if (userPagination.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [userPagination.hasNext]);

  // Only show full page loading on initial load (before any data is fetched)
  // When filtering/paginating, keep the UI visible with loading state
  if (isLoading && !hasLoaded) {
    return <Loading />;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Đơn hàng của bạn</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý và theo dõi tất cả các đơn hàng của bạn
        </p>
      </div>

      {/* Filters */}
      <OrderFilters
        onSearch={handleSearch}
        onStatusFilterChange={handleOrderStatusChange}
        onPaymentStatusFilterChange={handlePaymentStatusChange}
        onPaymentMethodFilterChange={handlePaymentMethodChange}
        onDateRangeChange={() => {}}
      />

      {/* Results Info */}
      {orders.length > 0 && (
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-sm">
              Hiển thị <span className="text-blue-600">{orders.length}</span> trên{" "}
              <span className="text-blue-600">{userPagination.total}</span> đơn hàng
            </span>
          </div>
          {userPagination.totalPages > 1 && (
            <span className="text-xs text-muted-foreground">
              Trang {userPagination.currentPage}/{userPagination.totalPages}
            </span>
          )}
        </div>
      )}

      {/* Table / Cards */}
      {orders.length > 0 ? (
        <div className="relative mb-6">
          {/* Loading overlay when filtering/paginating */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                <p className="text-xs text-muted-foreground">Đang cập nhật...</p>
              </div>
            </div>
          )}
          {isMobile ? (
            <div>
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <OrderTable
              orders={orders}
              selectedIds={selectedIds}
              onSelectOrder={handleSelectOrder}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      ) : (
        <Card className="p-12 md:p-16 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-muted p-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-lg mb-1">
                {selectedOrderStatus || selectedPaymentStatus
                  ? "Không tìm thấy đơn hàng phù hợp"
                  : "Chưa có đơn hàng"}
              </p>
              <p className="text-muted-foreground text-sm">
                {selectedOrderStatus || selectedPaymentStatus
                  ? "Thử điều chỉnh bộ lọc để tìm đơn hàng"
                  : "Bạn chưa tạo bất kỳ đơn hàng nào. Hãy bắt đầu mua sắm ngay!"}
              </p>
            </div>
            {!(selectedOrderStatus || selectedPaymentStatus) && (
              <Button className="bg-blue-600 hover:bg-blue-700 mt-4">
                Tiếp tục mua sắm
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Pagination */}
      {userPagination.totalPages > 1 && orders.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t mt-6">
          <div className="text-xs text-muted-foreground">
            {userPagination.hasPrev || userPagination.hasNext ? (
              <>
                Trang <span className="font-semibold text-foreground">{userPagination.currentPage}</span> của{" "}
                <span className="font-semibold text-foreground">{userPagination.totalPages}</span>
              </>
            ) : (
              "Không có trang khác"
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={!userPagination.hasPrev}
              aria-label="Previous page"
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
              aria-label="Next page"
              className="gap-1"
            >
              <span className="hidden sm:inline">Tiếp theo</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      <OrderDetailsModal
        orderId={selectedOrderId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
