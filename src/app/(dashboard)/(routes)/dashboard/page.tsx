"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";

const contents = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/code",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-10 space-y-2">
        <h2 className="text-center text-2xl font-bold md:text-4xl">
          Discover the Potential of AI
        </h2>
        <p className="text-center text-sm font-light text-muted-foreground md:text-lg">
          Engage with the most intelligent AI - Unleash the capabilities of AI
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {contents.map((content) => (
          <Card
            onClick={() => router.push(content.href)}
            key={content.href}
            className="flex cursor-pointer items-center justify-between border-black/5 p-4 transition hover:shadow-md"
          >
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full items-center justify-between">
                <div className="font-semibold">{content.label}</div>
                <div className={cn("rounded-full border p-1", content.bgColor)}>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <div
                className={cn(
                  "flex w-full items-center justify-center rounded-md p-7",
                  content.bgColor,
                )}
              >
                <content.icon
                  className={cn("h-24 w-24 xl:h-28 xl:w-28", content.color)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
