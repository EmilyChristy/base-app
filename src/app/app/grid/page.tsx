import { ProductsGrid } from "@/features/products/components/Products-grid";

export default function Page() {
  return (
    <>
      <h3 className="w-fit mx-auto justify-items-center justify-center mt-6 mb-6 text-4xl font-bold tracking-tight text-balance text-gray-950 ">
        Products
      </h3>
      <ProductsGrid />
    </>
  );
}
