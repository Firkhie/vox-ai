import { AudioLines } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg bg-[#0c182d]/90 p-4 text-white md:p-5">
      <div className="relative h-10 w-10 animate-spin">
        <AudioLines className="h-full w-full" />
      </div>
      <p className="text-sm">VoxAI is thinking...</p>
    </div>
  );
}
