import { useRef, type ComponentType } from "react"

import { BgmToggle } from "@/components/bgm-toggle"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { SoundEffects } from "@/components/sound-effects"
import { TextLoopSection } from "@/components/text-loop-section"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { useHashRoute, type RoutePath } from "@/lib/use-hash-route"
import { useInView } from "@/lib/use-in-view"
import { HomePage } from "@/pages/home"
import { PortfolioPage } from "@/pages/portfolio"
import { PricingPage } from "@/pages/pricing"
import { ServicesPage } from "@/pages/services"
import { TestimonialsPage } from "@/pages/testimonials"

const pages: Record<RoutePath, ComponentType> = {
  "/": HomePage,
  "/services": ServicesPage,
  "/portfolio": PortfolioPage,
  "/pricing": PricingPage,
  "/testimonials": TestimonialsPage,
}

const controlButtonClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4"

function App() {
  const route = useHashRoute()
  const footerRef = useRef<HTMLElement>(null)
  const footerVisible = useInView(footerRef)
  const Page = pages[route]

  return (
    <>
      <SoundEffects />
      <div className="fixed right-4 top-4 z-50 flex flex-col items-center gap-2">
        <AnimatedThemeToggler
          aria-label="Ganti tema"
          className={controlButtonClass}
        />
        <BgmToggle className={controlButtonClass} />
      </div>
      <SiteNav current={route} hidden={footerVisible} />
      <main className="min-h-svh bg-background text-foreground">
        <Page />
        <TextLoopSection
          showGridBackground={route === "/" || route === "/portfolio"}
        />
      </main>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30"
      >
        <ProgressiveBlur position="top" height="20%" />
        <ProgressiveBlur position="bottom" height="20%" />
      </div>
      <SiteFooter footerRef={footerRef} />
    </>
  )
}

export default App
