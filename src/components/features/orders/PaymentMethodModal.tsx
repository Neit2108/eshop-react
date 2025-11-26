import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, CreditCard, Wallet, Truck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaymentMethod {
  id: "COD" | "BANK_TRANSFER" | "CREDIT_CARD" | "E_WALLET";
  label: string;
  description: string;
  icon: React.ReactNode;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "COD",
    label: "Thanh toán khi nhận hàng",
    description: "Thanh toán khi đơn hàng được giao đến bạn",
    icon: <Truck className="h-8 w-8" />,
  },
  {
    id: "BANK_TRANSFER",
    label: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản trực tiếp đến tài khoản của chúng tôi",
    icon: <Banknote className="h-8 w-8" />,
  },
  {
    id: "CREDIT_CARD",
    label: "Thẻ tín dụng/Ghi nợ",
    description: "Visa, Mastercard, or Amex",
    icon: <CreditCard className="h-8 w-8" />,
  },
  {
    id: "E_WALLET",
    label: "Ví điện tử",
    description: "Momo, ZaloPay, ShopeePay",
    icon: <Wallet className="h-8 w-8" />,
  },
];

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (
    method: "COD" | "BANK_TRANSFER" | "CREDIT_CARD" | "E_WALLET",
  ) => Promise<void>;
}

export function PaymentMethodModal({
  open,
  onOpenChange,
  onSelect,
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedMethod) return;

    setIsLoading(true);
    try {
      await onSelect(
        selectedMethod as "COD" | "BANK_TRANSFER" | "CREDIT_CARD" | "E_WALLET",
      );
      setTimeout(() => {
        onOpenChange(false);
        setSelectedMethod(null);
      }, 300);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ scrollbarWidth: "none" }}
        className="sm:max-w-md"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold">
            Select Payment Method
          </DialogTitle>
          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-6">
          <AnimatePresence>
            {PAYMENT_METHODS.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group relative">
                  <Card
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      "cursor-pointer p-4 transition-all duration-200",
                      "hover:scale-105 hover:shadow-lg",
                      "border-2",
                      selectedMethod === method.id
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <motion.div
                      className="flex flex-col items-center gap-3 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className={cn(
                          "rounded-lg p-3 transition-colors",
                          selectedMethod === method.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="text-foreground text-sm font-semibold">
                          {method.label}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {method.description}
                        </p>
                      </div>
                    </motion.div>
                  </Card>

                  {selectedMethod === method.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm"
                    >
                      <Button
                        onClick={handleContinue}
                        disabled={isLoading}
                        className="text-white"
                        size="sm"
                      >
                        {isLoading ? "Processing..." : "Continue"}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p className="text-muted-foreground text-center text-xs">
          Select a payment method and click continue
        </p>
      </DialogContent>
    </Dialog>
  );
}
