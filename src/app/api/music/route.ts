import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate();

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt } = body;

  const input = {
    prompt_b: "90's rap",
  };

  const response = await replicate.run(
    "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
    { input },
  );
  return NextResponse.json(response);
}
