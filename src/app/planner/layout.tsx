import Ads from "@/components/Ads";
import Hero from "@/components/Hero";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <Hero />
        </div>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-4 lg:grid-rows-2 border-0 border-dashed border-amber-500">
          <div className="relative lg:row-span-2 lg:col-span-3 border-0 border-dotted border-green-300">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem] border-0 border-dotted border-blue-300"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0 border-0 border-dashed border-amber-500">
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </p>
              </div>
              <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm px-8 border-0 border-dashed border-b-cyan-500">
                {children}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>

          <div className="relative lg:row-span-2 border-0 border-dotted border-purple-700">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <Ads />
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
