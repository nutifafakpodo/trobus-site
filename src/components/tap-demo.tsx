import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { Check, Wifi } from "lucide-react";
import { EASE } from "./motion";
import { EXAMPLE_RULES, calculateFare, cedis } from "@/lib/fares";
import { cn } from "@/lib/utils";

/**
 * The whole product in one loop: a card taps on, the bus moves, the card taps
 * off, and a receipt lands with a fare priced by the same arithmetic the
 * platform uses. Under reduced motion it renders the finished trip, still.
 */

const TRIP = { from: "Madina", to: "Makola", km: 12, hour: 10, startBalance: 5000 };
const QUOTE = calculateFare(EXAMPLE_RULES.bus, TRIP.km, TRIP.hour);

type Phase = "ready" | "tapOn" | "riding" | "tapOff" | "receipt";
const SEQUENCE: { phase: Phase; ms: number }[] = [
  { phase: "ready", ms: 1400 },
  { phase: "tapOn", ms: 1500 },
  { phase: "riding", ms: 2600 },
  { phase: "tapOff", ms: 1400 },
  { phase: "receipt", ms: 3600 },
];

const SCREEN: Record<Phase, { line1: string; line2: string }> = {
  ready: { line1: "Tap card", line2: "Bus TR-142" },
  tapOn: { line1: "Tapped on", line2: `${TRIP.from} · 10:04` },
  riding: { line1: "On board", line2: `→ ${TRIP.to}` },
  tapOff: { line1: "Tapped off", line2: `${TRIP.to} · 10:41` },
  receipt: { line1: "Have a good day", line2: "Fare paid" },
};

export function TapDemo({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = React.useState(reduce ? SEQUENCE.length - 1 : 0);

  React.useEffect(() => {
    if (reduce) {
      setStep(SEQUENCE.length - 1);
      return;
    }
    const timer = window.setTimeout(
      () => setStep((current) => (current + 1) % SEQUENCE.length),
      SEQUENCE[step].ms,
    );
    return () => window.clearTimeout(timer);
  }, [step, reduce]);

  const phase = SEQUENCE[step].phase;
  const tapping = phase === "tapOn" || phase === "tapOff";
  const confirmed = tapping || phase === "receipt";
  const progress = phase === "ready" || phase === "tapOn" ? 0 : 1;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[440px] rounded-[2rem] border border-border bg-ink-900/80 p-5 shadow-card sm:p-6",
        className,
      )}
      role="img"
      aria-label={`Example trip: tap on at ${TRIP.from}, tap off at ${TRIP.to}, ${TRIP.km} kilometres by city bus, fare ${cedis(QUOTE.fare)} taken from the rider's wallet.`}
    >
      {/* Reader */}
      <div className="relative mx-auto flex w-[220px] flex-col items-center rounded-[1.6rem] border border-ink-700 bg-gradient-to-b from-ink-800 to-ink-850 px-5 pb-6 pt-5 sm:w-[240px]">
        <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
          <span>Trobus</span>
          <Wifi className="size-3.5" aria-hidden="true" />
        </div>

        <div className="mt-3 w-full rounded-xl border border-ink-700 bg-ink-950 px-3 py-2.5 font-mono">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={phase}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <p className={cn("text-sm font-bold", confirmed ? "text-tap-300" : "text-ink-100")}>
                {SCREEN[phase].line1}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-400">{SCREEN[phase].line2}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tap target with its signal rings */}
        <div className="relative mt-6 grid size-28 place-items-center">
          {!reduce &&
            [0, 1].map((ring) => (
              <motion.span
                key={ring}
                className={cn(
                  "absolute inset-0 rounded-full border",
                  confirmed ? "border-tap-400/60" : "border-route-400/40",
                )}
                animate={{ scale: [0.7, 1.25], opacity: [0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: ring * 0.9, ease: "easeOut" }}
              />
            ))}
          <span
            className={cn(
              "grid size-20 place-items-center rounded-full border-2 transition-all duration-300",
              confirmed
                ? "border-tap-400 bg-tap-500/15 shadow-tap"
                : "border-route-400/60 bg-route-500/10",
            )}
          >
            {confirmed ? (
              <Check className="size-8 text-tap-300" strokeWidth={3} aria-hidden="true" />
            ) : (
              <span className="size-3 rounded-full bg-route-400" />
            )}
          </span>

          {/* The card */}
          {!reduce && (
            <motion.div
              className="absolute left-1/2 top-1/2 h-[68px] w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-br from-route-400 to-route-600 p-2.5 shadow-[0_18px_40px_-12px_hsl(217_91%_50%/0.8)]"
              initial={false}
              animate={
                tapping
                  ? { x: 0, y: 0, rotate: -4, opacity: 1 }
                  : { x: 120, y: 70, rotate: 10, opacity: 0 }
              }
              transition={{ duration: 0.55, ease: EASE }}
              aria-hidden="true"
            >
              <span className="block font-display text-[11px] font-bold text-white">Trobus</span>
              <span className="mt-4 block font-mono text-[9px] tracking-widest text-white/80">
                •••• 0142
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* The journey */}
      <div className="mt-6 px-1">
        <div className="flex items-center justify-between font-mono text-[11px] text-ink-400">
          <span>{TRIP.from}</span>
          <span>{TRIP.to}</span>
        </div>
        <div className="relative mt-2 h-1.5 rounded-full bg-ink-800">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-route-500"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: reduce ? 0 : phase === "riding" ? 2.4 : 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-900 bg-route-300"
            initial={false}
            animate={{ left: `${progress * 100}%` }}
            transition={{ duration: reduce ? 0 : phase === "riding" ? 2.4 : 0.3, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Receipt */}
      <AnimatePresence>
        {phase === "receipt" && (
          <motion.div
            className="absolute -right-2 -top-5 w-[210px] rounded-2xl border border-tap-400/30 bg-ink-850/95 p-4 font-mono shadow-card backdrop-blur sm:-right-8"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            aria-hidden="true"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-tap-300">SMS · Trobus</p>
            <p className="mt-2 text-xs text-ink-200">
              {TRIP.from} → {TRIP.to}
            </p>
            <p className="text-[11px] text-ink-400">{TRIP.km.toFixed(1)} km · City bus · off-peak</p>
            <div className="mt-3 flex items-baseline justify-between border-t border-border pt-2">
              <span className="text-[11px] text-ink-400">Fare</span>
              <span className="text-base font-bold text-ink-100">{cedis(QUOTE.fare)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-ink-400">Balance</span>
              <span className="text-xs text-ink-200">{cedis(TRIP.startBalance - QUOTE.fare)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
