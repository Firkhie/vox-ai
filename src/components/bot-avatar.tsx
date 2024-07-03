import { Avatar } from "@/components/ui/avatar";
import { AudioLines } from "lucide-react";

export default function BotAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AudioLines className="h-full w-full" />
    </Avatar>
  );
}
