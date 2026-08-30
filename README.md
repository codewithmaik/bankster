# Bankster

A small static marketing website for a fictional digital bank — built as a
front-end **work example / portfolio piece**. No real services, accounts or
payments are offered, and no data is processed. See the
[Impressum](impressum.html) for legal details.

## Stack

Plain HTML, CSS and vanilla JavaScript — no build step. Font Awesome and
Kumbh Sans are loaded from a CDN.

| File | Purpose |
| --- | --- |
| `index.html` | Landing page (hero, features, pricing) + disclaimer modal |
| `services.html` | Services overview |
| `pricing.html` | Pricing plans with monthly/yearly toggle |
| `signup.html` | Demo sign-up form (client-side only) |
| `impressum.html` | Legal notice (§ 5 DDG) |
| `styles.css` | Design tokens + all component styles |
| `app.js` | Nav, pricing toggle, scroll reveal, modal |

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Deployed as a static site on Vercel.

---

Developed by [codewithmaik](https://codewithmaik.com).
