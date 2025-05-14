import { ProductsGrid } from "@/features/products/components/Products-grid";

export default function Page() {
  return (
    <>
      <h3 className="mx-auto mt-6 mb-6 text-4xl font-bold tracking-tight text-balance text-gray-950 ">
        Grid
      </h3>
      <ProductsGrid />
    </>
  );
}
