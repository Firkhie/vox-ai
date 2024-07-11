import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import { useAuth } from "@clerk/nextjs";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

export default function LandingNavbar() {
  const { isSignedIn } = useAuth();
  return (
    <div className="flex items-center justify-between bg-transparent md:px-10 px-4 py-4 text-white">
      <Link
        href={isSignedIn ? "/dashboard" : "/sign-up"}
        className="flex items-center gap-4"
      >
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
      <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
        <Button variant="landing" size="ldg">
          Getting Started
        </Button>
      </Link>
    </div>
  );
}
