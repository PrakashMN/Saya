# Studio Site Template — Agency Workflow

This repository is the source template for interior-design studio sites. Each studio gets its own folder and private GitHub repository. Only the branding and content differ; the application code is shared.

> This file is internal. It is excluded when a client repo is scaffolded.

## How the template is organised

| Path | Purpose | Per-client? |
|---|---|---|
| `src/site/config.js` | Brand, contact, socials, theme colours, SEO, form endpoint | Yes |
| `src/site/content.js` | Hero, services, portfolio, gallery, testimonials, team, stats, FAQs, CTAs | Yes |
| `public/brand/` | Logo and favicon | Yes |
| `public/images/` | Local hero and content images | Yes |
| `src/pages/`, `src/components/`, `src/hooks/` | Shared application code | No |
| `src/assets/css/style.css` | Shared stylesheet; colours come from CSS variables | No |
| `vite.config.js`, `index.html` | Build config; SEO meta is injected from `src/site/config.js` | No |

A new studio site is therefore "the same app + a different `src/site/` folder".

## Scaffold a new studio

```bash
node scripts/new-client.mjs --name "Studio Name" --slug studio-name --city "Hubballi" --phone "+91 98765 43210" --email "hello@studio.in"
```

> On Windows, use `node` directly as above. PowerShell drops forwarded flags from `npm run ... -- ...`; the npm script works from CMD or macOS/Linux.

Useful options:

```bash
node scripts/new-client.mjs \
  --name "Studio Name" \
  --city "Hubballi" \
  --address "Shop 4, Main Road|Hubballi 580020" \
  --hours "Mon - Sat: 10:00 AM - 7:00 PM" \
  --secondary "#96AC9F" \
  --out "../studio-name" \
  --no-git
```

What the script does:

1. Copies the template into `../<slug>` (a sibling folder by default).
2. Writes a branded `src/site/config.js`.
3. Seeds `src/site/content.js` from `src/site/content.template.js`.
4. Generates a placeholder monogram `logo.svg` and `favicon.svg`.
5. Renames the package and rewrites the client README.
6. Adds a row to `CLIENTS.md`.
7. Runs `git init -b main`, stages everything and creates the first commit.

It does **not** install dependencies, create the GitHub repo or create the Vercel project. Those steps are below.

Unverified details can be left empty with `--no-phone`, `--no-email`, `--no-address`, and `--no-hours`. Empty contact details are omitted from the generated site's contact panels.

### Batch scaffold all 10

Once you have the details, run one loop from PowerShell:

```powershell
$clients = @(
  @{ Name = 'Studio One'; Slug = 'studio-one'; City = 'Hubballi'; Phone = '+91 98765 43210'; Email = 'hello@studioone.in' },
  @{ Name = 'Studio Two'; Slug = 'studio-two'; City = 'Belagavi'; Phone = '+91 98765 43211'; Email = 'hello@studiotwo.in' }
)

foreach ($c in $clients) {
  node scripts/new-client.mjs `
    --name $c.Name `
    --slug $c.Slug `
    --city $c.City `
    --phone $c.Phone `
    --email $c.Email
}
```

Each client gets its own sibling folder and its own first commit.

## Publish a client repo to GitHub

The publishing helper runs lint/build, creates a **private** repo under `PrakashMN`, and pushes `main`:

```powershell
node scripts/publish-client.mjs --dir "../studio-name"
```

It does not deploy to Vercel. Client content, contact endpoints, commercial plan eligibility, and deployment protection should be reviewed before a site is made public.

If `gh` is not installed, install it once:

```powershell
winget install --id GitHub.cli
gh auth login
```

then create and push in one go:

```bash
cd ../studio-name
gh repo create <your-org>/studio-name --private --source . --remote origin --push
```

Or do it manually:

1. Create an empty repository at github.com/new named `studio-name` (no README, no `.gitignore`).
2. Run:

```bash
cd ../studio-name
git remote add origin git@github.com:<your-org>/studio-name.git
git push -u origin main
```

## Deploy a client to Vercel

If `vercel` is not installed, install it once:

```powershell
npm install -g vercel
vercel login
```

then:

```bash
cd ../studio-name
vercel --prod
```

Or use the dashboard:

1. Go to vercel.com/new and import the client's GitHub repository.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy, then add the studio's domain under **Settings → Domains**.

Each client is a separate Vercel project with its own URL. `vercel.json` already rewrites all routes to `index.html` so client-side routing works on refresh.

## Per-client launch checklist

- [ ] Replace `public/brand/logo.svg` and `favicon.svg` with the real logo
- [ ] Replace Unsplash URLs in `src/site/content.js` with the studio's photos
- [ ] Replace placeholder testimonials, team members and stats
- [ ] Confirm phone, email, address and business hours in `src/site/config.js`
- [ ] Add real social profile URLs in `src/site/config.js`
- [ ] Add a form endpoint (Formspree / Getform / Basin) in `src/site/config.js`
- [ ] Set `seo.url` to the production domain
- [ ] Change `demo` to `false` (removes `noindex`)
- [ ] Run `npm run lint` and `npm run build`
- [ ] Push and deploy

## Keeping clients up to date

Because each client is its own repo, template changes are not automatic. When you improve shared code (components, styles, hooks), apply the same change to each client repo and redeploy. Keep changes inside `src/site/` for client-specific work so shared updates stay easy to cherry-pick.

If the number of clients grows, consider moving shared code to an npm package or a single monorepo — but that is a later decision.

## Internal material

These files stay in the local template workspace and are excluded from client scaffolds. `CLIENTS.md` is git-ignored so client contact details are not pushed to the public template repo:

- `TEMPLATE.md` — this document
- `CLIENTS.md` — client registry
- `pitch-email.md`, `deal-playbook.md` — sales notes (also gitignored)
- `internal/` — agency-only material (also gitignored)
- `scripts/` — the generator

`internal/Proposal.jsx` is the TheMonsterLabs proposal page. It is outside `src/`, so it is never bundled into a client build. Copy it back into `src/pages/` only for an internal demo — never in a client repo.
