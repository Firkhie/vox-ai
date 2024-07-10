import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

const contents = [
  {
    description: "Unlimited conversations",
    icon: MessageSquare,
  },
  {
    description: "Generate an endless array of stunning images",
    icon: ImageIcon,
  },
  {
    description: "Create unlimited high-quality videos",
    icon: VideoIcon,
  },
  {
    description: "Compose infinite tracks",
    icon: Music,
    bgColor: "bg-yellow-500/10",
  },
  {
    description: "Produce limitless code",
    icon: Code,
  },
];

interface ProModalProps {
  onUpgrade: () => void;
}

export default function ProModal({ onUpgrade }: ProModalProps) {
  const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="p-6 sm:w-[450px] sm:p-10">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center pb-2">
            <div className="rounded-lg bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 px-5 py-3 text-white sm:px-7">
              PRO
            </div>
            <h1 className="pb-2 pt-5 text-3xl font-bold sm:text-4xl">
              Rp. 50.000
            </h1>
            <p className="text-sm text-muted-foreground">
              per 30 days, billed manually.
            </p>
          </DialogTitle>
          <hr className="py-2 sm:py-3" />
          <DialogDescription className="bt-5 flex flex-col gap-3">
            {contents.map((item) => (
              <div key={item.description} className="flex items-center gap-4">
                <item.icon className="h-6 w-6" />
                <p className="text-start">{item.description}</p>
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="mt-5 w-full"
            onClick={onUpgrade}
          >
            Upgrade Now <Zap className="ml-2 h-4 w-4 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
