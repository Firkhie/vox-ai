import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";

interface NavbarProps {
  userApiLimit: number;
  isPro: boolean;
}

export default function Navbar({
  userApiLimit = 0,
  isPro = false,
}: NavbarProps) {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar userApiLimit={userApiLimit} isPro={isPro} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
