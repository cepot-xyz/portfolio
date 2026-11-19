import { useEffect, useState } from "react"

const routeMeta = {
  "/": {
    title: "cepotxyz | Creative Motion Developer",
    description:
      "cepotxyz is a creative motion developer crafting visual identities with precision and soul. Motion, design, and creative direction for modern brands.",
  },
  "/about": {
    title: "cepotxyz | About",
    description:
      "Learn about cepotxyz, a creative motion developer focused on visual identities, motion, design, and creative direction.",
  },
  "/services": {
    title: "cepotxyz | Services",
    description:
      "Explore motion, design, and creative direction services from cepotxyz for modern brands.",
  },
  "/portfolio": {
    title: "cepotxyz | Portfolio",
    description:
      "Selected projects and visual work by cepotxyz across motion, design, and creative direction.",
  },
  "/pricing": {
    title: "cepotxyz | Price List",
    description:
      "Price list for cepotxyz creative motion, design, and video services.",
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

export function useHashRoute() {
  const [route, setRoute] = useState<RoutePath>(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  useEffect(() => {
    const meta = routeMeta[route]
    document.title = meta.title
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
    setMeta('meta[name="twitter:title"]', meta.title)
    setMeta('meta[name="twitter:description"]', meta.description)
    window.scrollTo(0, 0)
  }, [route])

  return route
}
