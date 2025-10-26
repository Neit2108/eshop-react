import { addItemToCart, fetchCart, updateItemInCart, deleteItemFromCart } from "@/store/slices/cartSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export function useCart() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        cartId,
        items,
        itemsCount,
        totalAmount,
        isLoading,
        error,
        selectedCartItem,
    } = useSelector((state: RootState) => state.cart);

    return {
        cartId,
        items,
        itemsCount,
        totalAmount,
        isLoading,
        error,
        selectedCartItem,
        fetchCart: () => dispatch(fetchCart()),
        addItemToCart: ({ variantId, quantity }: { variantId: string; quantity: number }) => dispatch(addItemToCart({ variantId, quantity })),
        updateItemInCart: (cartId: string, itemId: string, quantity: number) => dispatch(updateItemInCart({ cartId, itemId, quantity })),
        deleteItemFromCart: (cartId: string, itemId: string) => dispatch(deleteItemFromCart({ cartId, itemId })),
    }
}