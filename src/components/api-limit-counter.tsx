import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MAX_FREE_COUNTS } from "@/constant";
import { Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ApiLimitCounterProps {
  userApiLimit: number;
}

export default function ApiLimitCounter({
  userApiLimit = 0,
}: ApiLimitCounterProps) {
  return (
    <Card className="border-0 bg-white/15">
      <CardContent className="px-6 py-5">
        <div className="mb-4 space-y-2 text-center text-sm text-white">
          <p>
            {userApiLimit} / {MAX_FREE_COUNTS} Free Generations
          </p>
          <Progress
            className="h-3"
            value={(userApiLimit / MAX_FREE_COUNTS) * 100}
          />
        </div>
        <Button className="w-full" variant="premium">
          Upgrade <Zap className="ml-2 h-4 w-4 fill-white" />
        </Button>
      </CardContent>
    </Card>
  );
}
