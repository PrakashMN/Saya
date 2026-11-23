# Saya Studio Interiors & Exteriors Designs

Marketing website for **Saya Studio** — an interiors and exteriors design studio based in Hubballi, Karnataka. Built with React 19 + Vite 8.

> **Demo only** — forms validate and show a confirmation state but do not send email until an endpoint is configured.

## Tech stack

- React 19 + Vite 8
- React Router 7
- Vanilla CSS (no UI framework)
- Font Awesome 6 (CDN)

## Getting started

```bash
npm install
npm run dev
```

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build static files to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Where the content lives

All per-studio content is isolated in two files:

- **`src/site/config.js`** — brand name, logo, contact details, social links, theme colours, SEO and form endpoint.
- **`src/site/content.js`** — hero copy, services, portfolio, gallery, testimonials, team, stats, FAQs and CTAs.

Assets:

- `public/brand/` — logo and favicon
- `public/images/` — hero and local imagery

Everything else (`src/pages`, `src/components`, `src/hooks`, `src/assets/css`) is shared application code. SEO meta tags are injected at build time from `src/site/config.js` by the Vite plugin in `vite.config.js`.

## Placeholders to replace before launch

- **Phone** — `+91 XXXXX XXXXX` in `src/site/config.js`
- **Email** — `hello@sayastudio.in` in `src/site/config.js`
- **Street address** — `Studio address, Basaveshwar Nagar` in `src/site/config.js`
- **Business hours** — `Mon — Sat: 10:00 AM — 7:00 PM`, unverified
- **Social links** — all are `#` in `src/site/config.js`
- **Stats** — `500+ projects`, `25+ awards`, `50+ designers`, `15+ years` are template numbers
- **Team, testimonials, portfolio** — placeholder content with Unsplash stock imagery
- **Logo & favicon** — placeholder `SS` monogram in `public/brand/`; replace with the real Saya logo
- **Form endpoint** — empty, so forms run in demo mode

## Forms

The contact and consultation forms are wired to `useFormSubmit`, which posts to `forms.endpoint` from `src/site/config.js`. While the endpoint is empty, the form shows a "Demo Form" message instead of pretending to send.

To go live:

1. Create a form at Formspree, Getform or Basin.
2. Paste the endpoint into `forms.endpoint`.
3. Submit a test enquiry and confirm it arrives.

## Deployment

The site is static. Build with `npm run build` and deploy `dist/` to Vercel (or any static host). `vercel.json` rewrites all routes to `index.html` so client-side routes survive a refresh.

## Building the other studio sites

This repo is also the source template for the other studio sites. See **`TEMPLATE.md`** for the scaffolding, private GitHub publishing, and later Vercel launch workflow. `CLIENTS.md` is a local-only registry and is not published to this public repository.
