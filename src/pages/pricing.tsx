import { DitherField } from "@/components/ui/dither-field"
import { TextAnimate } from "@/components/ui/text-animate"
import { KineticHeading } from "@/components/ui/kinetic-heading"

export function PricingPage() {
  return (
    <section className="relative">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <DitherField
          pattern="horizon"
          color={["var(--dither-low)", "var(--dither-mid)", "var(--dither-high)"]}
          className="h-full w-full [--dither-high:#171717] [--dither-low:#e5e5e5] [--dither-mid:#737373] dark:[--dither-high:#fafafa] dark:[--dither-low:#262626] dark:[--dither-mid:#a3a3a3]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-48 bg-linear-to-t from-background to-transparent"
      />
      <div className="relative z-10 flex flex-col items-center justify-start px-6 pt-40 pb-[15px] text-center">
        <div className="flex w-full flex-col items-center justify-start gap-4">
          <KineticHeading className="text-5xl">Price List</KineticHeading>
          <TextAnimate
            as="p"
            animation="blurInUp"
            by="character"
            delay={0.1}
            once
            className="max-w-md text-muted-foreground"
          >
            Find the right package for your project
          </TextAnimate>
        </div>
      </div>
    </section>
  )
}
