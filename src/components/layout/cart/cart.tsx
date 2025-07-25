"use client";

import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBagIcon, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const cartItems = Object.values(useAppStore((state) => state.cart));
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const setItemQuantity = useAppStore((state) => state.setQuantity);

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (quantity: number, productId: number) => {
    setItemQuantity(quantity, productId);
  };

  {
    /* RETORNA ISSO SE NAO TIVER ITENS */
  }
  {
    /* if (state.items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Seu Carrinho</SheetTitle>
            <SheetDescription>Seus produtos selecionados aparecerão aqui</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-64">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">
              Seu carrinho está vazio.
              <br />
              Adicione alguns produtos para começar!
            </p>
          </div>
        </SheetContent>
      </Sheet>
    )
  } */
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
          <SheetDescription>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} no
            carrinho
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center space-x-4 p-4 border rounded-lg "
              >
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    height={0}
                    width={0}
                    className="w-16 h-16 object-cover rounded bg-red-800"
                  />
                ) : (
                  <div className="flex justify-center items-center rounded-2xl p-1 object-fit hover:scale-105 transition-transform">
                    <ShoppingBagIcon className="h-16 w-16 text-gray-800" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-1">
                    {item.product.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    R$
                    {item.product.price}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleQuantityChange(item.product.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Badge
                    variant="secondary"
                    className="min-w-[2rem] text-center"
                  >
                    {item.quantity}
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleQuantityChange(item.product.id, +1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-4 p-5">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              R${" "}
              {cartItems
                .reduce((sum, item) => {
                  return sum + item.product.price * item.quantity;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
          <Button className="w-full cursor-pointer" size="lg">
            <Link href={`/placeorder`}>Finalizar Compra</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
