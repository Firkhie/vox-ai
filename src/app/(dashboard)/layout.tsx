import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimit } from "@/lib/api-limit";
import { checkSubscription, getSubscriptionDays } from "@/lib/subscription";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const userApiLimit = await getApiLimit();
  const isPro = await checkSubscription();

  return (
    <div className="relative h-full">
      <div className="hidden h-full md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar userApiLimit={userApiLimit} isPro={isPro} />
      </div>
      <div className="h-full w-full md:pl-72">
        <Navbar userApiLimit={userApiLimit} isPro={isPro} />
        <div className="mx-auto max-w-screen-xl px-4 pb-6 md:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
