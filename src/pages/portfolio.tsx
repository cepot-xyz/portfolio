import portfolio2024 from "@/assets/portfolio/portfolio-2024.png"
import portfolio2025 from "@/assets/portfolio/portfolio-2025.png"
import portfolio2026 from "@/assets/portfolio/portfolio-2026.png"
import CardSwap, { Card } from "@/components/CardSwap"
import DriftWall, { type DriftWallItem } from "@/components/DriftWall"
import { KineticText } from "@/components/ui/kinetic-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"

const photos: DriftWallItem[] = [
  { image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=75", title: "Studio" },
  { image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=75", title: "Team" },
  { image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=75", title: "Collaboration" },
  { image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=75", title: "Workspace" },
  { image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=75", title: "Office" },
  { image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=75", title: "Design" },
  { image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=75", title: "Interface" },
  { image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=75", title: "Code" },
  { image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=75", title: "Development" },
  { image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=75", title: "Engineering" },
  { image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=900&q=75", title: "Process" },
  { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=75", title: "Build" },
  { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=75", title: "Creative" },
  { image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=75", title: "Detail" },
  { image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=75", title: "Studio life" },
]

const portfolios = [
  {
    year: "2024",
    href: "https://drive.google.com/file/d/1-qgWZR1Lb8s2dkiBP-gumaVkBGss792o/view",
    image: portfolio2024,
  },
  {
    year: "2025",
    href: "https://drive.google.com/file/d/1WEkN4PDT-22ePWQkJtghPrYd0w3fusTr/view",
    image: portfolio2025,
  },
  {
    year: "2026",
    href: "https://www.instagram.com/p/DS-Ecb_Em9n/",
    image: portfolio2026,
  },
]

export function PortfolioPage() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-28 text-center">
      <div
        aria-hidden="true"
        inert
        className="pointer-events-none absolute inset-0 z-0"
      >
        <DriftWall
          items={photos}
          columns={5}
          tileWidth={224}
          tileHeight={150}
          gap={18}
          radius={16}
          tilt={16}
          turn={-12}
          depth={140}
          speed={26}
          direction="up"
          variance={0.38}
          parallax={0.35}
          fade={0.68}
          dim={0.5}
          grayscale
          overlayColor="#0a0a0a"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-background/60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 h-52 bg-linear-to-b from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-t from-background to-transparent"
      />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8">
        <KineticText
          text="Portfolio"
          className="justify-center text-5xl tracking-tight sm:text-6xl"
        />

        <div className="h-[540px] w-full max-w-xl">
          <CardSwap
            width={340}
            height={360}
            cardDistance={36}
            verticalDistance={38}
            depth={70}
            skewAmount={4}
            visibleCards={3}
            delay={4500}
            autoplay
            pauseOnHover
            draggable
            speed={0.9}
            bounce={0.3}
            parallax={0.4}
            hoverSpread={0.08}
            dim={0.45}
            cardRadius={18}
          >
            {portfolios.map(({ year, href, image }) => (
              <Card
                key={year}
                style={{
                  background: "var(--card)",
                  color: "var(--card-foreground)",
                }}
              >
                <div className="flex h-full flex-col p-2">
                  <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={image}
                      alt={`Thumbnail portfolio ${year}`}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-none justify-center pt-3 pb-1">
                    <ShimmerButton
                      type="button"
                      aria-label={`Buka portfolio ${year}`}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation()
                        window.open(href, "_blank", "noopener,noreferrer")
                      }}
                    >
                      <span className="text-sm font-medium tracking-tight text-white">
                        Learn More
                      </span>
                    </ShimmerButton>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  )
}
