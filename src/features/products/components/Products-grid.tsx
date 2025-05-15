"use client";

import { Spinner } from "@/components/ui/spinner";
// import { formatDate } from '@/utils/format';
import { Product } from "@/types/api";
import { useProducts } from "../api/get-products";

// const searchParams = useSearchParams();
// const page = searchParams?.get('page') ? Number(searchParams.get('page')) : 1;
const page = 1;

export const ProductsGrid = () => {
  const productsQuery = useProducts({
    page: page,
  });

  if (productsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const products = productsQuery.data as Product[] | undefined;

  if (!products) return null;

  return (
    <div
      id="products-grid"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      {products?.map((product: Product) => {
        // const LinkIcon = link.icon;

        return (
          <>
            <div
              key={product.id}
              className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            >
              <a href="#">
                <img
                  src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Product"
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
                <div className="px-4 py-3 w-72">
                  <span className="text-gray-400 mr-3 uppercase text-xs">
                    Brand
                  </span>
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    {product.title}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                      $149
                    </p>
                    <del>
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto"></div>
                  </div>
                </div>
              </a>
            </div>
          </>
        );
      })}
    </div>
  );
};
