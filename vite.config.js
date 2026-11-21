import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import site from './src/site/config.js'

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl || !site.seo.url) return ''
  try {
    return new URL(pathOrUrl, site.seo.url).href
  } catch {
    return ''
  }
}

function siteHtmlPlugin() {
  return {
    name: 'site-html',
    transformIndexHtml(html) {
      const title = escapeHtml(site.seo.title)
      const description = escapeHtml(site.seo.description)
      const image = escapeHtml(absoluteUrl(site.seo.ogImage))
      const url = escapeHtml(site.seo.url)
      const themeColor = escapeHtml(site.theme['--primary'] || '#1D1D1D')

      const meta = [
        '<meta name="theme-color" content="' + themeColor + '" />',
        '<meta property="og:type" content="website" />',
        '<meta property="og:site_name" content="' + escapeHtml(site.brand.name) + '" />',
        '<meta property="og:title" content="' + title + '" />',
        '<meta property="og:description" content="' + description + '" />',
        image ? '<meta property="og:image" content="' + image + '" />' : '',
        url ? '<meta property="og:url" content="' + url + '" />' : '',
        '<meta name="twitter:card" content="summary_large_image" />',
        '<meta name="twitter:title" content="' + title + '" />',
        '<meta name="twitter:description" content="' + description + '" />',
        image ? '<meta name="twitter:image" content="' + image + '" />' : '',
        url ? '<link rel="canonical" href="' + url + '" />' : '',
        site.demo ? '<meta name="robots" content="noindex, nofollow" />' : '',
      ].filter(Boolean)

      return html
        .replaceAll('%SITE_LANG%', escapeHtml(site.lang || 'en'))
        .replaceAll('%SITE_TITLE%', title)
        .replaceAll('%SITE_DESCRIPTION%', description)
        .replaceAll('%SITE_FAVICON%', escapeHtml(site.brand.favicon))
        .replace('</head>', '  ' + meta.join('\n    ') + '\n  </head>')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteHtmlPlugin()],
})
