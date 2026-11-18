import { useRef, type ComponentType } from "react"

import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { BgmToggle } from "@/components/bgm-toggle"
import GlassSurface from "@/components/GlassSurface"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { SoundEffects } from "@/components/sound-effects"
import { TextLoopSection } from "@/components/text-loop-section"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { useHashRoute, type RoutePath } from "@/lib/use-hash-route"
import { useDeviceProfile } from "@/lib/use-device-profile"
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
  "absolute inset-0 inline-flex size-full items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4"

const controlGlassClass = "shrink-0"

function App() {
  const route = useHashRoute()
  const { fullEffects } = useDeviceProfile()
  const footerRef = useRef<HTMLElement>(null)
  const footerVisible = useInView(footerRef)
  const Page = pages[route]

  return (
    <>
      <SoundEffects />
      <div className="fixed right-4 top-4 z-50 flex flex-col items-center gap-2">
        <GlassSurface
          width={40}
          height={40}
          borderRadius={20}
          backgroundOpacity={0.35}
          className={controlGlassClass}
        >
          <AnimatedThemeToggler
            aria-label="Ganti tema"
            className={controlButtonClass}
          />
        </GlassSurface>
        <GlassSurface
          width={40}
          height={40}
          borderRadius={20}
          backgroundOpacity={0.35}
          className={controlGlassClass}
        >
          <BgmToggle className={controlButtonClass} />
        </GlassSurface>
      </div>
      <SiteNav current={route} hidden={footerVisible} />
      <main className="min-h-svh bg-background text-foreground">
        {!fullEffects && <AmbientBackdrop />}
        <div className="relative z-10">
          <Page />
          <TextLoopSection
            showGridBackground={route === "/" || route === "/portfolio"}
          />
        </div>
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
