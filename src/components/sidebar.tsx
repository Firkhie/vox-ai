"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { Montserrat } from "next/font/google";
import {
  AudioLines,
  Code,
  ImageIcon,
  LayoutDashboardIcon,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import ApiLimitCounter from "./api-limit-counter";

interface SidebarProps {
  userApiLimit: number;
}

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const contents = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    color: "text-sky-700",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-700",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-yellow-700",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar({ userApiLimit = 0 }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#171f41] to-[#01050c] px-4 py-5 text-white">
      <div className="pt-2">
        <Link href="/dashboard" className="mb-10 flex items-center gap-3">
          <AudioLines className="h-7 w-7" />
          <h1 className={cn("text-xl font-bold", montserrat.className)}>
            VoxAI
          </h1>
        </Link>
        <div className="space-y-1">
          {contents.map((content) => (
            <Link
              href={content.href}
              key={content.href}
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white",
                pathname === content.href
                  ? "bg-white/10 text-white"
                  : "text-zinc-400",
              )}
            >
              <div className="flex flex-1 items-center">
                <content.icon className={cn("mr-3 h-5 w-5", content.color)} />
                {content.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <ApiLimitCounter userApiLimit={userApiLimit} />
      </div>
    </div>
  );
}
