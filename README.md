# trobus-site

Marketing website for **Trobus**, tap-to-pay fares for Ghana's trotros and buses.

Riders tap a card on and off; the fare is priced from a published fare table and taken from their wallet. At the end of each day the fares each vehicle collected are settled: commission and withholding tax come off, and the rest is split between driver and owner at their agreed share. Every tap becomes a record that unions and regulators can use. This site explains that to four audiences at once: riders, drivers and owners, unions, and government.

## Run it

```bash
pnpm install
pnpm dev
```

| Command | Does |
| --- | --- |
| `pnpm dev` | Dev server on <http://localhost:5178> |
| `pnpm build` | Production build into `dist/` |
| `pnpm preview` | Serve the built output |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm check` | typecheck + build (what CI runs) |

## Stack

Vite · React 19 · TypeScript · Tailwind 4 · Framer Motion · wouter

A static SPA with no backend: everything on the page is copy, vector and arithmetic, so it deploys as plain files.

## Configuration

Both variables are optional.

| Variable | Used for | Default |
| --- | --- | --- |
| `VITE_CONTACT_EMAIL` | "Run a pilot" CTAs and footer | `hello@trobus.gh` |
| `VITE_DEVELOPER_PORTAL_URL` | "Read the API docs" and footer link | hidden when unset |

For GitHub Pages, set them as **repository variables** (Settings → Secrets and variables → Actions → Variables). For Vercel, set them as project environment variables.

## Deployment

The same source deploys to both targets; only the base path differs, read from `BASE_PATH` in `vite.config.ts`.

- **GitHub Pages** (`.github/workflows/pages.yml`, on every push to `main`) builds with `BASE_PATH=/trobus-site/` and copies `index.html` to `404.html`, because Pages has no rewrite rules.
- **Vercel** serves from `/`, and `vercel.json` declares the build, the SPA rewrite, and cache and security headers.

## Content

All copy lives in [`src/lib/content.ts`](src/lib/content.ts). It describes what the platform does today. There are no rider counts, testimonials or partner logos, because there are none yet to show. Add social proof only when it is real and attributed.

The interactive pieces use the product's own arithmetic, ported line for line in [`src/lib/fares.ts`](src/lib/fares.ts):

- **Fare calculator**: `max(base fare, km × rate × peak multiplier inside the peak window)`, as in the trip service's `CalculateFare`.
- **Day statement**: 10% commission, 5% withholding on the remainder, then the driver/owner split, with the owner taking the rounding remainder so payouts sum exactly to net, as in the payment service's settlement `Calculate`.

The rates are labelled as examples on the page. If the product's defaults change, change them here too.

## Motion

Every animated component checks `useReducedMotion` and renders a static equivalent: the hero shows the finished trip and its receipt, and the network map shows buses parked on their routes. `index.css` also neutralises CSS animation under `prefers-reduced-motion` as a backstop.

`public/og.png` is the 1200×630 social card. It was rendered from HTML with headless Chrome; regenerate it if the headline changes.
