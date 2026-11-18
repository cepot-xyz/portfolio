import Scanner from "@/components/Scanner"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ViewportMount } from "@/components/viewport-mount"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { useIsDark } from "@/lib/use-is-dark"

export function TestimonialsPage() {
  const isDark = useIsDark()
  const { fullEffects } = useDeviceProfile()

  return (
    <div className="relative isolate">
      {fullEffects && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <ViewportMount className="h-full w-full">
            <Scanner
              color1={isDark ? "#d4d4d4" : "#3f3f46"}
              color2={isDark ? "#a3a3a3" : "#525252"}
              color3={isDark ? "#fafafa" : "#18181b"}
              lightMode={!isDark}
              mouseInteraction
              className="h-full w-full"
            />
          </ViewportMount>
        </div>
      )}
      <section className="relative z-10 flex flex-col justify-start pt-40 pb-[15px]">
        <TestimonialsSection />
      </section>
    </div>
  )
}
