"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { Product } from "@/types";
import { products } from "@/lib/mock-data";
import "keen-slider/keen-slider.min.css";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBagIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [newCategory, setNewCategory] = useState<string>("");

  useEffect(() => {
    for (const [categoria, lista] of Object.entries(products)) {
      if (lista.some((p) => p.id === product.id)) {
        setNewCategory(categoria);
        break;
      }
    }
  }, []);

  return (
    <Link href={`/product/${newCategory}/${product.id}`}>
      <Card
        id="draggable"
        className="hover:shadow-lg transition-shadow p-0 border-none h-full rounded-md"
      >
        <div className="w-full h-[300px]">
          {product.image ? (
            <Image
              height={0}
              width={0}
              src={product.image}
              alt={product.name}
              className="rounded-2xl w-full p-1 h-[200px] object-fit hover:scale-105 transition-transform"
            />
          ) : (
            <div className="flex justify-center items-center rounded-2xl w-full p-1 h-[200px] object-fit hover:scale-105 transition-transform">
              <ShoppingBagIcon className="h-[50%] w-[50%] text-gray-800" />
            </div>
          )}
          <CardContent className="rounded-bl-2xl rounded-br-2xl p-2 h-[35%] flex flex-col justify-between">
            <h3 className="font-normal text-sm line-clamp-3 overflow-hidden break-words">
              {product.name}
            </h3>
            <Badge variant="secondary" className="text-xl font-bold p-0">
              R$ {product.price.toFixed(2)}
            </Badge>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
