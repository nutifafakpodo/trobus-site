/**
 * All site copy in one place.
 *
 * Rule for anything added here: describe what the platform does, not what we
 * hope it will do. There are no rider counts, testimonials or partner logos,
 * because there are none yet to show. Figures in the interactive pieces are
 * labelled as examples and come from the product's own arithmetic.
 */

export const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Riders", href: "#riders" },
  { label: "Drivers & owners", href: "#fleet" },
  { label: "Unions & government", href: "#network" },
  { label: "FAQ", href: "#faq" },
] as const;

export const PROBLEMS = [
  {
    title: "The fare depends on who's asking.",
    body: "Same route, same day, different price. Riders with the least leverage, often women, students and older people, pay the most and have no receipt to dispute it.",
  },
  {
    title: "Owners can't see what was collected.",
    body: "The driver hands over a figure at the end of the day. Nobody can check it, so owners and drivers end up arguing about money nobody can account for.",
  },
  {
    title: "A sector the tax system can't see.",
    body: "Millions of fares are paid in cash every day, and almost none of it is on any record. A trip that isn't recorded can't be taxed.",
  },
  {
    title: "Planners are guessing.",
    body: "There's no record of where people travel or when. Routes and terminals are planned from tradition and hunches, not counts.",
  },
  {
    title: "No record when something goes wrong.",
    body: "After an accident or a dispute there's no manifest, no trip log and no driver on record. Only eyewitnesses.",
  },
] as const;

export const RIDE_STEPS = [
  {
    key: "on",
    label: "Tap on",
    title: "Tap your card as you board.",
    body: "A green light and a beep. The reader by the door records where and when you got on.",
  },
  {
    key: "ride",
    label: "Ride",
    title: "No cash, no change, no haggling.",
    body: "Nothing to count out, no waiting for change and nothing to argue about with the mate.",
  },
  {
    key: "off",
    label: "Tap off",
    title: "Tap again as you get off.",
    body: "The reader records where the trip ended, so you pay for the distance you actually travelled.",
  },
  {
    key: "paid",
    label: "Paid",
    title: "Priced from the fare table. Paid from your wallet.",
    body: "The fare is worked out from the published table for that vehicle and time of day, then taken from your wallet, with a receipt by SMS.",
  },
] as const;

export const RIDER_POINTS = [
  {
    title: "The same fare as everyone else",
    body: "Your fare comes from the published table for that vehicle type, distance and time of day. Who you are doesn't come into it.",
  },
  {
    title: "Top up with mobile money or card",
    body: "Top up in the Trobus app through Paystack. Your balance goes up as soon as the payment is confirmed.",
  },
  {
    title: "Your card is your ticket",
    body: "Riding needs only your Trobus card. No smartphone, no data bundle and no signal on the bus.",
  },
  {
    title: "Short one day? You still ride.",
    body: "If your balance doesn't cover a fare, the trip goes on record as owed and comes off your next top-up. Nobody gets turned away at the door.",
  },
  {
    title: "Every trip on record",
    body: "Trips, fares, top-ups and receipts sit in your history, so you can check every pesewa and see where your transport money goes.",
  },
  {
    title: "Hold a seat",
    body: "See the buses on your route and reserve a seat from your stop to where you're going. Seats are never booked past what the bus can carry.",
  },
] as const;

export const FLEET_POINTS = {
  drivers: [
    "See what you've earned today, trip by trip.",
    "Your share is paid into your Trobus wallet when the day is settled.",
    "No cash to count, guard or hand over.",
    "No end-of-day argument about what the bus made.",
  ],
  owners: [
    "Register your vehicles and see what each one actually collected.",
    "Assign drivers at the split you agreed: 60/40, 50/50, whatever you've settled on.",
    "Change drivers whenever you need to. Each day is paid at the split in force that day.",
    "See who was on board and who was driving, for every trip.",
  ],
} as const;

export const NETWORK_POINTS = [
  {
    title: "Live fleet",
    body: "Where every vehicle is right now, updated as it moves.",
  },
  {
    title: "Route demand",
    body: "How full each route is, rated from seats on board against riders waiting.",
  },
  {
    title: "Revenue and tax",
    body: "Fares collected and tax withheld each day, read from the settled ledger rather than estimated.",
  },
  {
    title: "Compliance",
    body: "Problems surface on their own: unregistered cards, suspended vehicles still running, trips with no fare rule, missed tap-offs.",
  },
  {
    title: "Manifests and incidents",
    body: "Who was on board and which driver was operating. Incidents are logged, assigned and tracked until they're resolved.",
  },
  {
    title: "An API for builders",
    body: "Journey planners, insurers and city systems can read fleet positions and route demand through a keyed public API.",
  },
] as const;

export const ROAD_POINTS = [
  {
    title: "Works without signal",
    body: "The reader keeps every tap on the vehicle and sends them when the network comes back. A dead zone doesn't lose a single fare.",
  },
  {
    title: "Each fare is charged once",
    body: "Every tap and every trip carries its own ID. If a reader sends the same batch twice, nobody is charged twice.",
  },
  {
    title: "Readers belong to vehicles",
    body: "Each reader has a key tied to the vehicle it's fitted in. It can't report taps for any other vehicle.",
  },
  {
    title: "Payments are checked twice",
    body: "A top-up is credited only after Paystack's signed notice and our own check with Paystack agree on the amount. Anything that doesn't match goes to a person to review.",
  },
] as const;

export const FAQ = [
  {
    q: "Do riders need a smartphone?",
    a: "Not to ride. The Trobus card is the ticket, and the reader on the bus does the work. Today, top-ups go through the Trobus app with mobile money or card.",
  },
  {
    q: "Who sets the fares?",
    a: "Fares come from a fare table for each region and vehicle type, with a base fare, a rate per kilometre and an optional peak-hour multiplier. The table is approved and published, and the same table prices every rider. Trobus doesn't decide fares; it applies them.",
  },
  {
    q: "What happens when there's no network on the route?",
    a: "Riders board and tap as normal. The reader stores the taps on the vehicle and sends them when it reconnects. Fares are taken then, and receipts follow.",
  },
  {
    q: "What if my balance runs out mid-week?",
    a: "You still ride. The fare is recorded as owed and comes off your next top-up, oldest first. Nothing is hidden: what you owe shows in the app.",
  },
  {
    q: "How do drivers and owners get paid?",
    a: "At the end of each day, the fares each vehicle collected are added up. Trobus's commission and withholding tax are taken off, and the rest is split between driver and owner at their agreed share and paid into their wallets.",
  },
  {
    q: "What does Trobus cost?",
    a: "Riders pay the fare and nothing more. Trobus earns a commission on the fares it collects, taken at settlement before drivers and owners are paid, so every deduction appears on the day's statement.",
  },
  {
    q: "Does Trobus replace the unions or run routes?",
    a: "No. Trobus doesn't own vehicles, set routes or employ drivers. It's the payment and record-keeping layer underneath the network that already exists, and unions keep control of their routes.",
  },
] as const;
