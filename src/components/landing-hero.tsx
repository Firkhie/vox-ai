"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingHero() {
  const { isSignedIn } = useAuth();

  return (
    <div className="mt-10 flex h-full flex-col items-center gap-8 px-4 py-4 text-white md:px-10 lg:mt-1 lg:flex-row xl:gap-10">
      <div className="w-full text-center font-bold text-white lg:w-1/2 lg:text-start">
        <div className="mb-5 space-y-2 text-4xl font-extrabold lg:mb-10 lg:space-y-5 lg:text-5xl xl:text-6xl">
          <h1>The Best AI Tool for</h1>
          <div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            <TypewriterComponent
              options={{
                strings: [
                  "Chatbot.",
                  "Photo Generation.",
                  "Music Generation.",
                  "Video Generation.",
                  "Code Generation.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <p className="text-sm font-light text-zinc-400 sm:text-base xl:text-lg">
          VoxAI: Your Ultimate AI Companion - Transform your digital experience
          with smart chat support, code generation, music creation, video
          production, and image design. Enhance productivity with VoxAI.
        </p>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="landing" size="ldg" className="mb-3 mt-7">
            Start Generating For Free
          </Button>
        </Link>
        <p className="text-xs font-normal text-muted-foreground md:text-sm">
          *No credit card required.
        </p>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg lg:w-1/2">
        <Image alt="landing-image" src="/landing-image.png" fill />
      </div>
    </div>
  );
}
