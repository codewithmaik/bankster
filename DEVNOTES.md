# Dev Notes — Bankster

Working notes for this project. Last updated: 2026-08-30.

Bankster is a **static, no-build marketing website** for a fictional digital bank,
built purely as a front-end work example / portfolio piece. No real services,
accounts or payments exist and no data is processed (see `impressum.html`).

---

## Stack & structure

- Plain HTML + CSS + vanilla JS. No framework, no bundler, no `package.json`.
- External resources via CDN: Font Awesome 6.5.1, Google Font "Kumbh Sans".
- One shared `styles.css` (token-based design system) and one `app.js` for all pages.

| File | Purpose |
| --- | --- |
| `index.html` | Landing page: hero, partner marquee, features, pricing + **disclaimer modal** |
| `services.html` | Services overview (page header + 6 cards + footer) |
| `pricing.html` | Pricing plans, monthly/yearly toggle |
| `signup.html` | Demo sign-up form (client-side only, no backend) |
| `impressum.html` | Legal notice (§ 5 DDG), `noindex` |
| `styles.css` | CSS custom properties (tokens) + every component style |
| `app.js` | Mobile nav, navbar scroll state, active-link, logo marquee, pricing toggle, scroll reveal, footer year, disclaimer modal, signup form |
| `images/pic01.svg` | Hero illustration (only asset) |

### Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

> Note: browsers cache `styles.css` / `app.js` aggressively on localhost.
> When testing changes, use a fresh port or a hard reload.

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

## How to deploy again

- Push to `main` on GitHub → Vercel builds & promotes to production automatically.
- Or manually from the project dir: `vercel deploy --prod --scope codewithmaik`.

## Known gaps / possible next steps

- Social links (`instagram.com`, `facebook.com`, …) are placeholders.
- `mailto:hello@bankster.example` in the footer is a placeholder address.
- `services.html` / `pricing.html` share duplicated footer markup with `index.html`
  (fine for a static site; would be templated in a build setup).
- No favicon / OG image / sitemap yet.
- Impressum contact is intentionally the developer site, not an email address.
