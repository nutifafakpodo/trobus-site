import type * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bus,
  CreditCard,
  Gauge,
  History,
  KeyRound,
  Landmark,
  MapPinned,
  Plus,
  Radio,
  Repeat,
  ShieldCheck,
  Sparkles,
  Ticket,
  TriangleAlert,
  Users,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/button";
import { EASE, Eyebrow, Reveal, Section, Stagger, StaggerItem } from "@/components/motion";
import { TapDemo } from "@/components/tap-demo";
import { FareCalculator } from "@/components/fare-calculator";
import { SettlementStatement } from "@/components/settlement";
import { NetworkPanel } from "@/components/network-panel";
import {
  FAQ,
  FLEET_POINTS,
  NETWORK_POINTS,
  PROBLEMS,
  RIDER_POINTS,
  RIDE_STEPS,
  ROAD_POINTS,
} from "@/lib/content";
import { LINKS } from "@/lib/links";

const RIDER_ICONS: LucideIcon[] = [BadgeCheck, CreditCard, Ticket, Sparkles, History, Users];
const NETWORK_ICONS: LucideIcon[] = [MapPinned, Gauge, Landmark, TriangleAlert, ShieldCheck, Radio];
const ROAD_ICONS: LucideIcon[] = [WifiOff, Repeat, KeyRound, ShieldCheck];

