import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate();

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt } = body;

  const input = {
    prompt,
  };

  const response = await replicate.run(
    "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
    { input },
  );
  return NextResponse.json(response);
}
