#!/usr/bin/env node
/**
 * Scaffold a new studio site from this template.
 *
 *   node scripts/new-client.mjs --name "Studio Name" --city "Hubballi"
 *
 * The script copies the template into a sibling folder, writes a branded
 * src/site/config.js, seeds src/site/content.js, creates placeholder
 * logo/favicon SVGs, initialises git and prints the GitHub/Vercel steps.
 */
import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const templateDir = path.resolve(scriptDir, '..')
const today = new Date().toISOString().slice(0, 10)

const EXCLUDED_DIRS = new Set(['.git', 'node_modules', 'dist', 'dist-ssr', 'scripts', 'internal'])
const EXCLUDED_FILES = new Set([
  'pitch-email.md',
  'deal-playbook.md',
  'CLIENTS.md',
  'TEMPLATE.md',
])

const argv = process.argv.slice(2)

function printUsage() {
  console.log(`
Usage
  node scripts/new-client.mjs --name "Studio Name" [options]

Required
  --name "Studio Name"        Brand name shown across the site

Options
  --slug studio-name          Folder + package name (default: derived from --name)
  --city "Hubballi"           City used in copy, SEO and placeholders
  --phone "+91 98765 43210"   Contact phone
  --email "hello@studio.in"   Contact email
  --address "Line 1|Line 2"   Address lines separated by |
  --hours "Mon - Sat: 10-7"   Business hours
  --secondary "#96AC9F"       Accent colour (6-digit hex)
  --no-phone                 Leave phone empty until verified
  --no-email                 Leave email empty until verified
  --no-address               Leave address empty until verified
  --no-hours                 Leave hours empty until verified
  --out "../studio-name"      Output folder (default: sibling of this repo)
  --no-git                    Skip git init + first commit
  --force                     Replace the output folder if it exists
  --help                      Show this help
`)
}

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

function flag(name, fallback = '') {
  const index = argv.indexOf(`--${name}`)
  if (index === -1) return fallback
  const value = argv[index + 1]
  if (!value || value.startsWith('--')) fail(`--${name} needs a value.`)
  return value.trim()
}

const has = (name) => argv.includes(`--${name}`)

if (has('help') || argv.includes('-h')) {
  printUsage()
  process.exit(0)
}

const name = flag('name')
if (!name) {
  printUsage()
  fail('Missing required --name.')
}

const slug = flag('slug') || slugify(name)
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  fail(`Invalid slug "${slug}". Use lowercase letters, numbers and hyphens.`)
}

const city = flag('city', 'Your City')
const phone = has('no-phone') ? '' : flag('phone', '+91 XXXXX XXXXX')
const email = has('no-email') ? '' : flag('email', `hello@${slug}.in`)
const hours = has('no-hours') ? '' : flag('hours', 'Mon - Sat: 10:00 AM - 7:00 PM')
const secondary = flag('secondary', '#96AC9F')
const addressFlag = flag('address')
const addressLines = addressFlag
  ? addressFlag.split('|').map((line) => line.trim()).filter(Boolean)
  : has('no-address')
    ? []
    : [`Studio address, ${city}`, `${city}, Karnataka, India`]

for (const [valueFlag, noFlag] of [
  ['phone', 'no-phone'],
  ['email', 'no-email'],
  ['address', 'no-address'],
  ['hours', 'no-hours'],
]) {
  if (has(valueFlag) && has(noFlag)) {
    fail(`Use either --${valueFlag} or --${noFlag}, not both.`)
  }
}

if (!/^#[0-9a-fA-F]{6}$/.test(secondary)) {
  fail('--secondary must be a 6-digit hex colour, e.g. #96AC9F.')
}

const outDir = path.resolve(templateDir, flag('out', `../${slug}`))
const driveRoot = path.parse(outDir).root

