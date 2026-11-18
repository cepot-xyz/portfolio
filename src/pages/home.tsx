import { motion } from "motion/react"

import { PortfolioBackdrop } from "@/components/portfolio-backdrop"
import { PortfolioCardStack } from "@/components/portfolio-card-stack"
import { PricingSection } from "@/components/pricing-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GhostFibersBackground } from "@/components/ghost-fibers-background"
import Magnet from "@/components/Magnet"
import MetallicPaint from "@/components/MetallicPaint"
import { ViewportMount } from "@/components/viewport-mount"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { TextAnimate } from "@/components/ui/text-animate"
import { KineticHeading } from "@/components/ui/kinetic-heading"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import Text3DFlip from "@/components/ui/text-3d-flip"

const logoUrl = `${import.meta.env.BASE_URL}Assets/Cepot White Logo.svg`

export function HomePage() {
  const { fullEffects } = useDeviceProfile()

  return (
    <>
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
        >
          <ViewportMount className="h-full w-full">
            <GhostFibersBackground />
          </ViewportMount>
        </div>
        <div className="relative z-10 grid w-full max-w-6xl items-center gap-20 lg:grid-cols-2 lg:gap-32">
          <div className="flex justify-center lg:justify-start">
            {fullEffects ? (
              <Magnet
                wrapperClassName="h-[18rem] w-full lg:h-[24rem]"
                innerClassName="h-full w-full"
                padding={100}
                magnetStrength={1}
                maxOffset={40}
                tilt={20}
              >
                <ViewportMount className="h-full w-full">
                  <MetallicPaint imageSrc={logoUrl} scale={0.95} />
                </ViewportMount>
              </Magnet>
            ) : (
              <div className="flex h-[18rem] w-full items-center justify-center lg:h-[24rem]">
                <img
                  src={logoUrl}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
            )}
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
            <TextAnimate
              as="p"
              animation="blurInUp"
              by="character"
              delay={0.1}
              once
              className="max-w-md text-muted-foreground"
            >
              Glad to Be of Your Service
            </TextAnimate>
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <ShimmerButton
                type="button"
                background="#000000"
                onClick={() => {
                  document
                    .getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
                className="shadow-lg"
              >
                <span className="text-sm font-medium tracking-tight text-white">
                  Learn More
                </span>
              </ShimmerButton>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="relative overflow-hidden px-6 py-20 sm:py-24"
      >
        <PortfolioBackdrop />
        <div className="pointer-events-none relative z-10">
          <div className="pointer-events-auto mb-10 flex flex-col items-center gap-4">
            <KineticHeading as="h2" className="text-4xl sm:text-5xl">
              Portfolio
            </KineticHeading>
            <TextAnimate
              as="p"
              animation="blurInUp"
              by="character"
              delay={0.1}
              once
              className="max-w-md text-muted-foreground"
            >
              Things I've built and worked on
            </TextAnimate>
          </div>
          <PortfolioCardStack />
        </div>
      </section>

      <ServicesSection />

      <PricingSection />

      <TestimonialsSection />
    </>
  )
}
