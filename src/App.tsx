import { useRef, type ComponentType } from "react"

import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { BgmToggle } from "@/components/bgm-toggle"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { SoundEffects } from "@/components/sound-effects"
import { TextLoopSection } from "@/components/text-loop-section"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { useHashRoute, type RoutePath } from "@/lib/use-hash-route"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { useInView } from "@/lib/use-in-view"
import { AboutPage } from "@/pages/about"
import { HomePage } from "@/pages/home"
import { PortfolioPage } from "@/pages/portfolio"
import { PricingPage } from "@/pages/pricing"
import { ServicesPage } from "@/pages/services"
import { TestimonialsPage } from "@/pages/testimonials"

const pages: Record<RoutePath, ComponentType> = {
  "/": HomePage,
  "/about": AboutPage,
  "/services": ServicesPage,
  "/portfolio": PortfolioPage,
  "/pricing": PricingPage,
  "/testimonials": TestimonialsPage,
}

const controlButtonClass =
  "absolute inset-0 inline-flex size-full cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4"

const controlSurfaceClass =
  "relative size-10 shrink-0 rounded-full border border-border bg-card shadow-sm"

function App() {
  const route = useHashRoute()
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
        {!fullEffects && !(route === "/about" && tier === "desktop") && (
          <AmbientBackdrop />
        )}
        <div className="relative z-10">
          <Page />
          <TextLoopSection
            showGridBackground={route === "/" || route === "/portfolio"}
          />
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
