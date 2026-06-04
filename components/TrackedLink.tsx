"use client";

import { track } from "@vercel/analytics";
import { cn } from "@/lib/cn";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  eventProps?: Record<string, string | number | boolean>;
};

export function TrackedLink({ event, eventProps, className, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      className={cn(className)}
      onClick={(e) => {
        track(event, eventProps);
        rest.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
