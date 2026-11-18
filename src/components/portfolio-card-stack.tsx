import CardSwap, { Card } from "@/components/CardSwap"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { ViewportMount } from "@/components/viewport-mount"
import { playClick } from "@/lib/audio"
import { portfolios } from "@/lib/portfolio"
import { useIsDark } from "@/lib/use-is-dark"

const CARD_CHROME_WIDTH = 16
const CARD_CHROME_HEIGHT = 70
const MAX_IMAGE_WIDTH = 700
const MAX_IMAGE_HEIGHT = 560

const portfolioCardSizes = portfolios.map(({ imageWidth, imageHeight }) => {
  const scale = Math.min(1, MAX_IMAGE_WIDTH / imageWidth, MAX_IMAGE_HEIGHT / imageHeight)

  return {
    width: Math.round(imageWidth * scale) + CARD_CHROME_WIDTH,
    height: Math.round(imageHeight * scale) + CARD_CHROME_HEIGHT,
  }
})

export function PortfolioCardStack() {
  const isDark = useIsDark()

  return (
    <div className="pointer-events-none h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[760px]">
      <ViewportMount className="h-full w-full">
        <CardSwap
          theme={isDark ? "dark" : "light"}
          cardSizes={portfolioCardSizes}
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
          {portfolios.map(({ year, href, image, imageWidth, imageHeight }) => (
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
                    width={imageWidth}
                    height={imageHeight}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-none items-center justify-between gap-2 pt-3 pb-1">
                  <p className="whitespace-nowrap text-sm font-medium tracking-tight text-card-foreground sm:text-base">
                    Portfolio {year} Edition
                  </p>
                  <InteractiveHoverButton
                    type="button"
                    aria-label={`Buka portfolio ${year}`}
                    className="text-sm tracking-tight"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation()
                      playClick()
                      window.open(href, "_blank", "noopener,noreferrer")
                    }}
                  >
                    Learn More
                  </InteractiveHoverButton>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </ViewportMount>
    </div>
  )
}
