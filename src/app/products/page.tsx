"use client";

import { useEffect, useState } from "react";

import { searchByWord } from "@/utils/search";
import { Product } from "@/types";

import { products } from "@/lib/mock-data";

import { ItemCategoryList } from "@/components/layout";
import { Header } from "@/components/shared";

export default function ProductsList() {
  const { filterByName } = searchByWord();

  const [state, setState] = useState({
    filteredProducts: [] as Product[],
    filtersClicked: [] as string[],
    searchTerm: "" as string,
  });

  const filterProductsByName = (word: string) => {
    const filtered = Object.entries(products).flatMap(([, list]) => {
      return list.filter((product) =>
        state.filtersClicked.every((item) => item in product.specs)
      );
    });

    const filteredProducts = filterByName(word, filtered);

    setState((prev) => ({
      ...prev,
      filteredProducts,
    }));
  };

  useEffect(() => {
    const productsOnly = Object.entries(products).flatMap(([, list]) => {
      return list as Product[];
    });

    setState((prev) => ({ ...prev, filteredProducts: productsOnly }));
  }, []);

  return (
    <div>
      <Header filterProductsByName={filterProductsByName} />
      <ItemCategoryList
        category="Produtos"
        productList={state.filteredProducts}
      />
    </div>
  );
}
