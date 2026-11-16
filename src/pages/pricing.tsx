import { DitherField } from "@/components/ui/dither-field"
import { KineticText } from "@/components/ui/kinetic-text"

export function PricingPage() {
  return (
    <section className="relative min-h-svh">
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
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pb-28 text-center">
        <div className="flex min-h-[38.75rem] w-full flex-col items-center justify-start gap-4 sm:min-h-[39.5rem]">
          <KineticText
            text="Price List"
            className="justify-center text-5xl tracking-tight"
          />
          <p className="max-w-md text-muted-foreground">Halaman Price List</p>
        </div>
      </div>
    </section>
  )
}
