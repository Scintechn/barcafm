import { cn } from "@/lib/cn";

type Variant = "default" | "soft" | "dark" | "brand";

const variants: Record<Variant, string> = {
  default: "bg-white text-ink-900 dark:bg-ink-950 dark:text-ink-100",
  soft: "bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100",
  dark: "bg-ink-950 text-white",
  brand: "bg-brand-500 text-ink-950",
};

export function Section({
  children,
  className,
  variant = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-16 md:py-24", variants[variant], className)}
    >
      {children}
    </section>
  );
}
