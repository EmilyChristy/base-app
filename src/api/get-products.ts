import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Product, Meta } from "@/types/api";

export const getProducts = (
  { page }: { page?: number } = { page: 1 }
): Promise<{
  data: Product[];
  meta: Meta;
}> => {
  return api.get(`/products`, {
    params: {
      page,
    },
  });
};

export const getProductsQueryOptions = ({
  page = 1,
}: { page?: number } = {}) => {
  return queryOptions({
    queryKey: ["products", { page }],
    queryFn: () => getProducts({ page }),
  });
};

type UseProductsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({ queryConfig, page }: UseProductsOptions) => {
  return useQuery({
    ...getProductsQueryOptions({ page }),
    ...queryConfig,
  });
};
