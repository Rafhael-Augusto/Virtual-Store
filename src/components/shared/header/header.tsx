"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAppStore } from "@/store/useAppStore";

import { CartDrawer } from "@/components/layout";

import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Props {
  filterProductsByName?: ((term: string) => void) | boolean;
}

export function Header({ filterProductsByName }: Props) {
  const { term, setTerm } = useAppStore();
  const router = useRouter();

  const cartItems = Object.values(useAppStore((state) => state.cart));

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof filterProductsByName === "function") {
      filterProductsByName(e.target.value);
    } else if (e.target.value.length < 2) {
      router.push("/products");
    }
    const word = e.target.value;
    setTerm(word);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <div className="flex items-center space-x-2 ">
                <Store className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">MegaStore</h1>
              </div>
            </Link>

            <div className="flex gap-2">
              {typeof filterProductsByName === "function" || "boolean" ? (
                <Input
                  value={term}
                  autoFocus
                  onChange={(e) => handleWordChange(e)}
                  className="bg-gray-200 selection:bg-primary shadow-xs hover:bg-gray-300 text-primary focus:w-xs transition-all"
                  placeholder="🔍 Buscar..."
                />
              ) : (
                ""
              )}
              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent cursor-pointer"
                onClick={handleClick}
              >
                <ShoppingCart className="h-4 w-4 mr-2 " />
                Carrinho
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItems.length}
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer onOpenChange={setIsCartOpen} open={isCartOpen} />
    </>
  );
}
