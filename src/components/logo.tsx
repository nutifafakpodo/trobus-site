import { cn } from "@/lib/utils";

/**
 * Wordmark.
 *
 * The mark is a card mid-tap: a rounded tile with the reader's signal arcs
 * coming off it, and the green dot that says the tap registered.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden="true">
      <rect x="2" y="6" width="20" height="20" rx="5" className="fill-route-500" />
      <path
        d="M7.5 14.5h9M7.5 18.5h5.5"
        className="stroke-white/90"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M25 11a8 8 0 0 1 0 10" className="stroke-route-300" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M28.5 8a12.5 12.5 0 0 1 0 16" className="stroke-route-300/50" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="10" r="2.6" className="fill-tap-400" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Mark />
      <span className="font-display text-lg font-bold tracking-tight text-ink-100">Trobus</span>
    </span>
  );
}
