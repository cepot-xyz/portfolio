import { useEffect, useState } from "react"

const titles = {
  "/": "cepotxyz | Creative Motion Developer",
  "/about": "cepotxyz | About",
  "/services": "cepotxyz | Services",
  "/portfolio": "cepotxyz | Portfolio",
  "/pricing": "cepotxyz | Price List",
} as const

export type RoutePath = keyof typeof titles

function getRoute(): RoutePath {
  const path = window.location.hash.replace(/^#/, "")
  return path in titles ? (path as RoutePath) : "/"
}

export function useHashRoute() {
  const [route, setRoute] = useState<RoutePath>(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  useEffect(() => {
    document.title = titles[route]
    window.scrollTo(0, 0)
  }, [route])

  return route
}
