import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt, amount = 1, resolution = "256x256" } = body;
  
  const response = await openai.images.generate({
    prompt,
    model: "dall-e-2",
    n: Number(amount),
    quality: "standard",
    size: resolution,
    response_format: "url",
  });

  return NextResponse.json(response.data);
}
