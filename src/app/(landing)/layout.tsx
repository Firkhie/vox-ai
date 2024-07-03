interface Props {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Props) {
  return <div>{children}</div>;
}
