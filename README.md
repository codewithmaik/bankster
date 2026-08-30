# Bankster

A small marketing website for a fictional digital bank — built as a front-end
**work example / portfolio piece**. No real services, accounts or payments are
offered, and no data is processed. See the [Impressum](/impressum) for legal
details.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4 on top of a hand-written, token-based design system
  (`app/globals.css`)
- Kumbh Sans via `next/font`; Font Awesome via CDN

Every route is statically prerendered — there is no server-side code.

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Landing page (hero, features, pricing) + disclaimer modal |
| `app/services/page.tsx` | Services overview |
| `app/pricing/page.tsx` | Pricing plans with monthly/yearly toggle |
| `app/signup/page.tsx` | Demo sign-up form (client-side only) |
| `app/impressum/page.tsx` | Legal notice (§ 5 DDG) |
| `components/` | Navbar, Footer, DisclaimerModal, PricingPlans, SignupForm, Reveal, LogoMarquee |
| `app/globals.css` | Design tokens + all component styles |

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck
```

## Deploy

Deployed on Vercel (framework preset: Next.js). Pushes to `main` deploy to
production automatically.

---

Developed by [codewithmaik](https://codewithmaik.com).
