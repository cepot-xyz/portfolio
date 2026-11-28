import { lazy, Suspense, useRef, type ComponentType } from "react"

import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { BgmToggle } from "@/components/bgm-toggle"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { SoundEffects } from "@/components/sound-effects"
import { TextLoopSection } from "@/components/text-loop-section"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { useAppRoute, type RoutePath } from "@/lib/use-app-route"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { useInView } from "@/lib/use-in-view"

const HomePage = lazy(() => import("@/pages/home").then((module) => ({ default: module.HomePage })))
const AboutPage = lazy(() => import("@/pages/about").then((module) => ({ default: module.AboutPage })))
const ServicesPage = lazy(() => import("@/pages/services").then((module) => ({ default: module.ServicesPage })))
const PortfolioPage = lazy(() => import("@/pages/portfolio").then((module) => ({ default: module.PortfolioPage })))
const PricingPage = lazy(() => import("@/pages/pricing").then((module) => ({ default: module.PricingPage })))

const pages: Record<RoutePath, ComponentType> = {
  "/": HomePage,
  "/about": AboutPage,
  "/services": ServicesPage,
  "/portfolio": PortfolioPage,
  "/pricing": PricingPage,
}

const controlButtonClass =
  "absolute inset-0 inline-flex size-full cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4"

const controlSurfaceClass =
  "relative size-10 shrink-0 rounded-full border border-border bg-card shadow-sm"

function App() {
  const route = useAppRoute()
  const { tier, fullEffects } = useDeviceProfile()
  const footerRef = useRef<HTMLElement>(null)
  const footerVisible = useInView(footerRef)
  const Page = pages[route]

  return (
    <>
      <SoundEffects />
      <div className="fixed right-4 top-4 z-50 flex flex-col items-center gap-2">
        <div className={controlSurfaceClass}>
          <AnimatedThemeToggler
            aria-label="Ganti tema"
            className={controlButtonClass}
          />
        </div>
        <div className={controlSurfaceClass}>
          <BgmToggle className={controlButtonClass} />
        </div>
      </div>
      <SiteNav current={route} hidden={footerVisible} />
      <main className="min-h-svh bg-background text-foreground">
        {!fullEffects && tier !== "desktop" && (
          <AmbientBackdrop />
        )}
        <div className="relative z-10">
          <Suspense fallback={<div className="min-h-svh" aria-label="Loading page" />}>
            <Page />
            <TextLoopSection
              showGridBackground={route === "/" || route === "/portfolio"}
            />
          </Suspense>
        </div>
      </main>
      {tier === "desktop" && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30"
        >
          <ProgressiveBlur position="top" height="20%" />
          <ProgressiveBlur position="bottom" height="20%" />
        </div>
      )}
      <SiteFooter footerRef={footerRef} />
    </>
  )
}

export default App
