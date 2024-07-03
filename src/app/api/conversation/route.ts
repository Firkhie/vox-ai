import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

type MessageContent = { text: string; type: string };

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  const response = await anthropic.messages.create({
    max_tokens: 1024,
    messages,
    model: "claude-3-haiku-20240307",
  });

  const { text } = response.content[0] as MessageContent;
  return NextResponse.json({
    role: "assistant",
    content: text,
  });
}
