import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart.types";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const subtotal = item.totalPrice;

  return (
    <div className="border-border flex items-center gap-4 border-b py-4 last:border-b-0">
      {/* Product Image - Fixed width */}
      <div className="h-20 w-20 flex-shrink-0">
        {item.productImage ? (
          <img
            src={item.productImage}
            alt={item.productName}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
            <span className="text-xs text-gray-400">Không có ảnh sản phẩm</span>
          </div>
        )}
      </div>

      {/* Product Details - Flexible width */}
      <div className="min-w-0 flex-1">
        <Link
          to={`${API_ENDPOINTS.PRODUCTS.GET(item.productId)}`}
          className="text-foreground block truncate text-lg font-semibold transition-colors hover:text-orange-600"
        >
          {item.productName}
        </Link>

        <Badge variant={'outline'} className="mt-1 border-2">{item.variantName || "Mặc định"}</Badge>

        <p className="text-muted-foreground mt-1 text-sm">
          {item.productCategory}
        </p>
        <p className="text-foreground mt-2 text-sm font-medium">
          {formatPrice(item.unitPrice)}
        </p>
      </div>

      {/* Quantity Selector - Fixed width */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            handleQuantityChange(
              Math.max(1, Number.parseInt(e.target.value) || 1),
            )
          }
          className="h-8 w-12 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Subtotal - Fixed width */}
      <div className="flex w-32 flex-shrink-0 flex-col items-end justify-center">
        <p className="text-foreground w-full truncate text-right text-lg font-semibold">
          {formatPrice(subtotal)}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">Tổng tiền</p>
      </div>

      {/* Delete Button - Fixed width */}
      <div className="flex flex-shrink-0 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
