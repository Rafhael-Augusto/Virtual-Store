export default function categoryLabel(category: string) {
  const categories: Record<string, string> = {
    technology: "Tecnologia",
    clothes: "Roupas",
  };

  const currentCategory = categories[category] || category;

  return currentCategory;
}
