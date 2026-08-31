# Dev Notes — Bankster

Working notes for this project. Last updated: 2026-08-30.

Bankster is a **marketing website** for a fictional digital bank, built purely as
a front-end work example / portfolio piece. No real services, accounts or
payments exist and no data is processed (see `/impressum`).

Since 2026-08-30 the site is a **Next.js 16 (App Router) + TypeScript + Tailwind
CSS v4** app (migrated from a plain static HTML/CSS/JS site — see the migration
session log below).

---

## Stack & structure

- **Next.js 16** App Router, **React 19**, **TypeScript** (strict), **Tailwind CSS v4**.
- Fully static output — every route is prerendered (`○ (Static)`); no server code.
- External resources via CDN: Font Awesome 6.5.1 (`<link>` in the root layout).
- Google Font "Kumbh Sans" via `next/font` (self-hosted, `--font-kumbh-sans`).
- The hand-written design system lives in `app/globals.css` (design tokens +
  every component class, ported verbatim from the old `styles.css`). Tailwind
  utilities sit on top for new work; `@theme inline` exposes the brand tokens
  (`bg-brand`, `text-ink`, …).

| Path | Purpose |
| --- | --- |
| `app/layout.tsx` | Root layout: `<html>`, font, FA `<link>`, `<Navbar>` + `<Footer>`, metadata + title template |
| `app/page.tsx` | Landing page: hero, partner marquee, features, pricing + disclaimer modal |
| `app/services/page.tsx` | Services overview (page header + 6 cards) |
| `app/pricing/page.tsx` | Pricing plans, monthly/yearly toggle |
| `app/signup/page.tsx` | Demo sign-up page (client-side form only, no backend) |
| `app/impressum/page.tsx` | Legal notice (§ 5 DDG), `robots: noindex` |
| `app/globals.css` | Tailwind import + design tokens + all component styles |
| `components/Navbar.tsx` | `"use client"` — mobile nav, scroll state, active link (`usePathname`) |
| `components/Footer.tsx` | Server component; shared footer + social links |
| `components/DisclaimerModal.tsx` | `"use client"` — portfolio disclaimer, focus trap, Esc/backdrop close |
| `components/PricingPlans.tsx` | `"use client"` — monthly/yearly toggle + plan cards (used on `/` and `/pricing`) |
| `components/SignupForm.tsx` | `"use client"` — demo form, `preventDefault`, status message |
| `components/Reveal.tsx` | `"use client"` — `IntersectionObserver` scroll-reveal wrapper |
| `components/LogoMarquee.tsx` | Server component; duplicated track for a seamless CSS loop |
| `public/images/pic01.svg` | Hero illustration (only asset) |
| `next.config.ts` | `.html` → clean-URL redirects (308), `turbopack.root` pin |

### Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run typecheck
```

---

## Session log — 2026-08-30

### 1. Full UX/UI refresh (restrained "premium fintech" direction)

`styles.css` — rewritten around a design-token system:
- Tokens: brand colours (`--brand`, `--brand-strong` for text-on-white), ink scale,
  surfaces, borders, radius, shadow, layout (`--nav-h`, `--maxw`, `--gutter`), motion.
- Fluid type with `clamp()`, `text-wrap: pretty`, tighter heading tracking.
- Global `:focus-visible` ring; `prefers-reduced-motion` block that neutralises
  animations/transitions and shows `.reveal` elements immediately.

Fixed UX bugs that existed before:
- Hero CTA was a `<button>` with no handler → now real `<a>` links
  ("Open your account" → `signup.html`, "See pricing" → `#pricing`).
- All "Sign Up" links pointed to a non-existent `/signup.html` (404) →
  created `signup.html`; switched every link to **relative** paths so the site
  works from any host / subpath.
- Hamburger icon was invisible: a global `.fa-solid { color:#fff }` rule made it
  white on the light navbar → removed; icon now visible and toggles to `fa-xmark`.
- Mobile menu never worked: JS toggled `is-active` on the button while CSS
  expected `.active` on the menu, and it never closed → rewritten (see below).
- Fixed navbar had no page offset → on `services.html` / `pricing.html` the H1
  sat behind the bar → `body { padding-top: var(--nav-h) }` +
  `scroll-padding-top` so anchor jumps land correctly.
- Hero text was white on `#d6cbcb` (WCAG fail) → dark warm gradient hero, white text.
- Every page `<title>` was "Website03" → descriptive titles + `meta description`.
- Footer linked 5x to dead pages (`/testimonials.html` etc.) → trimmed to real targets.

Visual:
- "Why choose us" is now a light section with icon badges (was harsh full-orange
  with pure-black cards).
- Pricing: **"Most popular"** highlight on the Standard plan; cards on a grid,
  top-aligned; toggle labels are clickable `<button>`s; adds a
  "billed monthly / annually" line; "Save 20%" badge only visible on yearly.
