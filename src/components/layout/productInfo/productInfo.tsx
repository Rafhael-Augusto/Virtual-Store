"use client";

import Image from "next/image";
import Link from "next/link";

import { useAppStore } from "@/store/useAppStore";

import { Product } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBagIcon,
  ShoppingCart,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

type Category = {
  category: string;
  itemCategory: string;
};

interface Props {
  product: Product;
  category: Category;
}

export function ProductInfo({ product, category }: Props) {
  const addToCart = useAppStore((state) => state.addToCart);
  const setQuantity = useAppStore((state) => state.setQuantity);
  const cartItems = useAppStore((state) => state.cart);

  const [state, setState] = useState({
    productQuantity: 1 as number,
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setQuantity(product.id, state.productQuantity - 1);

    console.log(cartItems);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para a loja
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-white border-primary/50 border-2">
                {product.image ? (
                  <Image
                    height={0}
                    width={0}
                    src={product.image}
                    alt={product.name}
                    className="rounded-2xl w-full p-1 h-[200px] object-fit hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="flex justify-center items-center rounded-2xl w-full p-1 object-fit hover:scale-105 transition-transform">
                    <ShoppingBagIcon className="h-full w-full text-gray-800" />
                  </div>
                )}
              </div>
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">
                  <Link
                    href={`/category/${category.category}`}
                    className="inline-flex items-center  hover:text-blue-800"
                  >
                    {category.itemCategory}
                  </Link>
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-4xl font-bold text-green-600 mb-4">
                  R$ {product.price.toFixed(2)}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Controles de Quantidade e Compra */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantidade:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      className="cursor-pointer"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          productQuantity:
                            prev.productQuantity <= 1
                              ? prev.productQuantity
                              : prev.productQuantity - 1,
                        }))
                      }
                      variant="outline"
                      size="icon"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {state.productQuantity}
                    </span>
                    <Button
                      className="cursor-pointer"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          productQuantity: prev.productQuantity + 1,
                        }))
                      }
                      variant="outline"
                      size="icon"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 cursor-pointer"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">Em estoque</span>
                  <span className="text-gray-500">
                    • Entrega em 2-3 dias úteis
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Especificações Técnicas */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Especificações</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <div key={key} className="flex justify-between py-2">
                    <span className="font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <span className="text-gray-900">{value}</span>
                    {index < Object.entries(product.specs).length - 1 && (
                      <Separator className="mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