if (outDir === driveRoot) fail('Refusing to use a drive root as --out.')
if (outDir === templateDir) fail('Refusing to overwrite the template repo. Choose another --out folder.')
if (templateDir.startsWith(outDir + path.sep)) {
  fail('Refusing to write above the template repo. Choose a sibling folder.')
}
if (outDir.startsWith(templateDir + path.sep)) {
  fail('Refusing to create the client inside the template repo. Choose a sibling folder.')
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function shade(hex, amount) {
  const value = parseInt(hex.replace('#', ''), 16)
  const channel = (shift) => {
    const base = (value >> shift) & 0xff
    return Math.max(0, Math.min(255, Math.round(base * (1 + amount))))
  }
  return (
    '#' +
    [channel(16), channel(8), channel(0)]
      .map((part) => part.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  )
}

const json = (value) => JSON.stringify(value)

function jsonBlock(value, indent = 4) {
  return JSON.stringify(value, null, 2).replace(/\n/g, '\n' + ' '.repeat(indent))
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function initials(name) {
  const words = name.split(/\s+/).filter(Boolean)
  if (words.length === 0) return 'S'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function brandSvg(name, color) {
  const label = escapeXml(name)
  const mark = escapeXml(initials(name))
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="${label}">
  <rect width="96" height="96" rx="20" fill="${color}"/>
  <text x="48" y="49" text-anchor="middle" dominant-baseline="central" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="600" letter-spacing="1" fill="#FFFFFF">${mark}</text>
</svg>
`
}

function buildConfig({ slug, name, city, phone, email, addressLines, hours, secondary }) {
  const words = name.split(/\s+/).filter(Boolean)
  const secondaryDark = shade(secondary, -0.18)
  const title = `${name} — Interiors & Exteriors Design | ${city}`
  const description = `${name} is an interiors and exteriors design studio in ${city} — residential, commercial, facade and outdoor design, delivered turnkey.`

  return `// Brand, contact, theme and SEO settings for ${name}.
// This file and content.js are the only files that need editing per studio.
// Generated by the Saya template on ${today}.

const site = {
  slug: ${json(slug)},
  lang: 'en',

  // Keep true until the site is ready for Google. Adds a noindex meta tag.
  demo: true,

  brand: {
    name: ${json(name)},
    legalName: ${json(name)},
    wordmark: ${JSON.stringify(words).replaceAll(',', ', ')},
    logo: '/brand/logo.svg',
    logoAlt: ${json(name)},
    favicon: '/brand/favicon.svg',
  },

  contact: {
    phone: ${json(phone)},
    email: ${json(email)},
    addressLines: ${jsonBlock(addressLines, 4)},
    hours: ${json(hours)},
  },

  social: {
    facebook: '#',
    instagram: '#',
    pinterest: '#',
    houzz: '#',
    linkedin: '#',
    twitter: '#',
  },

  // CSS custom properties applied at runtime. Keep the same keys as style.css.
  theme: {
    '--primary': '#1D1D1D',
    '--primary-light': '#2D2D2D',
    '--secondary': ${json(secondary)},
    '--secondary-dark': ${json(secondaryDark)},
    '--accent': '#E5E1DC',
    '--accent-dark': '#D3C5B1',
  },

  seo: {
    title: ${json(title)},
    description: ${json(description)},
    // TODO: set the production URL before launch, e.g. 'https://studio.in'.
    url: '',
    ogImage: '/images/hero-bg.webp',
  },

  forms: {
    // Paste a Formspree / Getform / Basin endpoint here to make forms live.
    // Leave empty for demo mode (the form will say it is not connected).
    endpoint: '',
    successTitle: 'Thank You!',
    successMessage:
      "Your message has been received. We'll get back to you within 24 hours.",
    demoTitle: 'Demo Form',
    demoMessage:
      'This form is not connected to an inbox yet. Add your form endpoint in src/site/config.js to start receiving enquiries.',
    errorMessage:
      'Something went wrong while sending your message. Please try again or email us directly.',
  },
}

export default site
`
}

async function writeBrandAssets(outDir, name, color) {
  const brandDir = path.join(outDir, 'public/brand')
  const svg = brandSvg(name, color)
  await writeFile(path.join(brandDir, 'logo.svg'), svg)
  await writeFile(path.join(brandDir, 'favicon.svg'), svg)
}

async function updatePackageJson(outDir, slug) {
  const file = path.join(outDir, 'package.json')
  const pkg = JSON.parse(await readFile(file, 'utf8'))
  pkg.name = slug
  if (pkg.scripts) {
    delete pkg.scripts['new-client']
    delete pkg.scripts['publish-client']
  }
  await writeFile(file, JSON.stringify(pkg, null, 2) + '\n')

  const lockFile = path.join(outDir, 'package-lock.json')
  if (!existsSync(lockFile)) return
  const lock = JSON.parse(await readFile(lockFile, 'utf8'))
  lock.name = slug
  if (lock.packages?.['']) lock.packages[''].name = slug
  await writeFile(lockFile, JSON.stringify(lock, null, 2) + '\n')
}

async function writeClientReadme(outDir, { name, city, phone, email }) {
  const lines = [
    `# ${name}`,
    '',
    `Marketing website for **${name}** — an interiors and exteriors design studio in ${city}.`,
    '',
    'Built with React 19 + Vite 8, React Router 7 and vanilla CSS. Static site — deploy the `dist/` folder anywhere.',
    '',
    '## Local development',
    '',
    '```bash',
    'npm install',
    'npm run dev',
    '```',
    '',
    '| Command | Description |',
    '|---|---|',
    '| `npm run dev` | Start the dev server |',
    '| `npm run build` | Build static files to `dist/` |',
    '| `npm run preview` | Preview the production build |',
    '| `npm run lint` | Run ESLint |',
    '',
    '## What to edit',
    '',
    '- `src/site/config.js` — brand name, logo, contact details, socials, theme colours, SEO and form endpoint.',
    '- `src/site/content.js` — hero copy, services, portfolio, gallery, testimonials, team, stats, FAQs and CTAs.',
    '- `public/brand/` — logo and favicon.',
    '- `public/images/` — hero and other local images.',
    '',
    'Everything else (`src/pages`, `src/components`, `src/hooks`, `src/assets/css`) is shared template code.',
    '',
    '## Current placeholders',
    '',
    `- Phone: ${phone || 'Not provided yet'}`,
    `- Email: ${email || 'Not provided yet'}`,
    '- Address and business hours in `src/site/config.js`',
    '- Portfolio, gallery, team and testimonial photos are Unsplash stock images',
    '- Testimonials, team bios and stats are placeholders',
    '- Logo and favicon are generated monogram placeholders',
    '',
    '## Forms',
    '',
    'Forms are in demo mode until you add an endpoint in `src/site/config.js`:',
    '',
    '1. Create a free form at Formspree, Getform or Basin.',
    '2. Copy the form endpoint URL.',
    '3. Set `forms.endpoint` in `src/site/config.js`.',
    '',
    'Until then the forms validate and show a "not connected" message — they do not send email.',
    '',
    '## Before launch',
    '',
    '- [ ] Replace `public/brand/logo.svg` and `favicon.svg` with the real logo',
    "- [ ] Replace the Unsplash images with the studio's project photos",
    '- [ ] Replace placeholder testimonials, team, stats and about copy',
    '- [ ] Confirm phone, email, address and business hours',
    '- [ ] Add the form endpoint',
    '- [ ] Set `seo.url` to the production domain',
    '- [ ] Change `demo` to `false` in `src/site/config.js` (removes noindex)',
    '',
    '## Deploy to Vercel',
    '',
    'Before publishing, replace all placeholder copy and stock imagery, configure and test a real form endpoint, set the production URL, and set `demo` to `false` in `src/site/config.js`.',
    'Confirm the account plan permits commercial client sites; Vercel Hobby is for non-commercial use.',
    '',
    '```bash',
    'npx vercel --prod',
    '```',
    '',
    'Or import the GitHub repo at vercel.com. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.',
    '',
    '`vercel.json` rewrites every route to `index.html`, so client-side routes work on refresh.',
    '',
  ]
  await writeFile(path.join(outDir, 'README.md'), lines.join('\n'))
}

async function registerClient({ name, slug, city, phone, email }) {
  const file = path.join(templateDir, 'CLIENTS.md')
  if (!existsSync(file)) {
    const initialRegistry = [
      '# Client Registry',
      '',
      'Local-only registry for studios generated from this template. Do not commit contact details.',
      '',
      '| Studio | Slug / repo | City | Phone | Email | Created |',
      '|---|---|---|---|---|---|',
      '<!-- clients -->',
      '',
    ].join('\n')
    await writeFile(file, initialRegistry)
  }
  const source = await readFile(file, 'utf8')
  if (source.includes('`' + slug + '`')) return false
  const marker = '<!-- clients -->'
  if (!source.includes(marker)) return false
  const row = `| ${name} | \`${slug}\` | ${city} | ${phone} | ${email} | ${today} |`
  await writeFile(file, source.replace(marker, `${row}\n${marker}`))
  return true
}

async function initGit(outDir, name) {
  if (has('no-git')) return false
  try {
    execFileSync('git', ['init', '-b', 'main'], { cwd: outDir, stdio: 'ignore' })
    execFileSync('git', ['add', '-A'], { cwd: outDir, stdio: 'ignore' })
    execFileSync('git', ['commit', '-m', `Initial commit — ${name} website`], {
      cwd: outDir,
      stdio: 'ignore',
    })
    return true
  } catch {
    console.warn('  ! git init or commit failed. Finish the git setup manually.')
    return false
  }
}

async function countFiles(dir) {
  let count = 0
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue
    const full = path.join(dir, entry.name)
    count += entry.isDirectory() ? await countFiles(full) : 1
  }
  return count
}

async function main() {
  if (existsSync(outDir)) {
    const entries = await readdir(outDir)
    if (entries.length > 0 && !has('force')) {
      fail(
        `Output folder already exists and is not empty:\n  ${outDir}\nRe-run with --force to replace it.`,
      )
    }
    await rm(outDir, { recursive: true, force: true })
  }

  console.log(`\nScaffolding ${name} → ${outDir}\n`)

  await cp(templateDir, outDir, {
    recursive: true,
    filter(source) {
      const relative = path.relative(templateDir, source)
      if (!relative) return true
      const parts = relative.split(path.sep)
      if (parts.some((part) => EXCLUDED_DIRS.has(part))) return false
      if (EXCLUDED_FILES.has(parts[parts.length - 1])) return false
      return true
    },
  })

  const siteDir = path.join(outDir, 'src/site')
  await writeFile(
    path.join(siteDir, 'config.js'),
    buildConfig({ slug, name, city, phone, email, addressLines, hours, secondary }),
  )

  const contentSource = await readFile(path.join(siteDir, 'content.template.js'), 'utf8')
  const content = contentSource
    .replaceAll('{{NAME}}', name)
    .replaceAll('{{CITY}}', city)
    .replaceAll('{{PHONE}}', phone)
    .replaceAll('{{EMAIL}}', email)
  await writeFile(path.join(siteDir, 'content.js'), content)
  await rm(path.join(siteDir, 'content.template.js'))

  await writeBrandAssets(outDir, name, secondary)

  await updatePackageJson(outDir, slug)
  await writeClientReadme(outDir, { name, city, phone, email })

  const registered = await registerClient({ name, slug, city, phone, email })
  const gitDone = await initGit(outDir, name)
  const files = await countFiles(outDir)

  const placeholders = []
  if (!argv.includes('--phone') && !has('no-phone')) placeholders.push('phone')
  if (!argv.includes('--email') && !has('no-email')) placeholders.push('email')
  if (!argv.includes('--city')) placeholders.push('city')
  if (!argv.includes('--address') && !has('no-address')) placeholders.push('address')
  if (!argv.includes('--hours') && !has('no-hours')) placeholders.push('hours')

  console.log(`✔ Created ${outDir}`)
  console.log(`  Brand:    ${name} (${slug})`)
  console.log(`  City:     ${city}`)
  console.log(
    `  Contact:  ${[phone, email].filter(Boolean).join(' · ') || 'not provided yet'}`,
  )
  console.log(`  Files:    ${files}`)
  if (gitDone) console.log('  Git:      initialised on main with the first commit')
  if (registered) console.log('  Local registry: added to CLIENTS.md')
  if (placeholders.length) {
    console.log(`\n  Still placeholders: ${placeholders.join(', ')}`)
  }

  console.log(`
Next steps
  1. cd "${outDir}" && npm ci
  2. Replace public/brand/logo.svg and favicon.svg with the real logo
  3. Replace the Unsplash images in src/site/content.js with real project photos
  4. Replace placeholder testimonials, team, stats and about copy
  5. Add a form endpoint in src/site/config.js (Formspree, Getform or Basin)
  6. Set seo.url and change demo to false before launch

Publish
  From the template repo: node scripts/publish-client.mjs --dir "${outDir}"
  Vercel deployment follows after content, form and plan review.
`)
}

main().catch((error) => fail(error?.stack || error?.message || String(error)))
