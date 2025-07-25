import { Header } from "@/components/shared";
import { ProductList } from "@/components/layout";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header filterProductsByName={true} />
      <main className="container mx-auto px-4 py-8"></main>

      <div className="">
        <ProductList category="technology" />
        <ProductList category="clothes" />
      </div>
    </div>
  );
}
