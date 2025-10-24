import { Heart, ArrowRightLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product.types";
import RatingStars from "../../reviews/RatingStars";
import { formatPrice } from "../../../../lib/utils";
import { Input } from "@/components/ui";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProductInfoProps {
  product: Product;
  selectedVariant: string;
  onVariantChange: (variant: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductInfo({
  product,
  selectedVariant,
  onVariantChange,
  quantity,
  onQuantityChange,
}: ProductInfoProps) {
  const { cartId, addItemToCart } = useCart();
  const navigate = useNavigate();

  const variantNames = product.variants?.map((v) => v.name) || [];

  const currentVariant = product.variants?.find(
    (v) => v.id === selectedVariant,
  );

  const availableStock =
    currentVariant?.stock || (product.variants?.[0]?.stock ?? 0);

  const displayPrice = currentVariant?.price ?? product.price;

  const handleAddToCart = () => {
    console.log("cart id:", cartId);
    console.log("selected variant:", selectedVariant);
    if (!cartId || !selectedVariant) {
      toast.error("Vui lòng chọn sản phẩm trước khi thêm vào giỏ hàng.");
      return;
    }
    addItemToCart(cartId, selectedVariant, quantity);
    toast.success("Thêm sản phẩm vào giỏ hàng thành công!", {
      action: {
        label: "Xem giỏ hàng",
        onClick: () => {
          navigate("/cart");
        },
      },
      duration: 5000,
    });
  };

  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", {
      productId: product.id,
      productName: product.name,
    });
  };

  const handleAddToCompare = () => {
    console.log("Added to compare:", {
      productId: product.id,
      productName: product.name,
    });
  };

  const handleVariantChange = (variantId: string) => {
    onVariantChange(variantId);
    console.log("Variant changed to:", variantId);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title and Brand */}
      <div>
        <h1 className="text-foreground mb-2 text-3xl font-bold">
          {product.name}
        </h1>
        <div className="flex items-center gap-3">
          {/* <span className="text-muted-foreground"></span> */}
          <span className="text-foreground font-semibold">
            {product.shop.name}
          </span>
          <RatingStars rating={Math.round(product.averageRating)} />
          <span className="text-muted-foreground text-sm">
            Đánh giá ({product.reviewCount})
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-[#FF6B6B]">
          {formatPrice(displayPrice)}
        </span>
        <span className="text-sm font-semibold text-green-600">
          Còn lại: {availableStock}
        </span>
      </div>

      {/* Variant Selection */}
      {variantNames.length > 0 && (
        <div>
          <div className="grid grid-cols-3 gap-3">
            {product.variants?.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantChange(variant.id)}
                className={`rounded-lg border-2 px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  selectedVariant === variant.id
                    ? "border-[#FF6B6B] bg-[#FF6B6B] text-white"
                    : "border-border text-foreground hover:border-[#FF6B6B]"
                }`}
                disabled={variant.stock === 0}
              >
                {variant.name} {variant.stock === 0 ? "(Hết hàng)" : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shipping Info */}
      <div className="text-muted-foreground text-sm">
        Free Shipping (Est. Delivery Time 2-3 Days)
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="border-border flex items-center rounded-lg border">
          <Button
            variant={"outline"}
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="text-foreground hover:bg-muted px-3 py-2"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              onQuantityChange(
                Math.max(1, Number.parseInt(e.target.value) || 1),
              )
            }
            className="text-foreground w-12 border-0 bg-transparent text-center"
            min="1"
            max={availableStock}
          />
          <Button
            variant={"outline"}
            onClick={() =>
              onQuantityChange(Math.min(availableStock, quantity + 1))
            }
            className="text-foreground hover:bg-muted px-3 py-2"
            disabled={quantity >= availableStock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          className="flex-1 rounded-lg bg-[#FF6B6B] py-2 font-semibold text-white hover:bg-[#FF5252]"
          disabled={availableStock === 0}
        >
          <ShoppingCart size={20} className="mr-2" />
          Thêm vào giỏ hàng
        </Button>
      </div>

      {/* Wishlist and Compare */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToWishlist}
          className="text-foreground flex items-center gap-2 transition-colors hover:text-[#FF6B6B]"
        >
          <Heart size={20} />
          <span>Add to Wishlist</span>
        </button>
        <button
          onClick={handleAddToCompare}
          className="text-foreground flex items-center gap-2 transition-colors hover:text-[#FF6B6B]"
        >
          <ArrowRightLeft size={20} />
          <span>Add to Compare</span>
        </button>
      </div>
    </div>
  );
}
