interface Props {
  children: React.ReactNode;
}

export default function PaymentLayout({ children }: Props) {
  return <div className="h-full">{children}</div>;
}
