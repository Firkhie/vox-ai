import { addApiLimit, checkApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "256x256" } = body;

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

    const response = await openai.images.generate({
      prompt,
      model: "dall-e-2",
      n: Number(amount),
      quality: "standard",
      size: resolution,
      response_format: "url",
    });

    await addApiLimit();

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE_ROUTE]", error);
  }
}