- Partner logo marquee: masked edges, muted colour, seamless loop via a JS-cloned
  track; pauses on hover; disabled under reduced-motion.
- Navbar gains a border/shadow after scrolling; active nav item via `aria-current`.
- Subtle `IntersectionObserver` scroll-reveal on section headings and cards.

`app.js` — rewritten as small IIFEs:
- `mobileNav()` — accessible toggle: `is-active` on menu, `aria-expanded`,
  icon swap, body scroll-lock, closes on link click / Esc / resize > 768px.
- `navScroll()` — `.is-scrolled` class past 8px.
- `activeNav()` — sets `aria-current="page"` from `location.pathname`.
- `marquee()` — clones the logo track (`aria-hidden`), disables animation under
  reduced-motion.
- `pricingToggle()` — **fixed the original bug**: old code did
  `NodeList.style.display` (throws). Now uses a `change` listener, toggles
  `.hidden`, updates billing text + labels + save badge; labels are clickable.
- `scrollReveal()` — IntersectionObserver; falls back to "show all" without IO
  or under reduced-motion.
- `footerYear()` — fills `#year`.
- `disclaimerModal()` — see below.
- `signupForm()` — `preventDefault`, shows a status message, resets. No network.

New pages: `signup.html` (form + benefits aside), plus `services.html` /
`pricing.html` got real page headers and a consistent footer.

### 2. Disclaimer modal (this session's request)

- Markup in `index.html` only (`#disclaimer-modal`, `role="dialog"`,
  `aria-modal`, `aria-labelledby` / `aria-describedby`).
- CSS `.modal` / `.modal__dialog` in `styles.css`; `body.modal-open { overflow:hidden }`.
- `disclaimerModal()` in `app.js` opens it on **every** page load — deliberately
  no `localStorage`, so it reappears each visit. Closes via "Verstanden" button,
  backdrop click or Esc; basic focus trap (Tab cycles inside the dialog);
  restores focus to the previously-focused element on close.
- Copy: states it is a portfolio/demo project, **no real services / accounts /
  bank products**, no data processed; links to `impressum.html`.

### 3. Impressum (this session's request)

- New `impressum.html`, `lang="de"`, `meta robots noindex`, same nav/footer shell.
- § 5 DDG data:
  - **Maik Bock, Vossbicke 18, 51702 Bergneustadt, Deutschland**
- Prominent callout that no services are offered and no data is processed.
- Contact routed to the developer site (no private email exposed).
- Standard short "Haftung für Inhalte / Links / Urheberrecht" text.
- Linked from the footer "Company" column on **every** page.

### 4. Developer credit (this session's request)

- `styles.css`: `.website__rights a` styled for the dark footer.
- Every page footer: `Bankster <year> © All rights reserved · Developed by
  codewithmaik` → link to `https://codewithmaik.com` (new tab, `rel="noopener"`).

### 5. Repo & deployment (this session's request)

Accounts used (per global convention — new "codewithmaik" identity):
- GitHub: `codewithmaik` (`gh auth switch --hostname github.com --user codewithmaik`)
- Vercel: team `codewithmaik`, account `coding.maikel@gmail.com`

Steps:
1. `git init -b main`, `.gitignore` (`.DS_Store`, `.vercel`, `node_modules/`,
   `*.log`; Vercel later added `.env*`), `README.md`.
2. Commit authored as `codewithmaik <coding.maikel@gmail.com>`.
3. `gh repo create codewithmaik/bankster --public` then `git remote add origin` +
   `git push -u origin main`.
   (`gh repo create --push` was blocked by the Claude Code auto-mode classifier,
   so repo creation and push were done as two separate commands.)
4. `vercel link --yes --scope codewithmaik --project bankster` — created the
   project and **connected the GitHub repo**, so pushes to `main` now
   auto-deploy.
5. `vercel deploy --prod --yes --scope codewithmaik`.
6. `bankster.vercel.app` is **already taken globally** (Vercel auto-aliased the
   deploy to `bankster-chi.vercel.app`; an explicit `vercel alias set
   bankster.vercel.app` failed with "already in use").
7. Fallback per request: `vercel alias set <deploy> bankster-bank.vercel.app`
   then `vercel domains add bankster-bank.vercel.app bankster` so it sticks
   across future prod deploys.

**Live URL: https://bankster-bank.vercel.app**
Repo: https://github.com/codewithmaik/bankster

---

## Session log — 2026-08-30 (part 2): migration to Next.js / TypeScript / Tailwind

Rebuilt the static site as a **Next.js 16 App Router** app with **TypeScript**
(strict) and **Tailwind CSS v4**, keeping the design 1:1.

### Approach

- Ported `styles.css` **verbatim** into `app/globals.css` under
  `@import "tailwindcss";`. The design system is class-based and token-driven, so
  rewriting it into utilities would have been high-risk churn for no visual gain.
  Tailwind is fully wired and available for new work; `@theme inline` re-exposes
  the brand tokens as utilities.
