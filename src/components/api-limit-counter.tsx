import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MAX_FREE_COUNTS } from "@/constant";
import { Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";

interface ApiLimitCounterProps {
  userApiLimit: number;
  isPro: boolean;
}

export default function ApiLimitCounter({
  userApiLimit = 0,
  isPro = false,
}: ApiLimitCounterProps) {
  const proModal = useProModal();
  if (isPro) {
    return null;
  }

  return (
    <Card className="border-0 bg-white/15">
      <CardContent className="px-6 py-5">
        <div className="mb-4 text-center text-sm text-white">
          <div className="space-y-2">
            <p>
              {userApiLimit} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(userApiLimit / MAX_FREE_COUNTS) * 100}
            />
          </div>
        </div>
        <Button
          className="w-full"
          variant="premium"
          onClick={proModal.onOpen}
          disabled={isPro}
        >
          Upgrade
          <Zap className="ml-2 h-4 w-4 fill-white" />
        </Button>
      </CardContent>
    </Card>
  );
}
