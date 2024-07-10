import { auth } from "@clerk/nextjs/server";
import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

interface MidtransTransactionResponse {
  token: string;
  redirect_url: string;
}

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { emailAddress } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let parameter = {
      transaction_details: {
        order_id: "VOXAI-PRO-" + Math.floor(1000000 + Math.random() * 9000000),
        gross_amount: 50000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: emailAddress,
      },
      item_details: [
        {
          price: 50000,
          quantity: 1,
          name: "VoxAI Pro 1 Month",
        },
      ],
    };

    const response: MidtransTransactionResponse =
      await snap.createTransaction(parameter);
    return NextResponse.json(response);
  } catch (error) {
    console.log("[PAYMENT_ROUTE]", error);
  }
}
