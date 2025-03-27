import SideNav from "@/components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden border-amber-400 border-2">
      <div className="w-full flex-none md:w-64 border-b-blue-700 border-2">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 border-b-emerald-400 border-2">
        {children}
      </div>
    </div>
  );
}
