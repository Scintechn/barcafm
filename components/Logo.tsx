import { cn } from "@/lib/cn";

export function Logo({
  withWordmark = true,
  className,
  monochrome = false,
}: {
  withWordmark?: boolean;
  className?: string;
  monochrome?: boolean;
}) {
  const mark = monochrome ? "currentColor" : "#7cc42a";
  const inner = monochrome ? "currentColor" : "#fff";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill={mark} />
        <path
          d="M21 18h14c5.5 0 9.5 3 9.5 7.8 0 3.4-1.9 5.7-4.8 6.7v.2c3.6.7 6 3.4 6 7.4 0 5.6-4.4 8.9-10.6 8.9H21V18zm12.6 12.6c3.3 0 5.4-1.5 5.4-4.2 0-2.6-1.8-4.1-4.9-4.1H27.4v8.3h6.2zm.6 14.1c3.5 0 5.6-1.6 5.6-4.5s-2.2-4.4-5.9-4.4h-6.5v8.9h6.8z"
          fill={monochrome ? "transparent" : inner}
          stroke={monochrome ? "currentColor" : "none"}
          strokeWidth={monochrome ? "0" : undefined}
        />
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-extrabold tracking-tight">
            Barca FM
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            99.6
          </span>
        </span>
      )}
    </span>
  );
}
