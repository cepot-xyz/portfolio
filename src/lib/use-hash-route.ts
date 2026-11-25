import { useEffect, useState } from "react"

const siteUrl = "https://www.cepotxyz.my.id/"

const routeMeta = {
  "/": {
    label: "Home",
    title: "cepotxyz | Jasa Motion Graphic, Video Editing & Desain Grafis Semarang",
    description:
      "Jasa motion graphic, video editing, dan desain grafis di Semarang. Logo, feed Instagram, ID card, dan banner untuk UMKM, startup, dan instansi.",
  },
  "/about": {
    label: "Tentang",
    title: "Tentang cepotxyz | Creative Motion Developer Semarang",
    description:
      "Tentang Affandi Rahman Hakim, creative motion developer di Semarang. Motion design, visual storytelling, dan desain grafis untuk brand.",
  },
  "/services": {
    label: "Layanan",
    title: "Jasa Motion Graphic, Video Editing & Desain Grafis | cepotxyz",
    description:
      "Jasa motion graphic, video editing, logo, feed Instagram, ID card plus lanyard, dan banner untuk UMKM, startup, dan instansi di Semarang.",
  },
  "/portfolio": {
    label: "Portofolio",
    title: "Portofolio Motion Graphic & Video Editing | cepotxyz",
    description:
      "Portofolio motion graphic, video editing, dan desain grafis cepotxyz untuk promosi produk, launch brand, dan kebutuhan visual UMKM.",
  },
  "/pricing": {
    label: "Harga",
    title: "Harga Jasa Motion Graphic, Video Editing & Desain Grafis | cepotxyz",
    description:
      "Harga motion graphic mulai Rp60.000, video editing Rp50.000, logo Rp150.000, feed Instagram Rp15.000 per slide, ID card Rp15.000, banner Rp100.000.",
  },
} as const

export type RoutePath = keyof typeof routeMeta

function getRoute(): RoutePath {
  const path = window.location.hash.replace(/^#/, "")
  return path in routeMeta ? (path as RoutePath) : "/"
}

function setMeta(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content)
}

function setJsonLd(route: RoutePath) {
  const meta = routeMeta[route]
  const pageUrl = route === "/" ? siteUrl : `${siteUrl}#${route}`

  let script = document.querySelector<HTMLScriptElement>("#route-schema")
  if (!script) {
    script = document.createElement("script")
    script.id = "route-schema"
    script.type = "application/ld+json"
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}#webpage-${route === "/" ? "home" : route.slice(1)}`,
    url: pageUrl,
    name: meta.title,
    description: meta.description,
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        ...(route === "/"
          ? []
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: meta.label,
                item: pageUrl,
              },
            ]),
      ],
    },
  })
}

export function useHashRoute() {
  const [route, setRoute] = useState<RoutePath>(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  useEffect(() => {
    const meta = routeMeta[route]
    const currentUrl = window.location.href

    document.title = meta.title
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
    setMeta('meta[property="og:url"]', currentUrl)
    setMeta('meta[name="twitter:title"]', meta.title)
    setMeta('meta[name="twitter:description"]', meta.description)
    setMeta('meta[name="twitter:url"]', currentUrl)
    setJsonLd(route)
    window.scrollTo(0, 0)
  }, [route])

  return route
}
