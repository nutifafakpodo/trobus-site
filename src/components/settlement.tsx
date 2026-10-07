import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { SETTLEMENT, cedis, settle } from "@/lib/fares";
import { cn } from "@/lib/utils";

const SPLITS = [50, 60, 70] as const;

/**
 * One vehicle's day, settled. The bar and the statement are the same numbers
 * the settlement engine would produce: commission off the top, withholding
 * on what remains, then the agreed split, with the owner taking the rounding
 * remainder so the payouts add up exactly.
 */
export function SettlementStatement() {
  const reduce = useReducedMotion();
  const [gross, setGross] = React.useState(124000);
  const [driverShare, setDriverShare] = React.useState<number>(60);

  const s = settle(gross, driverShare);
  const segments = [
    { key: "driver", label: `Driver (${driverShare}%)`, value: s.driverPayout, className: "bg-tap-400" },
    { key: "owner", label: `Owner (${100 - driverShare}%)`, value: s.ownerPayout, className: "bg-route-500" },
    { key: "tax", label: "Withholding tax", value: s.tax, className: "bg-amber-400" },
    { key: "commission", label: "Trobus commission", value: s.commission, className: "bg-ink-600" },
  ];

  return (
    <div className="rounded-[1.75rem] border border-border bg-ink-900/70 p-5 shadow-card sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
          Day statement · bus TR-142
        </p>
        <p className="font-mono text-[11px] text-ink-600">Example figures</p>
      </div>

      <div className="mt-6 grid gap-6">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="settle-gross" className="text-sm font-medium text-ink-200">
              Fares collected today
            </label>
            <span className="whitespace-nowrap font-mono text-sm text-ink-100">{cedis(gross)}</span>
          </div>
          <input
            id="settle-gross"
            type="range"
            min={20000}
            max={300000}
            step={500}
            value={gross}
            onChange={(event) => setGross(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </div>
        <fieldset>
          <legend className="text-sm font-medium text-ink-200">Driver / owner split</legend>
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-full border border-border bg-ink-950 p-1">
            {SPLITS.map((share) => (
              <button
                key={share}
                type="button"
                onClick={() => setDriverShare(share)}
                aria-pressed={driverShare === share}
                className={cn(
                  "rounded-full px-2 py-1.5 font-mono text-xs transition-colors",
                  driverShare === share ? "bg-route-500 font-bold text-white" : "text-ink-400 hover:text-ink-100",
                )}
              >
                {share}/{100 - share}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Where every cedi went */}
      <div className="mt-8 flex h-4 w-full overflow-hidden rounded-full bg-ink-800" aria-hidden="true">
        {segments.map((segment) => (
          <motion.div
            key={segment.key}
            className={cn("h-full first:rounded-l-full last:rounded-r-full", segment.className)}
            initial={false}
            animate={{ width: `${(segment.value / s.gross) * 100}%` }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <dl className="mt-6 divide-y divide-border font-mono text-sm">
        <Row label="Fares collected" value={cedis(s.gross)} strong />
        <Row label={`Trobus commission (${SETTLEMENT.commissionBasisPoints / 100}%)`} value={`− ${cedis(s.commission)}`} dot="bg-ink-600" />
        <Row label={`Withholding tax (${SETTLEMENT.taxBasisPoints / 100}% of the rest)`} value={`− ${cedis(s.tax)}`} dot="bg-amber-400" />
        <Row label={`Driver's share (${driverShare}%)`} value={cedis(s.driverPayout)} dot="bg-tap-400" strong />
        <Row label={`Owner's share (${100 - driverShare}%)`} value={cedis(s.ownerPayout)} dot="bg-route-500" strong />
      </dl>

      <p className="mt-5 text-xs leading-relaxed text-ink-400">
        Both shares are paid into Trobus wallets in one step and always add up to the pesewa. The commission and tax
        rates are fixed in advance, the same for every vehicle.
      </p>
    </div>
  );
}

function Row({ label, value, dot, strong }: { label: string; value: string; dot?: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="flex items-center gap-2.5 text-ink-400">
        {dot && <span className={cn("size-2 shrink-0 rounded-full", dot)} aria-hidden="true" />}
        {label}
      </dt>
      <dd className={cn("shrink-0", strong ? "font-bold text-ink-100" : "text-ink-200")}>{value}</dd>
    </div>
  );
}
