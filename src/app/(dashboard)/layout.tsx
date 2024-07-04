import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimit } from "@/lib/api-limit";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const userApiLimit = await getApiLimit();

  return (
    <div className="relative h-full">
      <div className="hidden h-full md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar userApiLimit={userApiLimit} />
      </div>
      <div className="h-full md:pl-72">
        <Navbar />
        <div className="px-4 pb-6 md:px-8">{children}</div>
      </div>
    </div>
  );
}
