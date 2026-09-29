# Saya Studio Interiors & Exteriors Designs

Marketing website for **Saya Studio** — an interiors and exteriors design studio based in Hubballi, Dharwad, Karnataka. Built by [TheMonsterLabs](mailto:hello@themonsterlabs.com).

> **Demo only** — no backend. Forms show a confirmation state but do not send emails.

## Tech Stack

- React 19 + Vite 8
- React Router v7
- Vanilla CSS (no UI framework)
- Font Awesome 6 (CDN)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build static files to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Placeholders To Fill Before Launch

These are still template values and must be replaced with the studio's real details:

- **Phone** — `+91 XXXXX XXXXX` (`src/pages/Contact.jsx`, `src/pages/BookConsultation.jsx`)
- **Email** — `hello@sayastudio.in` (same two files)
- **Street address** — currently `Studio address, Basaveshwar Nagar` (`src/pages/Contact.jsx`)
- **Business hours** — currently `Mon — Sat: 10:00 AM — 7:00 PM`, unverified
- **Social links** — all four are `href="#"` in `src/components/Footer.jsx`
- **Stats** — `500+ projects`, `25+ awards`, `50+ designers`, `15+ years` are template numbers, not real figures
- **Team, testimonials, portfolio** — placeholder content with Unsplash stock imagery
- **Logo & favicon** — still the previous brand's artwork (`src/assets/logo.webp`, `public/favicon.png`)
- **Form success copy** — claims a 24-hour response, but no form actually submits anywhere

## Hidden Pages

- `/proposal` — TheMonsterLabs feature proposal for the client. Not linked in navigation.
