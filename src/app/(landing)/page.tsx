"use client";

import LandingHero from "@/components/landing-hero";
import LandingNavbar from "@/components/landing-navbar";
import { useAuth } from "@clerk/nextjs";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  
  return (
    <div className="flex h-full flex-col">
      <LandingNavbar />
      <LandingHero />
    </div>
  );
}
