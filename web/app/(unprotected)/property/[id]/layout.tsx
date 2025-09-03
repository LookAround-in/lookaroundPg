import PageTransition from "@/components/layout/PageTransition";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition>{children}</PageTransition>
  );
}