- Each `.html` page → an App Router route; shared chrome (`Navbar`, `Footer`)
  moved into `app/layout.tsx`, killing the duplicated footer markup.
- `app.js` IIFEs → small client components:
  - `Navbar` — `useState`/`useEffect` for the mobile menu + scroll state;
    active link via `usePathname` (replaces the old pathname string matching).
  - `DisclaimerModal` — same focus trap / Esc / backdrop behaviour, now
    conditionally rendered; still shows on every load, no persistence.
  - `PricingPlans` — toggle is now React state; plan data is a typed array
    rendered once and shared by `/` and `/pricing` (was duplicated markup).
  - `SignupForm` — `onSubmit` + `preventDefault`, status in state.
  - `Reveal` — `IntersectionObserver` wrapper component; SSR-safe (renders
    hidden, reveals on mount), falls back to visible without IO / under
    reduced-motion.
  - `LogoMarquee` — renders the track twice in JSX instead of cloning via JS.
- Fonts: **Kumbh Sans via `next/font`** (self-hosted, `--font-kumbh-sans`),
  so no more render-blocking Google Fonts request. Font Awesome stays on CDN
  via a `<link>` in the root layout.
- Icons in content kept as Font Awesome `<i className="fa-solid …">`.

### Config / files

- `package.json` — `next`, `react`, `react-dom` + dev deps (`typescript`,
  `@types/*`, `tailwindcss`, `@tailwindcss/postcss`). Scripts: `dev`, `build`,
  `start`, `typecheck`.
- `next.config.ts` — `reactStrictMode`, `turbopack.root` pinned (there is an
  unrelated `package-lock.json` in a parent dir), and **308 redirects** from the
  old URLs (`/index.html` → `/`, `/services.html` → `/services`, …) so existing
  links / bookmarks / search results keep working.
- `tsconfig.json`, `postcss.config.mjs`, `next-env.d.ts` — standard.
- `.gitignore` — replaced with the Next.js set (`/.next`, `/out`,
  `*.tsbuildinfo`, kept `.vercel` / `.env*` / `.DS_Store`).
- `images/pic01.svg` → `public/images/pic01.svg` (`git mv`).
- Deleted: `index.html`, `services.html`, `pricing.html`, `signup.html`,
  `impressum.html`, `styles.css`, `app.js`.

### Verification

- `npm run typecheck` — clean.
- `npm run build` — clean; all 6 routes (`/`, `/services`, `/pricing`,
  `/signup`, `/impressum`, `/_not-found`) prerendered as static content.
- `npm run start` smoke test — every route `200`, `/services.html` → `308`
  redirect, compiled CSS bundle contains the full design system.
- Visual check in Chrome was skipped — the browser extension disconnected
  mid-session. Worth an eyeball pass after the preview deploy.

### Vercel (deployed 2026-09-01)

- Merged `nextjs-migration` → `main` (fast-forward) and pushed. The GitHub
  integration auto-built a production deploy.
- **Gotcha:** the project was created with Framework Preset **"Other"** and
  Output Directory `public/`. The first deploy *built* Next.js fine (Vercel
  detects `next` in `package.json`) but then served the near-empty `public/`
  folder → every route 404'd on `bankster-bank.vercel.app`.
- Fix: `vercel project update bankster --framework nextjs --auto-detect
  build-command --auto-detect output-directory --auto-detect install-command
  --yes`, plus a committed `vercel.json` (`{ "framework": "nextjs" }`) to codify
  it. Re-deploy → all routes 200.
- `bankster-bank.vercel.app` (the public live URL) is **not** behind Deployment
  Protection and serves the site. The auto-generated `bankster-codewithmaik.vercel.app`
  / `bankster-git-main-*` domains *are* protected (302 → Vercel SSO) — expected,
  leave as-is; the public domain is what matters.
- No env vars needed.

**Verified live:** `/`, `/services`, `/pricing`, `/signup`, `/impressum` all
200; `*.html` → 308 clean-URL redirect; `_next` CSS/JS chunks + hero SVG 200;
Impressum `robots: noindex`.

---

## How to deploy again

- Push to `main` on GitHub → Vercel builds & promotes to production automatically
  (Vercel now runs `next build`; framework preset auto-detected as Next.js).
- Or manually from the project dir: `vercel deploy --prod --scope codewithmaik`.

## Known gaps / possible next steps

- Social links (`instagram.com`, `facebook.com`, …) are placeholders.
- `mailto:hello@bankster.example` in the footer is a placeholder address.
- No favicon / OG image / sitemap yet (`app/icon`, `app/opengraph-image`,
  `app/sitemap.ts` would be the Next-native way).
- Impressum contact is intentionally the developer site, not an email address.
- Visual regression pass against the old static site still pending (see above).
- Opportunity: migrate component styles from `globals.css` to Tailwind utilities
  incrementally now that the toolchain is in place.
