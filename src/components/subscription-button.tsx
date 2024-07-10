"use client";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export default function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
  const proModal = useProModal();

  return (
    <Button onClick={proModal.onOpen}>
      {isPro ? "Extend Subscription" : "Upgrade"}
    </Button>
  );
}
