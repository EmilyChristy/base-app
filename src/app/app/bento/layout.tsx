import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden border-amber-400 border-2">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 border-b-emerald-400 border-2">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
}
