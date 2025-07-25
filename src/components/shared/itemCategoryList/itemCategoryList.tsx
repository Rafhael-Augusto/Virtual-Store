"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Product } from "@/types/index";
import categoryLabel from "@/utils/categoryLabel";

import { ProductCard } from "@/components/layout";

import { ArrowLeft, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Products = Record<string, Product[]>;

interface Props {
  category: string;
  productList: Product[] | Products;
}

export function ItemCategoryList({ category, productList }: Props) {
  const itemsCategory = categoryLabel(category);

  const [state, setState] = useState({
    filteredProducts: [] as Product[],
  });

  const [filterState, setFilterState] = useState({
    filtersClicked: [] as string[],
    buttonsFilter: [] as string[],
  });

  const updateProductList = (filter: string) => {
    const updateFilters = () => {
      const findFilter = filterState.filtersClicked.find(
        (item) => item === filter
      );

      if (findFilter) {
        const itemIndex = filterState.filtersClicked.indexOf(filter);

        if (itemIndex > -1) {
          const newFilters = [...filterState.filtersClicked];
          newFilters.splice(itemIndex, 1);

          setFilterState((prev) => ({
            ...prev,
            filtersClicked: newFilters,
          }));
        }
      } else {
        setFilterState((prev) => ({
          ...prev,
          filtersClicked: [...prev.filtersClicked, filter],
        }));
      }

      {
        /* Retornar TODOS os produtos filtrados */
      }
      if (!Array.isArray(productList)) {
        const filtered = Object.entries(productList).flatMap(([, list]) => {
          return list.filter((product) =>
            filterState.filtersClicked.every((item) => item in product.specs)
          );
        });
        return filtered;
      }

      const filtered = productList.filter((product) =>
        filterState.filtersClicked.every((item) => item in product.specs)
      );

      setState((prev) => ({
        ...prev,
        filteredProducts: filtered,
      }));
    };

    updateFilters();
  };

  const clearFilters = () => {
    setFilterState((prev) => ({
      ...prev,
      filtersClicked: [],
    }));
  };

  useEffect(() => {
    if (!Array.isArray(productList)) {
      const keyCount: Record<string, number> = {};
      const productsOnly = Object.entries(productList).flatMap(([, list]) => {
        return list;
      });

      for (const product of productsOnly) {
        for (const key of Object.keys(product.specs)) {
          keyCount[key] = (keyCount[key] || 0) + 1;
        }
      }

      const commonKeys = Object.entries(keyCount)
        .filter(([, count]) => count >= Math.round(productsOnly.length / 8))
        .map(([key]) => key);

      setFilterState((prev) => ({
        ...prev,
        buttonsFilter: commonKeys,
      }));

      setState((prev) => ({
        ...prev,
        filteredProducts: productsOnly,
      }));

      return;
    }

    const getCommonKeys = () => {
      const keyCount: Record<string, number> = {};

      for (const product of productList) {
        for (const key of Object.keys(product.specs)) {
          keyCount[key] = (keyCount[key] || 0) + 1;
        }
      }

      const commonKeys = Object.entries(keyCount)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, count]) => count >= productList.length / 2)
        .map(([key]) => key);

      setFilterState((prev) => ({
        ...prev,
        buttonsFilter: commonKeys,
      }));

      setState((prev) => ({
        ...prev,
        filteredProducts: productList,
      }));
    };
    getCommonKeys();
  }, [productList]);

  useEffect(() => {
    if (!Array.isArray(productList)) {
      const productsOnly = Object.entries(productList).flatMap(([, list]) => {
        return list;
      });

      const filtered = productsOnly.filter((product) =>
        filterState.filtersClicked.every((item) => item in product.specs)
      );

      setState((prev) => ({
        ...prev,
        filteredProducts: filtered,
      }));
      return;
    }

    const filtered = productList.filter((product) =>
      filterState.filtersClicked.every((item) => item in product.specs)
    );

    setState((prev) => ({
      ...prev,
      filteredProducts: filtered,
    }));
  }, [filterState.filtersClicked, productList]);

  return (
    <div>
      <div className="ms-6 my-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para a loja
        </Link>
      </div>

      {/* Header da categoria */}
      <div className="mb-8 ms-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {itemsCategory}
        </h1>
        <p className="text-gray-600">
          {state.filteredProducts.length
            ? `${state.filteredProducts.length} produtos encontrados`
            : `0 produtos encontrados`}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center lg:flex-row gap-8">
        <div className="lg:w-1/4">
          {/* Filtros mapeados */}
          <Card className="block w-[200px] md:w-[350px] md:h-[400px] overflow-y-auto ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold ">Filtros</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${
                    filterState.filtersClicked.length > 0
                      ? "text-primary cursor-pointer"
                      : "text-transparent hover:text-transparent hover:bg-transparent"
                  }`}
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
              </div>

              {/* Filtros */}
              <div>
                <div>
                  <div className="space-y-4 ">
                    {filterState.buttonsFilter.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${index}`}
                          checked={filterState.filtersClicked.includes(item)}
                          onCheckedChange={() => updateProductList(item)}
                          className="cursor-pointer"
                        />
                        <Label
                          htmlFor={`${index}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Itens filtrados */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6 w-[70%]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {state.filteredProducts.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
