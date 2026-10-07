/**
 * The fare and settlement arithmetic, ported line for line from the product
 * (services/trip CalculateFare and services/payment Calculate), so a figure on
 * this site is the figure the platform would produce for the same inputs.
 *
 * Money is held in pesewas throughout, as it is in the product.
 */

export type VehicleType = "bus" | "minibus";

export interface FareRule {
  name: string;
  baseFare: number; // pesewas
  perKmRate: number; // pesewas per km
  peakMultiplier: number;
  peakStartHour: number;
  peakEndHour: number;
}

/** Example rules. Real tables are set and approved region by region. */
export const EXAMPLE_RULES: Record<VehicleType, FareRule> = {
  bus: {
    name: "City bus",
    baseFare: 250,
    perKmRate: 90,
    peakMultiplier: 1.25,
    peakStartHour: 7,
    peakEndHour: 9,
  },
  minibus: {
    name: "Trotro (minibus)",
    baseFare: 200,
    perKmRate: 80,
    peakMultiplier: 1.25,
    peakStartHour: 7,
    peakEndHour: 9,
  },
};

export interface FareQuote {
  distanceFare: number;
  peakApplied: boolean;
  minimumApplied: boolean;
  fare: number;
}

export function isPeak(rule: FareRule, hour: number): boolean {
  const { peakStartHour: start, peakEndHour: end } = rule;
  if (start === end) return false;
  if (start < end) return hour >= start && hour < end;
  return hour >= start || hour < end;
}

export function calculateFare(rule: FareRule, distanceKm: number, hour: number): FareQuote {
  let distanceFare = distanceKm * rule.perKmRate;
  const peakApplied = isPeak(rule, hour) && rule.peakMultiplier > 0;
  if (peakApplied) distanceFare *= rule.peakMultiplier;

  const rounded = Math.round(distanceFare);
  const minimumApplied = rounded < rule.baseFare;
  return {
    distanceFare: rounded,
    peakApplied,
    minimumApplied,
    fare: minimumApplied ? rule.baseFare : rounded,
  };
}

/** Commission 10.00% of gross; withholding 5.00% of what remains. */
export const SETTLEMENT = { commissionBasisPoints: 1000, taxBasisPoints: 500 } as const;

export interface Settlement {
  gross: number;
  commission: number;
  tax: number;
  net: number;
  driverPayout: number;
  ownerPayout: number;
}

/**
 * Integer division on pesewas, and the owner takes the remainder, so the two
 * payouts always sum exactly to net — the same rule the settlement engine uses.
 */
export function settle(gross: number, driverShare: number): Settlement {
  const commission = Math.trunc((gross * SETTLEMENT.commissionBasisPoints) / 10000);
  const taxable = gross - commission;
  const tax = Math.trunc((taxable * SETTLEMENT.taxBasisPoints) / 10000);
  const net = gross - commission - tax;
  const driverPayout = Math.trunc((net * driverShare) / 100);
  return { gross, commission, tax, net, driverPayout, ownerPayout: net - driverPayout };
}

/** GHS 10.80 — always two decimals, because a fare is exact to the pesewa. */
export function cedis(pesewas: number): string {
  return `GH₵ ${(pesewas / 100).toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
