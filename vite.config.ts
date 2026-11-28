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
      'Tentang cepotxyz, creative motion developer di Semarang. Motion design, visual storytelling, desain grafis, dan pengembangan web kreatif.',
    content: `
      <h1>Tentang cepotxyz</h1>
      <p>I'm a Motion Creative Developer with a strong interest in motion design, visual storytelling, and the space where creativity meets technology. I enjoy turning ideas into clean, expressive visuals through motion, short-form content, and intentional design systems.</p>
      <p>Alongside my studies in Information Technology at UIN Walisongo Semarang, I have worked as a Graphic Designer at Backstage Prodigy and gained experience through a Graphic Design internship at Aneka Service Kudus, campus organizations, and independent projects.</p>
      <p>My creative toolkit includes After Effects, Photoshop, Figma, and DaVinci Resolve. I also build projects with React, TypeScript, Python, Rust, C#, and Unity.</p>
      <h2>Selected project</h2>
      <p>Walisongo Domains Map is an interactive 3D visualization mapping 269 subdomains of walisongo.ac.id. It brings academic systems, information portals, faculty sites, study programs, and student press domains into one searchable, explorable map.</p>
    `,
  },
  {
    path: '/services',
    label: 'Layanan',
    title: 'Jasa Motion Graphic, Video Editing & Desain Grafis | cepotxyz',
    description:
      'Jasa motion graphic, video editing, desain logo, feed Instagram, ID card plus lanyard, dan banner untuk UMKM, startup, dan instansi di Semarang.',
    content: `
      <h1>Creative Services</h1>
      <p>Jasa desain kreatif dan produksi visual untuk brand, UMKM, startup, organisasi, dan instansi. Layanan tersedia untuk kebutuhan promosi digital maupun materi visual cetak.</p>
      <section><h2>Motion Graphic</h2><p>Animated visuals for product launches, promotions, explainers, and brand stories. Paket tersedia mulai Rp60.000.</p></section>
      <section><h2>Video Editing</h2><p>Video editing dari footage yang disiapkan klien, termasuk rough cut, sound design, voice optimization, dan color grading. Paket tersedia mulai Rp50.000.</p></section>
      <section><h2>Graphic Design</h2><p>Desain logo, feed Instagram, ID card dengan desain lanyard, dan banner promosi. Harga mulai Rp15.000 untuk desain per kartu ID atau per slide feed Instagram.</p></section>
      <p>Lihat <a href="/pricing/">daftar harga layanan</a> untuk rincian paket dan biaya.</p>
    `,
  },
  {
    path: '/portfolio',
    label: 'Portofolio',
    title: 'Portofolio Motion Graphic & Video Editing | cepotxyz',
    description:
      'Portofolio motion graphic, video editing, dan desain grafis cepotxyz untuk promosi produk, identitas brand, dan kebutuhan visual organisasi.',
    content: `
      <h1>Selected Portfolio</h1>
      <p>Kumpulan karya motion graphic, video editing, dan desain grafis yang dikerjakan untuk kebutuhan brand, promosi, organisasi, dan proyek kreatif.</p>
      <ul>
        <li><a href="https://drive.google.com/file/d/1-qgWZR1Lb8s2dkiBP-gumaVkBGss792o/view" target="_blank" rel="noopener noreferrer">Portfolio 2024 Edition</a></li>
        <li><a href="https://drive.google.com/file/d/1WEkN4PDT-22ePWQkJtghPrYd0w3fusTr/view" target="_blank" rel="noopener noreferrer">Portfolio 2025 Edition</a></li>
        <li><a href="https://www.instagram.com/p/DS-Ecb_Em9n/" target="_blank" rel="noopener noreferrer">Portfolio 2026 Edition</a></li>
      </ul>
      <p>Jelajahi juga <a href="/services/">layanan kreatif</a> dan <a href="/pricing/">daftar harga</a>.</p>
    `,
  },
  {
    path: '/pricing',
    label: 'Harga',
    title: 'Harga Jasa Motion Graphic, Video Editing & Desain Grafis | cepotxyz',
    description:
      'Daftar harga jasa motion graphic mulai Rp60.000, video editing Rp50.000, desain logo Rp150.000, feed Instagram Rp15.000 per slide, ID card Rp15.000, dan banner Rp100.000.',
    content: `
      <h1>Price List</h1>
      <p>Daftar harga layanan motion graphic, video editing, dan desain grafis cepotxyz. Harga dalam Rupiah Indonesia (IDR).</p>
      <section><h2>Motion Graphic</h2><ul><li>Basic Plan: Rp60.000</li><li>Pro Plan: Rp120.000</li><li>Premium Plan: Rp240.000</li></ul></section>
      <section><h2>Video Editing</h2><ul><li>Basic Plan: Rp50.000</li><li>Pro Plan: Rp100.000</li><li>Premium Plan: Rp200.000</li></ul></section>
      <section><h2>Graphic Design</h2><ul><li>Logo Design: Rp150.000, termasuk 3 konsep logo dan basic brand guidelines.</li><li>ID Card Design: Rp15.000 per kartu, termasuk desain lanyard.</li><li>Instagram Feed Design: Rp15.000 per slide.</li><li>Banner Design: Rp100.000, ukuran 1x2 meter sampai 5x5 meter.</li></ul></section>
      <p>Harga tersebut merupakan biaya desain, bukan biaya cetak. Hubungi cepotxyz untuk mendiskusikan brief dan kebutuhan proyek.</p>
    `,
  },
]