export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <Problem />
      <HowItWorks />
      <Riders />
      <Fleet />
      <Network />
      <Road />
      <Faq />
      <Contact />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lead,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-ink-100 sm:text-5xl">{title}</h2>
      {lead && <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-400">{lead}</p>}
    </Reveal>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const words = ["Tap on.", "Tap off.", "Fare paid."];

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-ink-900/70 px-3 py-1.5 text-xs text-ink-200">
              <Bus className="size-3.5 text-route-400" aria-hidden="true" />
              Fare payments for Ghana&rsquo;s trotros and buses
            </p>
          </Reveal>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-ink-100 sm:text-7xl">
            {words.map((word, index) => (
              <motion.span
                key={word}
                className={index === 2 ? "block text-tap-400" : "block"}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.14 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-400 sm:text-xl">
              Trobus replaces cash fares with a card tap. Riders pay the published fare, drivers and owners are paid
              every day, and every trip leaves a record.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={LINKS.pilot} className="px-6 py-3 text-base">
                Bring Trobus to your route <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="#how" variant="secondary" className="px-6 py-3 text-base">
                See how a ride works <ArrowDown className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="pt-6 lg:pt-0">
          <TapDemo />
        </Reveal>
      </div>
    </section>
  );
}

function Positioning() {
  return (
    <section className="border-y border-border bg-ink-900/50 px-5 py-14 sm:px-8">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="text-balance font-display text-2xl font-bold leading-snug tracking-tight text-ink-100 sm:text-4xl">
          Not a ride-hailing app. <span className="text-route-400">The payment rail underneath</span> the buses, routes
          and unions that already move the country.
        </p>
      </Reveal>
    </section>
  );
}

function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="The problem"
        title="Public transport runs on cash, trust and guesswork."
        lead="Every day, people across Ghana get to work, market and school on trotros and buses, and almost none of those trips is on any record. That costs everyone."
      />
      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((problem, index) => (
          <StaggerItem
            key={problem.title}
            className="rounded-2xl border border-border bg-ink-900/60 p-6 transition-colors hover:border-ink-700"
          >
            <span className="font-mono text-xs text-amber-400">0{index + 1}</span>
            <h3 className="mt-3 text-lg font-bold leading-snug text-ink-100">{problem.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">{problem.body}</p>
          </StaggerItem>
        ))}
        <StaggerItem className="flex flex-col justify-center rounded-2xl border border-route-500/30 bg-route-500/10 p-6">
          <h3 className="text-lg font-bold leading-snug text-ink-100">One tap fixes the record.</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-200">
            Once every fare is a tap, the price is fixed, the money is counted, and the trip is on record, for everyone
            who needs it.
          </p>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="How a ride works"
        title="Four moments. No cash changes hands."
        lead="A reader by the door of each vehicle does the work. The rider only taps."
      />

      <Stagger className="relative mt-14 grid gap-4 md:grid-cols-4">
        {RIDE_STEPS.map((step, index) => (
          <StaggerItem key={step.key} className="relative rounded-2xl border border-border bg-ink-900/60 p-6">
            <div className="flex items-center gap-3">
              <span
                className={
                  index === 3
                    ? "grid size-9 place-items-center rounded-full bg-tap-500/20 font-mono text-sm font-bold text-tap-300"
                    : "grid size-9 place-items-center rounded-full bg-route-500/15 font-mono text-sm font-bold text-route-300"
                }
              >
                {index + 1}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">{step.label}</span>
            </div>
            <h3 className="mt-5 text-lg font-bold leading-snug text-ink-100">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">{step.body}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-4 flex flex-col gap-4 rounded-2xl border border-border bg-ink-900/40 p-6 sm:flex-row sm:items-center">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-400/15">
          <WifiOff className="size-5 text-amber-400" aria-hidden="true" />
        </span>
        <p className="text-sm leading-relaxed text-ink-200">
          <strong className="text-ink-100">No signal on the route? It still works.</strong> The reader keeps every tap
          on the vehicle and sends them when the network comes back. Each tap counts once, however many times it&rsquo;s
          sent.
        </p>
      </Reveal>

      <div className="mt-24">
        <SectionHeading
          eyebrow="Fares"
          title={
            <>
              A fare is a formula, <span className="text-route-400">not a negotiation.</span>
            </>
          }
          lead="Each fare comes from a published table: a base fare, a rate per kilometre and a peak-hour multiplier. Move the sliders and watch the same rule price the trip."
        />
        <Reveal className="mt-10">
          <FareCalculator />
        </Reveal>
      </div>
    </Section>
  );
}

function Riders() {
  return (
    <Section id="riders">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="For riders"
            title="Pay the fare. Not a fare someone made up."
            lead="One card for every bus on the network. Know what you'll pay before you board, and keep a record of every trip."
          />
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {RIDER_POINTS.map((point, index) => {
            const Icon = RIDER_ICONS[index];
            return (
              <StaggerItem key={point.title} className="rounded-2xl border border-border bg-ink-900/60 p-6">
                <Icon className="size-5 text-route-400" aria-hidden="true" />
                <h3 className="mt-4 font-sans text-base font-semibold text-ink-100">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{point.body}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}

function Fleet() {
  return (
    <Section id="fleet">
      <SectionHeading
        eyebrow="For drivers & owners"
        title={
          <>
            Paid every day. <span className="text-tap-400">Down to the pesewa.</span>
          </>
        }
        lead="Nobody handles the cash, so nobody argues about it. At the end of each day, the fares each vehicle collected are added up and split automatically."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <Reveal>
          <SettlementStatement />
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <h3 className="flex items-center gap-2.5 font-sans text-base font-semibold text-ink-100">
              <Banknote className="size-5 text-tap-400" aria-hidden="true" /> Drivers
            </h3>
            <ul className="mt-4 space-y-3">
              {FLEET_POINTS.drivers.map((point) => (
                <Bullet key={point}>{point}</Bullet>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="flex items-center gap-2.5 font-sans text-base font-semibold text-ink-100">
              <Bus className="size-5 text-route-400" aria-hidden="true" /> Owners
            </h3>
            <ul className="mt-4 space-y-3">
              {FLEET_POINTS.owners.map((point) => (
                <Bullet key={point}>{point}</Bullet>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-ink-200">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-route-400" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function Network() {
  return (
    <Section id="network">
      <SectionHeading
        eyebrow="For unions & government"
        title="See the network, as it runs."
        lead="Every tap is a data point. Together they show where people travel, how full each route is and what was collected, so planning and tax can rest on counts instead of guesses."
      />

      <Reveal className="mt-12">
        <NetworkPanel />
      </Reveal>

      <Stagger className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {NETWORK_POINTS.map((point, index) => {
          const Icon = NETWORK_ICONS[index];
          return (
            <StaggerItem key={point.title} className="flex gap-4">
              <Icon className="mt-0.5 size-5 shrink-0 text-route-400" aria-hidden="true" />
              <div>
                <h3 className="font-sans text-base font-semibold text-ink-100">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{point.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="mt-14 rounded-2xl border border-border bg-ink-900/50 p-6 sm:p-8">
        <p className="text-pretty text-base leading-relaxed text-ink-200 sm:text-lg">
          <strong className="text-ink-100">Unions keep their routes.</strong> Trobus doesn&rsquo;t own vehicles, set
          routes or employ drivers. It records and settles what the network already does, and gives the people who run
          it the numbers to run it better.
        </p>
      </Reveal>
    </Section>
  );
}

function Road() {
  return (
    <Section id="road">
      <SectionHeading
        eyebrow="Built for the road"
        title="Made for dead zones, double taps and real money."
        lead="A payment system for public transport has to keep working when the network doesn't, and never charge anyone twice."
      />
      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
        {ROAD_POINTS.map((point, index) => {
          const Icon = ROAD_ICONS[index];
          return (
            <StaggerItem key={point.title} className="flex gap-4 rounded-2xl border border-border bg-ink-900/60 p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-route-500/15">
                <Icon className="size-5 text-route-300" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-sans text-base font-semibold text-ink-100">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{point.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
      {LINKS.developerPortal && (
        <Reveal className="mt-8">
          <Button href={LINKS.developerPortal} variant="secondary">
            Read the API docs <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </Reveal>
      )}
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading eyebrow="FAQ" title="Questions people ask first." />
        <Stagger className="divide-y divide-border border-y border-border">
          {FAQ.map((item) => (
            <StaggerItem key={item.q}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-ink-100 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    className="size-5 shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-ink-400">{item.a}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" className="pb-28">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-route-500/30 bg-gradient-to-br from-route-600/25 via-ink-900 to-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-ink-100 sm:text-5xl">
          Run Trobus on your routes.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-400">
          Trobus is getting ready for its first routes. If you run a union branch, a fleet or a transport department,
          we&rsquo;d like to set up a pilot with you.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={LINKS.pilot} className="px-6 py-3 text-base">
            Talk to us about a pilot <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <a href={`mailto:${LINKS.contactEmail}`} className="font-mono text-sm text-ink-400 hover:text-ink-100">
            {LINKS.contactEmail}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
