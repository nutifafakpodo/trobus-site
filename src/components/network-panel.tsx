import { useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * What a regulator or union sees: vehicles moving on their routes, how full
 * each route is, and problems the platform has found by itself.
 *
 * The demand levels use the product's own thresholds (critical from 90% of
 * seats in use, high from 70%, normal from 30%). The routes and loads shown
 * are illustrative.
 */

const ROUTES = [
  { id: "a", name: "Madina – Circle", d: "M352 34 C 300 70, 250 92, 210 118 S 120 170, 70 214", color: "stroke-route-500", bar: "bg-route-500", load: 0.94 },
  { id: "b", name: "Achimota – 37", d: "M168 26 C 190 70, 218 110, 236 150 S 270 214, 320 236", color: "stroke-tap-400", bar: "bg-tap-400", load: 0.76 },
  { id: "c", name: "Kaneshie – Makola", d: "M34 128 C 80 150, 120 180, 160 196 S 230 222, 262 240", color: "stroke-amber-400", bar: "bg-amber-400", load: 0.48 },
] as const;

// `at` is where each bus sits when motion is reduced: a point on its route.
const VEHICLES = [
  { route: "a", dur: 14, begin: 0, at: [276, 80] },
  { route: "a", dur: 14, begin: -6, at: [210, 118] },
  { route: "a", dur: 14, begin: -10, at: [144, 159] },
  { route: "b", dur: 12, begin: -2, at: [204, 90] },
  { route: "b", dur: 12, begin: -8, at: [266, 200] },
  { route: "c", dur: 16, begin: -4, at: [99, 164] },
] as const;

function level(load: number) {
  if (load >= 0.9) return { label: "critical", className: "bg-flag-400/15 text-flag-400" };
  if (load >= 0.7) return { label: "high", className: "bg-amber-400/15 text-amber-300" };
  if (load >= 0.3) return { label: "normal", className: "bg-tap-400/15 text-tap-300" };
  return { label: "low", className: "bg-ink-700 text-ink-400" };
}

const FINDINGS = [
  "Suspended vehicle still taking taps",
  "Trips completed without a fare rule",
  "Missed tap-offs on Madina – Circle",
] as const;

export function NetworkPanel() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-ink-900/80 shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            {!reduce && <span className="absolute inline-flex size-full animate-ping rounded-full bg-tap-400 opacity-60" />}
            <span className="relative inline-flex size-2 rounded-full bg-tap-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-200">Network · live</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-600">Illustrative</span>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="relative border-b border-border lg:border-b-0 lg:border-r">
          <svg viewBox="0 0 400 260" className="h-auto w-full" role="img" aria-label="Map of three routes with buses moving along them">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" className="stroke-ink-800" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="400" height="260" fill="url(#grid)" />
            {ROUTES.map((route) => (
              <g key={route.id}>
                <path d={route.d} fill="none" className={cn(route.color, "opacity-25")} strokeWidth="10" strokeLinecap="round" />
                <path d={route.d} fill="none" className={route.color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" />
              </g>
            ))}
            {VEHICLES.map((vehicle, index) => {
              const route = ROUTES.find((r) => r.id === vehicle.route)!;
              return reduce ? (
                <circle key={index} cx={vehicle.at[0]} cy={vehicle.at[1]} r="6.5" className="fill-ink-950 stroke-ink-100" strokeWidth="2" />
              ) : (
                <circle key={index} r="6.5" className="fill-ink-950 stroke-ink-100" strokeWidth="2">
                  <animateMotion dur={`${vehicle.dur}s`} begin={`${vehicle.begin}s`} repeatCount="indefinite" path={route.d} />
                </circle>
              );
            })}
          </svg>
        </div>

        <div className="p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">Route demand</p>
          <ul className="mt-4 space-y-4">
            {ROUTES.map((route) => {
              const lvl = level(route.load);
              return (
                <li key={route.id}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-ink-200">{route.name}</span>
                    <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", lvl.className)}>
                      {lvl.label}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-ink-800">
                    <div
                      className={cn("h-full rounded-full", route.bar)}
                      style={{ width: `${route.load * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-ink-600">{Math.round(route.load * 100)}% of seats in use</p>
                </li>
              );
            })}
          </ul>

          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">Compliance</p>
          <ul className="mt-3 space-y-2">
            {FINDINGS.map((finding) => (
              <li key={finding} className="flex items-start gap-2.5 text-sm text-ink-200">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden="true" />
                {finding}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
