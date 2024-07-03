import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export default function Heading({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) {
  return (
    <div className="mb-5 mt-2 flex items-center gap-3 md:mb-8">
      <div className={cn("w-fit rounded-md p-2", bgColor)}>
        <Icon className={cn("h-8 w-8 md:h-10 md:w-10", iconColor)} />
      </div>
      <div>
        <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">{title}</h2>
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
