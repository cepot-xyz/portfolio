import { PortfolioBackdrop } from "@/components/portfolio-backdrop"
import { lazy, Suspense } from "react"
import { TextAnimate } from "@/components/ui/text-animate"
import { KineticHeading } from "@/components/ui/kinetic-heading"
import { useDeviceProfile } from "@/lib/use-device-profile"

const PortfolioCardStack = lazy(() => import("@/components/portfolio-card-stack").then((module) => ({ default: module.PortfolioCardStack })))
const PortfolioCardList = lazy(() => import("@/components/portfolio-card-list").then((module) => ({ default: module.PortfolioCardList })))

export function PortfolioPage() {
  const { fullEffects } = useDeviceProfile()

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-start overflow-hidden px-6 pt-40 pb-28 text-center">
      <PortfolioBackdrop />

      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center gap-8">
        <div className="pointer-events-auto flex flex-col items-center gap-4">
          <KineticHeading className="text-5xl sm:text-6xl">
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

        <Suspense fallback={<div className="h-[300px] w-full sm:h-[400px] md:h-[500px]" />}>
          {fullEffects ? <PortfolioCardStack /> : <PortfolioCardList />}
        </Suspense>
      </div>
    </section>
  )
}
