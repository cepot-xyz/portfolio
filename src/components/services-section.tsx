import ShapeGrid from "@/components/ShapeGrid"
import { ServiceCard } from "@/components/service-card"
import { KineticHeading } from "@/components/ui/kinetic-heading"
import { TextAnimate } from "@/components/ui/text-animate"
import { ViewportMount } from "@/components/viewport-mount"
import { openPricingSection } from "@/lib/pricing-navigation"
import { useIsDark } from "@/lib/use-is-dark"
import { cn } from "@/lib/utils"

const asset = (name: string) => `${import.meta.env.BASE_URL}Assets/${name}`

const services = [
  {
    image: asset("services/motiongraphic.png"),
    alt: "Motion graphic preview",
    title: "Motion Graphic",
    description:
      "Animated visuals for launches, promos, and brand stories.",
    pricingTarget: "motion-graphic",
  },
  {
    image: asset("services/videoediting.png"),
    alt: "Video editing preview",
    title: "Video Editing",
    description:
      "Clean cuts, sound design, and color grading for your footage.",
    pricingTarget: "video-editing",
  },
  {
    image: asset("services/graphicdesign.png"),
    alt: "Graphic design preview",
    title: "Graphic Design",
    description:
      "Logos, social feeds, and print assets that stay on brand.",
    pricingTarget: "graphic-design",
  },
]

export function ServicesSection({
  variant = "embedded",
}: {
  variant?: "page" | "embedded"
}) {
  const isDark = useIsDark()
  const isPage = variant === "page"

  const handleOrder = (target: string) => {
    if (isPage) {
      openPricingSection(target)
      return
    }

    document
      .getElementById(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      className={cn("relative isolate", !isPage && "py-20 sm:py-24")}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none -z-10 overflow-hidden",
          isPage ? "fixed inset-0" : "absolute inset-0"
        )}
      >
        <ViewportMount className="h-full w-full">
          <ShapeGrid
            shape="square"
            cellSize={56}
            lineWidth={1}
            lineColor={isDark ? "#3f3f46" : "#d4d4d8"}
            hoverColor={isDark ? "#fafafa" : "#18181b"}
            hoverFillColor={isDark ? "#a1a1aa" : "#52525b"}
            fillOpacity={0.14}
            rainbow={false}
            direction="diagonal"
            speed={0.35}
            radius={2}
            trail={0.55}
            glow={isDark ? 0.35 : 0.2}
            twinkle={0}
            fade={0.9}
            opacity={0.8}
            className="h-full w-full"
          />
        </ViewportMount>
      </div>
      <div
        className={cn(
          "flex flex-col items-center px-6 text-center",
          isPage ? "pb-[15px] pt-40" : "pb-10"
        )}
      >
        <div className="flex w-full flex-col items-center justify-start gap-4">
          <KineticHeading className="text-5xl">Services</KineticHeading>
          <TextAnimate
            as="p"
            animation="blurInUp"
            by="character"
            delay={0.1}
            once
            className="text-muted-foreground"
          >
            Here's How I can help bring your ideas to life
          </TextAnimate>
        </div>
      </div>
      <div
        className={cn(
          "px-4 md:px-[1px]",
          isPage ? "pb-4 pt-12" : undefined
        )}
      >
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
              onOrder={handleOrder}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
