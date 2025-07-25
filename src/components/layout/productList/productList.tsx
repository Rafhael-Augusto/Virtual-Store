"use client";

import { useEffect, useState } from "react";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { products } from "@/lib/mock-data";
import { Product } from "@/types";

import { ProductCard } from "../product/product";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import categoryLabel from "@/utils/categoryLabel";
import Link from "next/link";

interface Prop {
  category: string;
}

export function ProductList({ category }: Prop) {
  const selectedCategory = categoryLabel(category);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 5,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { spacing: 15, perView: 4 },
      },
      "(max-width: 640px)": {
        slides: { spacing: 14, perView: 3 },
      },
      "(max-width: 430px)": {
        slides: { spacing: 14, perView: 2 },
      },
    },
  });

  const [isGrabbing, setIsGrabbing] = useState(false);
  const [categoryList, setCategoryList] = useState<Product[]>([]);

  useEffect(() => {
    const categoryExists = products[category as keyof typeof products];

    const handleMouseDown = (e: MouseEvent) => {
      const mouseTarget = e.target as HTMLElement;
      const targetParent = mouseTarget.closest("#draggable");

      if (targetParent) {
        setIsGrabbing(true);
      }
    };

    const handleMouseUp = () => {
      setIsGrabbing(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    if (categoryExists) {
      setCategoryList(categoryExists);
    }

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [category]);

  if (categoryList.length === 0) return null;

  return (
    <div className="w-full flex justify-center mb-10">
      <div className="w-full max-w-[90vw] flex flex-col items-center">
        <Link
          href={`/category/${category}`}
          className="text-3xl rounded-2xl self-start inline font-bold text-primary mb-4 px-2 py-1 hover:bg-primary/20 hover:scale-110 transition-transform"
        >
          {selectedCategory}
        </Link>
        <div className="bg-primary rounded-2xl p-2 w-full relative">
          <div
            id="draggable"
            ref={sliderRef}
            className={`keen-slider ${
              isGrabbing ? "hover:cursor-grabbing" : "hover:cursor-grab"
            }`}
          >
            {categoryList.map((product) => (
              <div className="keen-slider__slide" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <Button
            onClick={() => instanceRef.current?.prev()}
            className="md:inline-flex hidden cursor-pointer absolute h-12 w-12 left-[-50] top-1/2 -translate-y-1/2 px-2 py-1 z-20 hover:bg-primary/50 bg-transparent rounded-full"
          >
            <ArrowLeft className="size-[40] text-primary" />
          </Button>

          <Button
            onClick={() => instanceRef.current?.next()}
            className="md:inline-flex hidden cursor-pointer absolute h-12 w-12 right-[-50] top-1/2 -translate-y-1/2 px-2 py-1 z-20 hover:bg-primary/50 bg-transparent rounded-full"
          >
            <ArrowRight className="size-[40] text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}
