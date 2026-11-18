import { motion } from "motion/react"

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { ShineBorder } from "@/components/ui/shine-border"
import { playClick } from "@/lib/audio"
import { portfolios } from "@/lib/portfolio"

const shineColors = ["#0060de", "#38bdf8", "#a78bfa", "#f0abfc"]

export function PortfolioCardList() {
  return (
    <div className="pointer-events-auto grid w-full grid-cols-1 gap-6">
      {portfolios.map(({ year, href, image, imageWidth, imageHeight }) => (
        <motion.article
          key={year}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            y: { duration: 0.3 },
            opacity: { duration: 0.4 },
          }}
          className="relative flex w-full flex-col overflow-hidden rounded-[18px] bg-card text-card-foreground shadow-[0_24px_48px_-26px_rgba(24,24,27,0.32),0_8px_18px_-12px_rgba(24,24,27,0.18)] ring-1 ring-foreground/5 ring-inset dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.85),0_8px_18px_-10px_rgba(0,0,0,0.6)]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <img
              src={image}
              alt={`Thumbnail portfolio ${year}`}
              width={imageWidth}
              height={imageHeight}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col p-5">
            <h3 className="text-lg font-semibold tracking-tight">
              Portfolio {year} Edition
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Selected work from {year}.
            </p>
            <div className="mt-5 flex justify-center">
              <InteractiveHoverButton
                type="button"
                aria-label={`Buka portfolio ${year}`}
                className="text-sm tracking-tight"
                onClick={() => {
                  playClick()
                  window.open(href, "_blank", "noopener,noreferrer")
                }}
              >
                Learn More
              </InteractiveHoverButton>
            </div>
          </div>
          <ShineBorder
            borderWidth={1.5}
            duration={10}
            shineColor={shineColors}
          />
        </motion.article>
      ))}
    </div>
  )
}
