import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { EXAMPLE_RULES, calculateFare, cedis, isPeak, type VehicleType } from "@/lib/fares";
import { cn } from "@/lib/utils";

const pad = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

/**
 * "A fare is a formula": the reader can move distance and time and watch the
 * same rule price the trip, line by line. Nothing here is negotiable, which is
 * the point.
 */
export function FareCalculator() {
  const reduce = useReducedMotion();
  const [vehicle, setVehicle] = React.useState<VehicleType>("bus");
  const [km, setKm] = React.useState(12);
  const [hour, setHour] = React.useState(8);

  const rule = EXAMPLE_RULES[vehicle];
  const quote = calculateFare(rule, km, hour);
  const peak = isPeak(rule, hour);
  const rawDistance = Math.round(km * rule.perKmRate);

  return (
    <div className="grid gap-6 rounded-[1.75rem] border border-border bg-ink-900/70 p-5 shadow-card sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      <div className="space-y-7">
        <fieldset>
          <legend className="text-sm font-medium text-ink-200">Vehicle</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-full border border-border bg-ink-950 p-1">
            {(Object.keys(EXAMPLE_RULES) as VehicleType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setVehicle(type)}
                aria-pressed={vehicle === type}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors",
                  vehicle === type ? "bg-route-500 font-semibold text-white" : "text-ink-400 hover:text-ink-100",
                )}
              >
                {EXAMPLE_RULES[type].name}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="fare-km" className="text-sm font-medium text-ink-200">
              Distance
            </label>
            <span className="font-mono text-sm text-ink-100">{km.toFixed(1)} km</span>
          </div>
          <input
            id="fare-km"
            type="range"
            min={0.5}
            max={30}
            step={0.5}
            value={km}
            onChange={(event) => setKm(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="fare-hour" className="text-sm font-medium text-ink-200">
              Time you tap on
            </label>
            <span className={cn("font-mono text-sm", peak ? "text-amber-400" : "text-ink-100")}>
              {pad(hour)} {peak ? "· peak" : "· off-peak"}
            </span>
          </div>
          <input
            id="fare-hour"
            type="range"
            min={5}
            max={22}
            step={1}
            value={hour}
            onChange={(event) => setHour(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </div>

        <p className="text-xs leading-relaxed text-ink-400">
          Example rates for a city fare table. Real tables are set per region and vehicle type, approved, and published.
        </p>
      </div>

      <div className="flex flex-col rounded-2xl border border-border bg-ink-950/80 p-5 font-mono sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">{rule.name} · fare table</p>

        <dl className="mt-5 space-y-3 text-sm">
          <Line
            label={`${km.toFixed(1)} km × ${cedis(rule.perKmRate)}`}
            value={cedis(rawDistance)}
          />
          <Line
            label={`Peak ${pad(rule.peakStartHour)}–${pad(rule.peakEndHour)} × ${rule.peakMultiplier}`}
            value={quote.peakApplied ? cedis(quote.distanceFare) : "not now"}
            active={quote.peakApplied}
            tone="amber"
          />
          <Line
            label={`Minimum fare ${cedis(rule.baseFare)}`}
            value={quote.minimumApplied ? "applies" : "—"}
            active={quote.minimumApplied}
            tone="amber"
          />
        </dl>

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between border-t border-border pt-5">
            <span className="text-sm text-ink-400">Fare</span>
            <motion.span
              key={quote.fare}
              initial={reduce ? false : { opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="font-display text-4xl font-bold tracking-tight text-ink-100 sm:text-5xl"
              aria-live="polite"
            >
              {cedis(quote.fare)}
            </motion.span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-tap-300">
            Every rider on this trip, at this hour, pays exactly this.
          </p>
        </div>
      </div>
    </div>
  );
}

function Line({
  label,
  value,
  active = true,
  tone,
}: {
  label: string;
  value: string;
  active?: boolean;
  tone?: "amber";
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4 transition-opacity", !active && "opacity-45")}>
      <dt className="text-ink-400">{label}</dt>
      <dd className={cn("shrink-0", active && tone === "amber" ? "text-amber-400" : "text-ink-100")}>{value}</dd>
    </div>
  );
}