const homeContent = `
  <h1>Jasa Motion Graphic, Video Editing & Desain Grafis di Semarang</h1>
  <p>cepotxyz adalah creative motion developer yang membantu brand, UMKM, startup, organisasi, dan instansi menyampaikan ide melalui motion design, video editing, dan desain grafis.</p>
  <section><h2>Creative Services</h2>
    <h3>Motion Graphic</h3><p>Animated visuals for launches, promos, explainers, and brand stories. Paket mulai Rp60.000.</p>
    <h3>Video Editing</h3><p>Rough cut, sound design, voice optimization, dan color grading untuk footage klien. Paket mulai Rp50.000.</p>
    <h3>Graphic Design</h3><p>Desain logo, feed Instagram, ID card plus lanyard, dan banner promosi.</p>
    <p><a href="/services/">Lihat semua layanan</a></p>
  </section>
  <section><h2>Selected Portfolio</h2>
    <ul>
      <li><a href="https://drive.google.com/file/d/1-qgWZR1Lb8s2dkiBP-gumaVkBGss792o/view" target="_blank" rel="noopener noreferrer">Portfolio 2024 Edition</a></li>
      <li><a href="https://drive.google.com/file/d/1WEkN4PDT-22ePWQkJtghPrYd0w3fusTr/view" target="_blank" rel="noopener noreferrer">Portfolio 2025 Edition</a></li>
      <li><a href="https://www.instagram.com/p/DS-Ecb_Em9n/" target="_blank" rel="noopener noreferrer">Portfolio 2026 Edition</a></li>
    </ul>
    <p><a href="/portfolio/">Jelajahi portofolio</a></p>
  </section>
  <section><h2>Starting Prices</h2>
    <ul><li>Motion Graphic: mulai Rp60.000</li><li>Video Editing: mulai Rp50.000</li><li>Logo Design: Rp150.000</li><li>Instagram Feed Design: Rp15.000 per slide</li><li>ID Card Design: Rp15.000 per kartu</li><li>Banner Design: Rp100.000</li></ul>
    <p><a href="/pricing/">Lihat daftar harga lengkap</a></p>
  </section>
  <section><h2>About cepotxyz</h2><p>Creative motion developer dengan latar belakang Information Technology di UIN Walisongo Semarang, menggabungkan visual storytelling, desain, dan teknologi untuk menghasilkan karya digital.</p><p><a href="/about/">Kenali cepotxyz</a></p></section>
`

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
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: route.label, item: pageUrl },
      ],
    },
  }
}

function writeRouteHtml() {
  const source = path.resolve(__dirname, './dist/index.html')
  const baseHtml = readFileSync(source, 'utf8')

  const homeNav = `
    <nav aria-label="Navigasi utama">
      <a href="/">Home</a>
      <a href="/services/">Services</a>
      <a href="/portfolio/">Portfolio</a>
      <a href="/pricing/">Price List</a>
      <a href="/about/">About</a>
    </nav>`

  const homeHtml = baseHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${homeNav}<main id="seo-content">${homeContent}</main></div>`,
  )
  writeFileSync(source, homeHtml)

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
    writeFileSync(
      path.join(outputDir, 'index.html'),
      html.replace(
        '<div id="root"></div>',
        `<div id="root">${homeNav}<main id="seo-content">${route.content}</main></div>`,
      ),
    )
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
