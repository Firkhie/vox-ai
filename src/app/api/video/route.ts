import Replicate from "replicate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { addApiLimit, checkApiLimit } from "@/lib/api-limit";

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
      prompt,
    };

    const response = await replicate.run(
      "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
      { input },
    );

    await addApiLimit();

    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ROUTE]", error);
  }
}
