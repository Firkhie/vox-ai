"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

interface MobileSidebarProps {
  userApiLimit: number;
  isPro: boolean;
}

export default function MobileSidebar({
  userApiLimit = 0,
  isPro = false,
}: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="m-0 w-72 border-none p-0 text-white">
        <Sidebar userApiLimit={userApiLimit} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
}
