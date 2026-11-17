import { TestimonialsSection } from "@/components/testimonials-section"
import { TopographyBackground } from "@/components/topography-background"

export function TestimonialsPage() {
  return (
    <>
      <TopographyBackground />
      <section className="relative z-10 flex flex-col justify-start pt-40 pb-[15px]">
        <TestimonialsSection />
      </section>
    </>
  )
}
