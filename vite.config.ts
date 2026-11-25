import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const siteUrl = 'https://www.cepotxyz.my.id/'
const homeTitle = 'cepotxyz | Jasa Motion Graphic, Video Editing & Desain Grafis Semarang'

const routes = [
  {
    path: '/about',
    label: 'Tentang',
    title: 'Tentang cepotxyz | Creative Motion Developer Semarang',
    description:
      'Tentang Affandi Rahman Hakim, creative motion developer di Semarang. Motion design, visual storytelling, dan desain grafis untuk brand.',
  },
  {
    path: '/services',
    label: 'Layanan',
    title: 'Jasa Motion Graphic, Video Editing & Desain Grafis | cepotxyz',
    description:
      'Jasa motion graphic, video editing, logo, feed Instagram, ID card plus lanyard, dan banner untuk UMKM, startup, dan instansi di Semarang.',
  },
  {
    path: '/portfolio',
    label: 'Portofolio',
    title: 'Portofolio Motion Graphic & Video Editing | cepotxyz',
    description:
      'Portofolio motion graphic, video editing, dan desain grafis cepotxyz untuk promosi produk, launch brand, dan kebutuhan visual UMKM.',
  },
  {
    path: '/pricing',
    label: 'Harga',
    title: 'Harga Jasa Motion Graphic, Video Editing & Desain Grafis | cepotxyz',
    description:
      'Harga motion graphic mulai Rp60.000, video editing Rp50.000, logo Rp150.000, feed Instagram Rp15.000 per slide, ID card Rp15.000, banner Rp100.000.',
  },
]

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function replaceMetaContent(html: string, tagStart: string, content: string) {
  const start = html.indexOf(tagStart)
  if (start === -1) return html

  const end = html.indexOf('>', start)
  if (end === -1) return html

  const tag = html.slice(start, end + 1)
  const updated = tag.replace(/content="[^"]*"/, `content="${escapeHtml(content)}"`)
  return html.slice(0, start) + updated + html.slice(end + 1)
}

function routeSchema(route: (typeof routes)[number]) {
  const slug = route.path.slice(1)
  const pageUrl = `${siteUrl}${slug}/`

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}#webpage-${slug}`,
    url: pageUrl,
    name: route.title,
    description: route.description,
    isPartOf: {
      '@id': `${siteUrl}#website`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.label,
          item: pageUrl,
        },
      ],
    },
  }
}

function writeRouteHtml() {
  const source = path.resolve(__dirname, './dist/index.html')
  const baseHtml = readFileSync(source, 'utf8')

  for (const route of routes) {
    const pageUrl = `${siteUrl}${route.path.slice(1)}/`
    const schemaJson = JSON.stringify(routeSchema(route), null, 2)
      .split('\n')
      .join('\n      ')

    let html = baseHtml
      .replace(`<title>${homeTitle}</title>`, `<title>${escapeHtml(route.title)}</title>`)
      .replace(
        `<link rel="canonical" href="${siteUrl}" />`,
        `<link rel="canonical" href="${pageUrl}" />`,
      )

    html = replaceMetaContent(html, '<meta name="description"', route.description)
    html = replaceMetaContent(html, '<meta property="og:url"', pageUrl)
    html = replaceMetaContent(html, '<meta property="og:title"', route.title)
    html = replaceMetaContent(html, '<meta property="og:description"', route.description)
    html = replaceMetaContent(html, '<meta name="twitter:url"', pageUrl)
    html = replaceMetaContent(html, '<meta name="twitter:title"', route.title)
    html = replaceMetaContent(html, '<meta name="twitter:description"', route.description)
    html = html.replace(
      /<script id="route-schema" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="route-schema" type="application/ld+json">\n      ${schemaJson}\n    </script>`,
    )

    const outputDir = path.resolve(__dirname, './dist', route.path.slice(1))
    mkdirSync(outputDir, { recursive: true })
    writeFileSync(path.join(outputDir, 'index.html'), html)
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'seo-static-routes',
      closeBundle() {
        copyFileSync(
          path.resolve(__dirname, './src/assets/portfolio/portfolio-2026.png'),
          path.resolve(__dirname, './dist/og-image.png'),
        )
        writeRouteHtml()
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
