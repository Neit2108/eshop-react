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
  onVoucherSelect?: (voucher: Voucher) => void;
}

export function OrderSummary({
  items,
  totalAmount,
  shippingFee = 0,
  vouchers = null,
  onPlaceOrder,
  onVoucherSelect,
}: OrderSummaryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleSelectVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setModalOpen(false);
    onVoucherSelect?.(voucher);
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
        vouchers={vouchers || []}
        onSelect={handleSelectVoucher}
      />
    </>
  );
}
