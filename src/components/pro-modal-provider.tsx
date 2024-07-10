"use client";

import { useRouter } from "next/navigation";
import ProModal from "./pro-modal";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

export default function ProModalProvider() {
  const router = useRouter();
  const { user } = useUser();
  const proModal = useProModal();

  const handleUpgrade = async () => {
    try {
      const response = await axios.post("/api/payment", {
        emailAddress: user!.emailAddresses[0].emailAddress,
      });
      proModal.onClose();
      router.push(`/payment-snap?token=${response.data.token}`);
    } catch (error) {
      console.log("Payment error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ProModal onUpgrade={handleUpgrade} />
    </>
  );
}
