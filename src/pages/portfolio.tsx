import { PortfolioBackdrop } from "@/components/portfolio-backdrop"
import { PortfolioCardStack } from "@/components/portfolio-card-stack"
import { KineticText } from "@/components/ui/kinetic-text"

export function PortfolioPage() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-start overflow-hidden px-6 pt-40 pb-28 text-center">
      <PortfolioBackdrop />

      <div className="relative z-10 flex w-full flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <KineticText
            text="Portfolio"
            className="justify-center text-5xl tracking-tight sm:text-6xl"
          />
          <p className="max-w-md text-muted-foreground">
            From years to years, here is what are you looking for?
          </p>
        </div>

        <PortfolioCardStack />
      </div>
    </section>
  )
}
