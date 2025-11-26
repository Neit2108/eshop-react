import { useState, useCallback, useEffect } from "react";
import { OrderFilters } from "@/components/features/orders/OrderFilters";
import { OrderTable } from "@/components/features/orders/OrderTable";
import { OrderCard } from "@/components/features/orders/OrderCard";
import { OrderDetailsModal } from "@/components/features/orders/OrderDetailsModal";
import { useOrders } from "@/hooks/useOrders";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Order } from "@/types/order.types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";
import Loading from "@/components/common/Loading";

export default function OrdersPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobile = useIsMobile();

  const { orders, isLoading, pagination, getMyOrders } = useOrders();

  const handleSelectOrder = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  }, []);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  if (isLoading) {
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
        onSearch={() => {}}
        onStatusFilterChange={() => {}}
        onPaymentMethodFilterChange={() => {}}
        onDateRangeChange={() => {}}
      />

      {/* Results Info */}
      <div className="text-muted-foreground mb-4 text-sm">
        Hiển thị {orders.length} trên {orders.length} đơn đặt hàng
      </div>

      {/* Table / Cards */}
      {isMobile ? (
        <div className="mb-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
            />
          ))}
          {orders.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Không tìm thấy đơn hàng</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-6">
          <OrderTable
            orders={orders}
            selectedIds={selectedIds}
            onSelectOrder={handleSelectOrder}
            onViewDetails={handleViewDetails}
          />
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Trang {pagination.currentPage} trên {pagination.totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              disabled={pagination.currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
              {}
              }
              disabled={pagination.currentPage === pagination.totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
