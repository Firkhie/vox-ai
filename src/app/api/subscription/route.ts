import { addSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  const body = await req.json();
  const { transactionTime } = body;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  await addSubscription({ transactionTime });
  return NextResponse.json({ message: "create subscription success" });
}
