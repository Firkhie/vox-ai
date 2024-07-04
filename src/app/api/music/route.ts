import { addApiLimit, checkApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate();

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!process.env["ANTHROPIC_API_KEY"]) {
      return new NextResponse("Anthropic API key not configured", {
        status: 500,
      });
    }
    if (!prompt) {
      return new NextResponse("Prompt are required", { status: 400 });
    }

    const trialLimit = await checkApiLimit();
    if (!trialLimit) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const input = {
      prompt_b: prompt,
    };
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      { input },
    );

    await addApiLimit();

    return NextResponse.json(response);
  } catch (error) {
    console.log("[MUSIC_ROUTE]", error);
  }
}
