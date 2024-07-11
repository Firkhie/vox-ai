"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { CircleX } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.MIDTRANS_CLIENT_KEY || "",
    );
    script.async = true;

    script.onload = () => {
      if (window.snap && token) {
        toast(
          (t) => (
            <span className="flex gap-2 text-sm">
              <span>
                Use this{" "}
                <a
                  href="https://docs.midtrans.com/docs/testing-payment-on-sandbox"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  link here
                </a>{" "}
                to get <b>Test Payment</b> credentials.
              </span>
              <Button variant="destructive" size="sm" onClick={() => toast.dismiss(t.id)}>
                <CircleX />
              </Button>
            </span>
          ),
          {
            duration: 10000,
          },
        );
        window.snap.embed(token, {
          embedId: "snap-container",
          onSuccess: async function (result: any) {
            alert("payment success!");
            await axios.post("/api/subscription", {
              transactionTime: result.transaction_time,
            });
            router.push("/dashboard");
            router.refresh();
          },
          onPending: function (result: any) {
            alert("waiting for your payment!");
            console.log(result);
          },
          onError: function (result: any) {
            alert("payment failed!");
            console.log(result);
          },
          onClose: function () {
            alert("you closed the popup without finishing the payment");
            router.push("/dashboard");
            router.refresh();
          },
        });
      } else {
        console.error("[SNAP_JS_NOT_LOADED]");
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [router, token]);

  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="absolute inset-0 bg-[url('/snap-background.jpg')] bg-cover bg-center blur-md"></div>
      <div
        id="snap-container"
        className="relative h-full w-full shadow-lg sm:h-[640px] sm:w-[420px] sm:rounded-lg"
      ></div>
    </div>
  );
}
