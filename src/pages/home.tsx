import { Meteors } from "@/components/ui/meteors"
import Text3DFlip from "@/components/ui/text-3d-flip"

export function HomePage() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center gap-4 overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      >
        <Meteors number={30} />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <Text3DFlip
          as="h1"
          texts={[
            "Hi, I'm cepot",
            "Kenalin, aku cepot",
            "Sampurasun, abdi cepot",
          ]}
          className="justify-center text-5xl font-semibold tracking-tight"
          rotateDirection="top"
          staggerDuration={0.03}
          transition={{ type: "spring", damping: 25, stiffness: 160 }}
        />
        <p className="max-w-md text-muted-foreground">
          Glad to Be of Your Service
        </p>
      </div>
    </section>
  )
}
