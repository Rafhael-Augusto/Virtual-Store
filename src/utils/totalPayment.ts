import { useAppStore } from "@/store/useAppStore";

export default function TotalPayment() {
  const cartItems = Object.values(useAppStore((state) => state.cart));

  const totalPayment = (divideBy = 1) => {
    const total = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    return (total / divideBy).toFixed(2);
  };

  return {
    totalPayment,
  };
}
