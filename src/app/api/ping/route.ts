import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await prismadb.$queryRaw`SELECT 1`;
    return new NextResponse("Database pinged successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to ping database", { status: 500 });
  }
}
