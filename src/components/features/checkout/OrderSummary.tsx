import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderItem } from "./OrderItem";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/cart.types";
import { VoucherModal, type Voucher } from "./VoucherModal";
import { useState } from "react";

interface OrderSummaryProps {
  items: CartItem[];
  totalAmount: number;
  shippingFee?: number;
  vouchers?: Voucher[] | null;
  onPlaceOrder: () => void;
}

const SAMPLE_VOUCHERS: Voucher[] = [
  {
    id: "id-test-1",
    code: "SAVE10",
    name: "Save 10%",
    description: "Get 10% off on all items",
    type: "PERCENTAGE",
    discountValue: "10",
    maxDiscount: "90",
    minOrderValue: "100",
    scope: "ALL",
    shopId: null,
    totalLimit: 1000,
    usedCount: 150,
    limitPerUser: 1,
    startDate: "2025-10-05T09:02:20.000Z",
    endDate: "2025-12-30T09:02:26.000Z",
    status: "ACTIVE",
    isPublic: true,
    createdAt: "2025-11-25T09:02:39.000Z",
    updatedAt: "2025-11-25T02:10:34.521Z",
    deletedAt: null,
  },
  {
    id: "id-test-2",
    code: "FIXED20",
    name: "$20 Off",
    description: "Save $20 on orders over $150",
    type: "FIXED_AMOUNT",
    discountValue: "20",
    maxDiscount: "20",
    minOrderValue: "150",
    scope: "ALL",
    shopId: null,
    totalLimit: 500,
    usedCount: 250,
    limitPerUser: 2,
    startDate: "2025-11-01T09:02:20.000Z",
    endDate: "2025-12-20T09:02:26.000Z",
    status: "ACTIVE",
    isPublic: true,
    createdAt: "2025-11-25T09:02:39.000Z",
    updatedAt: "2025-11-25T02:10:34.521Z",
    deletedAt: null,
  },
  {
    id: "id-test-3",
    code: "FREESHIP",
    name: "Free Shipping",
    description: "Get free shipping on all orders",
    type: "FREE_SHIPPING",
    discountValue: "0",
    maxDiscount: "0",
    minOrderValue: "50",
    scope: "ALL",
    shopId: null,
    totalLimit: 2000,
    usedCount: 800,
    limitPerUser: 3,
    startDate: "2025-10-01T09:02:20.000Z",
    endDate: "2025-12-31T09:02:26.000Z",
    status: "ACTIVE",
    isPublic: true,
    createdAt: "2025-11-25T09:02:39.000Z",
    updatedAt: "2025-11-25T02:10:34.521Z",
    deletedAt: null,
  },
  {
    id: "id-test-4",
    code: "EXPIRED",
    name: "Expired Deal",
    description: "This voucher is no longer valid",
    type: "PERCENTAGE",
    discountValue: "25",
    maxDiscount: "100",
    minOrderValue: "200",
    scope: "ALL",
    shopId: null,
    totalLimit: 100,
    usedCount: 100,
    limitPerUser: 1,
    startDate: "2025-10-01T09:02:20.000Z",
    endDate: "2025-11-01T09:02:26.000Z",
    status: "ACTIVE",
    isPublic: true,
    createdAt: "2025-11-25T09:02:39.000Z",
    updatedAt: "2025-11-25T02:10:34.521Z",
    deletedAt: null,
  },
];

export function OrderSummary({
  items,
  totalAmount,
  shippingFee = 0,
  vouchers = null,
  onPlaceOrder,
}: OrderSummaryProps) {
  const effectiveVouchers = vouchers || SAMPLE_VOUCHERS;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleSelectVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setModalOpen(false);
  };

  return (
    <>
      <Card className="sticky top-4 h-fit p-6">
        <h2 className="text-foreground mb-4 text-xl font-semibold">
          Tóm tắt đơn hàng
        </h2>

        <div className="mb-6 space-y-4">
          {items.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>

        <Separator className="my-4" />

        <div className="mb-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Giá tiền</span>
            <span className="text-foreground font-medium">
              {formatPrice(totalAmount)}
            </span>
          </div>
          {shippingFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phí vận chuyển</span>
              <span className="text-foreground font-medium">
                {formatPrice(shippingFee)}
              </span>
            </div>
          )}
          <div className="border-border flex justify-between border-t pt-2 text-lg font-semibold">
            <span className="text-foreground">Tổng</span>
            <span className="text-primary">
              {selectedVoucher
                ? formatPrice(
                    totalAmount -
                      (selectedVoucher.type === "PERCENTAGE"
                        ? (totalAmount *
                            Number(selectedVoucher.discountValue)) /
                          100
                        : selectedVoucher.type === "FIXED_AMOUNT"
                          ? Number(selectedVoucher.discountValue)
                          : 0) +
                      shippingFee,
                  )
                : formatPrice(totalAmount + shippingFee)}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="mb-4 h-11 w-full text-base font-semibold"
          onClick={() => setModalOpen(true)}
        >
          {selectedVoucher
            ? `Bạn được ${selectedVoucher.type === "PERCENTAGE" ? "giảm " + selectedVoucher.discountValue + "%" : selectedVoucher.type === "FIXED_AMOUNT" ? "giảm " + formatPrice(Number(selectedVoucher.discountValue)) : "miễn phí vận chuyển"}`
            : "Chọn voucher"}
        </Button>

        <Button
          onClick={onPlaceOrder}
          className="h-11 w-full text-base font-semibold"
        >
          Đặt hàng ngay
        </Button>
      </Card>

      <VoucherModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        vouchers={effectiveVouchers}
        onSelect={handleSelectVoucher}
      />
    </>
  );
}
