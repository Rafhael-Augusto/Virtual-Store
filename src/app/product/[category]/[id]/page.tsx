"use client";

import { useParams } from "next/navigation";

import { Header } from "@/components/shared";
import { ProductInfo } from "@/components/layout";

import { products } from "@/lib/mock-data";
import categoryLabel from "@/utils/categoryLabel";

export default function ProductDetails() {
  const params = useParams();

  const category = params.category as keyof typeof products;
  const itemCategory = categoryLabel(category);
  const product = products[category].find((p) => p.id === Number(params.id));

  if (!product) return <div>Produto nao encontrado</div>;

  return (
    <>
      <Header />
      <ProductInfo product={product} category={{ itemCategory, category }} />
    </>
  );
}
