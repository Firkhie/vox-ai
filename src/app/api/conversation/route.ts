import { addApiLimit, checkApiLimit } from "@/lib/api-limit";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

type MessageContent = { text: string; type: string };

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!process.env["ANTHROPIC_API_KEY"]) {
      return new NextResponse("Anthropic API key not configured", {
        status: 500,
      });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const trialLimit = await checkApiLimit();
    if (!trialLimit) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const response = await anthropic.messages.create({
      max_tokens: 1024,
      messages,
      model: "claude-3-haiku-20240307",
    });

    await addApiLimit();

    const { text } = response.content[0] as MessageContent;
    return NextResponse.json({
      role: "assistant",
      content: text,
    });
  } catch (error) {
    console.log("[CONVERSATION_ROUTE]", error);
  }
}
