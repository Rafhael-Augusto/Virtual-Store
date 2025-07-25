import { Product } from "@/types";

export function searchByWord() {
  const filterByName = (word: string, list: Product[]) => {
    const filteredItems = list.filter((item) =>
      item.name.toLowerCase().includes(word.toLocaleLowerCase())
    );
    return filteredItems;
  };

  return {
    filterByName,
  };
}
