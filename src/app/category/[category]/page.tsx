"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { searchByWord } from "@/utils/search";
import { Product } from "@/types";
import { products } from "@/lib/mock-data";

import { Header } from "@/components/shared";
import { ItemCategoryList } from "@/components/layout";

export default function ProductsFromCategory() {
  const params = useParams();
  const { filterByName } = searchByWord();

  const category = params.category as keyof typeof products;
  const productsList = products[category];

  const [state, setState] = useState({
    filteredProducts: [] as Product[],
    filtersClicked: [] as string[],
    searchTerm: "" as string,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      filteredProducts: productsList,
    }));
  }, []);

  const filterProductsByName = (word: string) => {
    const filtered = productsList.filter((product) =>
      state.filtersClicked.every((item) => item in product.specs)
    );

    const filteredProducts = filterByName(word, filtered);

    setState((prev) => ({
      ...prev,
      filteredProducts,
    }));
  };

  if (!productsList) return <div>Lista de produtos nao encontrados</div>;

  return (
    <>
      <Header filterProductsByName={filterProductsByName} />
      <ItemCategoryList
        category={category}
        productList={state.filteredProducts}
      />
      ;
    </>
  );
}
