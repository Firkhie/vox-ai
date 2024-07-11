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
import React from "react";

interface SidebarProps {
  userApiLimit: number;
  isPro: boolean;
}

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const contents = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    color: "text-sky-400",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-400",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-400",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-400",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-yellow-400",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-400",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar({
  userApiLimit = 0,
  isPro = false,
}: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#171f41] to-[#01050c] px-4 py-5 text-white">
      <div className="pt-2">
        <Link href="/dashboard" className="flex items-center gap-4">
          <AudioLines className="h-8 w-8" />
          <h1
            className={cn(
              "text-2xl font-bold tracking-wide",
              montserrat.className,
            )}
          >
            <span className="text-[#874fe1]">Vox</span>AI
          </h1>
        </Link>
        <hr className="my-7 h-0.5 border-none bg-white/20" />
        <div className="flex flex-col gap-1">
          <p className="mb-2 text-sm text-muted-foreground">Main Menu</p>
          {contents.map((content) => (
            <React.Fragment key={content.href}>
              {content.label === "Settings" && (
                <p className="my-2 text-sm text-muted-foreground">
                  Preferences
                </p>
              )}
              <Link
                href={content.href}
                key={content.href}
                className={cn(
                  "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10",
                  `hover:${content.color}`,
                  pathname === content.href
                    ? cn("bg-white/10", content.color)
                    : "text-zinc-400",
                )}
              >
                <div className="flex flex-1 items-center">
                  <content.icon className="mr-3 h-5 w-5" />
                  {content.label}
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        <ApiLimitCounter userApiLimit={userApiLimit} isPro={isPro} />
      </div>
    </div>
  );
}
