import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription, getSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const isPro = await checkSubscription();
  const userSubscription = await getSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings"
        icon={Settings}
        iconColor="text-gray-500"
        bgColor="bg-gray-500/10"
      />
      <div className="space-y-4 px-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          {isPro
            ? "You are currently on a pro plan."
            : "You are currently on a free plan."}
          <p>
            <span className="font-semibold">Expired in: </span>
            {userSubscription}
          </p>
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
}
