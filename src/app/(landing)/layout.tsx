interface Props {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171f41] to-[#01050c] lg:h-full">
      <div className="mx-auto h-full max-w-screen-xl">{children}</div>
    </div>
  );
}
