import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-route-500 text-white hover:bg-route-400 font-semibold shadow-[0_10px_30px_-12px_hsl(217_91%_60%/0.7)]",
  secondary:
    "border border-ink-600 text-ink-100 hover:border-route-400 hover:bg-route-500/10",
  ghost: "text-ink-200 hover:text-ink-100 hover:bg-ink-800",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-colors duration-200",
    VARIANTS[variant],
    className,
  );

  // Links out to the apps are external, so they carry rel=noreferrer.
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
