import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="relative h-full">
      <div className="hidden h-full md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar />
      </div>
      <div className="h-full md:pl-72">
        <Navbar />
        <div className="px-4 pb-6 md:px-8">{children}</div>
      </div>
    </div>
  );
}
