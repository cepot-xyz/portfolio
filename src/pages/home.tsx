import { PortfolioBackdrop } from "@/components/portfolio-backdrop"
import { PortfolioCardStack } from "@/components/portfolio-card-stack"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GhostFibersBackground } from "@/components/ghost-fibers-background"
import Magnet from "@/components/Magnet"
import MetallicPaint from "@/components/MetallicPaint"
import { KineticText } from "@/components/ui/kinetic-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import Text3DFlip from "@/components/ui/text-3d-flip"

const logoUrl = `${import.meta.env.BASE_URL}Assets/Cepot White Logo.svg`

export function HomePage() {
  return (
    <>
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
        >
          <GhostFibersBackground />
        </div>
        <div className="relative z-10 grid w-full max-w-6xl items-center gap-20 lg:grid-cols-2 lg:gap-32">
          <div className="flex justify-center lg:justify-start">
            <Magnet
              wrapperClassName="h-[18rem] w-full lg:h-[24rem]"
              innerClassName="h-full w-full"
              padding={100}
              magnetStrength={3}
              maxOffset={40}
            >
              <MetallicPaint imageSrc={logoUrl} scale={0.95} />
            </Magnet>
          </div>
          <div className="flex flex-col items-center gap-4 lg:items-start lg:text-left">
            <div className="flex min-h-24 w-full items-end justify-center lg:justify-start">
              <Text3DFlip
                as="h1"
                texts={[
                  "Hi, I'm cepot",
                  "Kenalin, aku cepot",
                  "Sampurasun, abdi cepot",
                ]}
                className="w-full justify-center text-5xl font-semibold tracking-tight lg:justify-start"
                rotateDirection="top"
                staggerDuration={0.03}
                transition={{ type: "spring", damping: 25, stiffness: 160 }}
              />
            </div>
            <p className="max-w-md text-muted-foreground">
              Glad to Be of Your Service
            </p>
            <ShimmerButton
              type="button"
              background="var(--cta-bg)"
              onClick={() => {
                window.location.hash = "/portfolio"
              }}
              className="shadow-lg"
            >
              <span className="text-sm font-medium tracking-tight text-[color:var(--cta-ink)]">
                Learn More
              </span>
            </ShimmerButton>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <PortfolioBackdrop />
        <div className="relative z-10">
          <div className="mb-10 flex flex-col items-center gap-4">
            <KineticText
              text="Portfolio"
              className="justify-center text-4xl tracking-tight sm:text-5xl"
            />
            <p className="max-w-md text-muted-foreground">
              From years to years, here is what are you looking for?
            </p>
          </div>
          <PortfolioCardStack />
        </div>
      </section>

      <TestimonialsSection />
    </>
  )
}
