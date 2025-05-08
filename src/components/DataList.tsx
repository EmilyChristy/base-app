"use client";

import { Spinner } from "@/components/ui/spinner";
import { Table } from "@/components/ui/table";
// import { formatDate } from '@/utils/format';

import { useProducts } from "../api/get-products";

// const searchParams = useSearchParams();
// const page = searchParams?.get('page') ? Number(searchParams.get('page')) : 1;
const page = 1;

export const DataList = () => {
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

  const products = productsQuery.data?.data;

  if (!products) return null;

  return (
    <Table
      data={products}
      columns={[
        {
          title: "Title",
          field: "title",
        },
        {
          title: "Created At",
          field: "createdAt",
          // Cell({ entry: { createdAt } }) {
          //   return <span>{formatDate(createdAt)}</span>;
          // },
        },
        {
          title: "",
          field: "id",
          // Cell({ entry: { id } }) {
          //   return <DeleteUser id={id} />;
          // },
        },
      ]}
    />
  );
};
