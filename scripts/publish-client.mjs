#!/usr/bin/env node
/**
 * Validate a generated client site, then create and push its private GitHub repo.
 *
 *   node scripts/publish-client.mjs --dir "../studio-name"
 */
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

const argv = process.argv.slice(2)

function value(name, fallback = '') {
  const index = argv.indexOf(`--${name}`)
  if (index === -1) return fallback
  const result = argv[index + 1]
  if (!result || result.startsWith('--')) fail(`--${name} needs a value.`)
  return result.trim()
}

function has(name) {
  return argv.includes(`--${name}`)
}

if (has('help') || argv.includes('-h')) {
  console.log(`
Usage
  node scripts/publish-client.mjs --dir "../studio-name" [options]

Options
  --dir "../studio-name"   Generated client folder (required)
  --owner PrakashMN        GitHub owner (default: PrakashMN)
  --dry-run                Validate and preview; do not install, build, or publish
  --help                   Show this help

This validates audit/lint/build, creates a private GitHub repository, and pushes main.
It intentionally does not deploy to Vercel.
`)
  process.exit(0)
}

const dirArg = value('dir')
if (!dirArg) fail('Missing required --dir.')

const allowedFlags = new Set(['--dir', '--owner', '--dry-run', '--help'])
for (let index = 0; index < argv.length; index += 1) {
  const argument = argv[index]
  if (!argument.startsWith('--')) continue
  if (!allowedFlags.has(argument)) fail(`Unknown option: ${argument}`)
  if (argument === '--dir' || argument === '--owner') index += 1
}

const clientDir = path.resolve(process.cwd(), dirArg)
const owner = value('owner', 'PrakashMN')

if (!/^[A-Za-z0-9-]+$/.test(owner)) fail(`Invalid GitHub owner "${owner}".`)
if (!existsSync(path.join(clientDir, 'package.json'))) {
  fail(`No package.json found in ${clientDir}. Is this a generated client folder?`)
}
if (!existsSync(path.join(clientDir, '.git'))) {
  fail(`No Git repository found in ${clientDir}. Scaffold the client first.`)
}

const packageJson = JSON.parse(
  await readFile(path.join(clientDir, 'package.json'), 'utf8'),
)
const slug = packageJson.name

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  fail(`Invalid or missing package name "${slug}". Expected the client slug.`)
}
if (slug === 'saya-studio') {
  fail('This helper is for generated client sites, not the template repository.')
}

function run(command, args, { cwd = clientDir, capture = false } = {}) {
  try {
    return execFileSync(command, args, {
      cwd,
      encoding: capture ? 'utf8' : undefined,
      stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    })
  } catch (error) {
    const details = capture
      ? error.stderr?.toString().trim() || error.message
      : `Command failed: ${command} ${args.join(' ')}`
    fail(details)
  }
}

function runNpm(args) {
  if (process.platform !== 'win32') {
    run('npm', args)
    return
  }

  const command = process.env.ComSpec || 'cmd.exe'
  run(command, ['/d', '/s', '/c', `npm ${args.join(' ')}`])
}

const branch = run('git', ['branch', '--show-current'], { capture: true }).trim()
if (branch !== 'main') fail(`Expected branch "main", found "${branch || 'detached HEAD'}".`)

const status = run('git', ['status', '--porcelain'], { capture: true }).trim()
if (status) {
  fail('Client repo has uncommitted changes. Commit or review them before publishing.')
}

if (run('git', ['remote'], { capture: true }).trim()) {
  fail('Client repo already has a Git remote. Review it before publishing.')
}

run('gh', ['auth', 'status'])

const repoName = `${owner}/${slug}`

if (has('dry-run')) {
  console.log(`\nDry run passed for ${clientDir}`)
  console.log(`  Would validate: npm ci, npm audit, npm run lint, npm run build`)
  console.log(`  Would create:   private GitHub repo ${repoName}`)
  console.log(`  Would push:     main`)
  process.exit(0)
}

if (!existsSync(path.join(clientDir, 'node_modules'))) {
  runNpm(['ci'])
}
runNpm(['audit'])
runNpm(['run', 'lint'])
runNpm(['run', 'build'])
run('gh', [
  'repo',
  'create',
  repoName,
  '--private',
  '--source',
  '.',
  '--remote',
  'origin',
  '--push',
])

console.log(`
✔ Published ${repoName}
  Visibility: private
  Branch:     main
  Vercel:     not deployed; review content and plan eligibility before launch
`)
