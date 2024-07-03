import Image from "next/image";

interface EmptyProps {
  description: string;
}

export default function Empty({ description }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-14">
      <div className="relative h-64 w-64">
        <Image alt="empty" src="/empty.png" fill />
      </div>
      <p className="text-center text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
