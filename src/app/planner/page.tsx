import { DataList } from "@/components/DataList";

export default function Page() {
  return (
    <>
      <h1 className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
        Data list
      </h1>
      <DataList />
    </>
  );
}
