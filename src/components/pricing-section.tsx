import { useEffect, useState } from "react"

import AeroShards from "@/components/AeroShards"
import { PriceCard } from "@/components/price-card"
import { KineticHeading } from "@/components/ui/kinetic-heading"
import { TextAnimate } from "@/components/ui/text-animate"
import { ViewportMount } from "@/components/viewport-mount"
import { PRICING_TARGET_KEY } from "@/lib/pricing-navigation"
import { useIsDark } from "@/lib/use-is-dark"
import { cn } from "@/lib/utils"

const FALLBACK_IDR_RATE = 18273

type PricingCardData = {
  eyebrow: string
  title: string
  priceIdr: number
  benefits: string[]
  effect?: "shine" | "beam"
}

type PricingCategory = {
  id: string
  title: string
  cards: PricingCardData[]
  columns: 3 | 4
}

const categories: PricingCategory[] = [
  {
    id: "motion-graphic",
    title: "Motion Graphic Price List",
    columns: 3,
    cards: [
      {
        eyebrow: "Perfect for new businesses",
        title: "Basic Plan",
        priceIdr: 60000,
        benefits: ["Basic Animation", "All Project Files (burnt in 1 month)"],
      },
      {
        eyebrow: "Complete identity overhaul",
        title: "Premium Plan",
        priceIdr: 240000,
        benefits: [
          "Full Production",
          "Sound Design",
          "Priority Support",
          "Original Asset Restoration",
          "All Project Files (burnt in 1 month)",
        ],
        effect: "shine",
      },
      {
        eyebrow: "For dynamic storytelling",
        title: "Pro Plan",
        priceIdr: 120000,
        benefits: [
          "Advanced Animation",
          "Sound Design",
          "Original Asset Restoration",
          "All Project Files (burnt in 1 month)",
        ],
        effect: "beam",
      },
    ],
  },
  {
    id: "video-editing",
    title: "Video Editing Price List",
    columns: 3,
    cards: [
      {
        eyebrow: "Perfect for new businesses",
        title: "Basic Plan",
        priceIdr: 50000,
        benefits: [
          "Roughcut",
          "Sound Design",
          "Voice Optimization",
          "All Project Files (burnt in 1 month)",
        ],
      },
      {
        eyebrow: "Complete identity overhaul",
        title: "Premium Plan",
        priceIdr: 200000,
        benefits: [
          "Roughcut",
          "Voice Optimization",
          "Sound Design",
          "Priority Support",
          "Original Asset Restoration",
          "All Project Files (burnt in 1 month)",
        ],
        effect: "shine",
      },
      {
        eyebrow: "For dynamic storytelling",
        title: "Pro Plan",
        priceIdr: 100000,
        benefits: [
          "Roughcut",
          "Voice Optimization",
          "Sound Design",
          "Original Asset Restoration",
          "All Project Files (burnt in 1 month)",
        ],
        effect: "beam",
      },
    ],
  },
  {
    id: "graphic-design",
    title: "Graphic Design Price List",
    columns: 4,
    cards: [
      {
        eyebrow: "Perfect for new businesses",
        title: "Logo Design",
        priceIdr: 150000,
        benefits: [
          "3 Logo Concepts",
          "Basic Brand Guidelines",
          "All Project Files (burnt in 1 month)",
        ],
        effect: "beam",
      },
      {
        eyebrow: "For brand identity, calculated per card",
        title: "ID Card Design",
        priceIdr: 15000,
        benefits: [
          "Including Lanyard Design",
          "All Project Files (burnt in 1 month)",
        ],
        effect: "beam",
      },
      {
        eyebrow: "For brand marketing, calculated per slide",
        title: "Instagram Feed Design",
        priceIdr: 15000,
        benefits: [
          "Consistent Instagram Profile",
          "All Project Files (burnt in 1 month)",
        ],
        effect: "beam",
      },
      {
        eyebrow: "For events and promotions",
        title: "Banner Design",
        priceIdr: 100000,
        benefits: [
          "Minimum size 1x2 meters",
          "Maximum size 5x5 meters",
          "All Project Files (burnt in 1 month)",
        ],
        effect: "beam",
      },
    ],
  },
]

function useIdrRate() {
  const [idrRate, setIdrRate] = useState(FALLBACK_IDR_RATE)

  useEffect(() => {
    let cancelled = false

    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch exchange rate")
        return response.json() as Promise<{ rates?: { IDR?: number } }>
      })
      .then((data) => {
        const rate = Number(data.rates?.IDR)
        if (!cancelled && Number.isFinite(rate) && rate > 0) {
          setIdrRate(rate)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  return idrRate
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  )

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return isMobile
}

export function PricingSection({
  variant = "embedded",
}: {
  variant?: "page" | "embedded"
}) {
  const isDark = useIsDark()
  const idrRate = useIdrRate()
  const isMobile = useIsMobile()
  const isPage = variant === "page"
  const showBackground = isPage || !isMobile

  useEffect(() => {
    if (!isPage) return

    const target = sessionStorage.getItem(PRICING_TARGET_KEY)
    if (!target) return

    sessionStorage.removeItem(PRICING_TARGET_KEY)
    const timeout = window.setTimeout(() => {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 150)

    return () => window.clearTimeout(timeout)
  }, [isPage])

  return (
    <section
      className={cn(
        "relative isolate",
        isPage ? undefined : "py-20 sm:py-24"
      )}
    >
      {showBackground && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none -z-10",
            isPage ? "fixed inset-0" : "absolute inset-0"
          )}
        >
          <ViewportMount className="h-full w-full">
            <AeroShards
              count={10}
              shardColor={isDark ? "#d4d4d4" : "#3f3f46"}
              accentColor={isDark ? "#fafafa" : "#18181b"}
              lightMode={!isDark}
              mouseInteraction
              className="h-full w-full"
            />
          </ViewportMount>
        </div>
      )}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center justify-start text-center",
          isPage && "pt-40 pb-[15px]"
        )}
      >
        <div className="flex w-full flex-col items-center justify-start gap-4 px-6">
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
        <div className="mt-16 flex w-full flex-col gap-16 px-4 md:px-[1px]">
          {categories.map(({ id, title, cards, columns }, index) => (
            <section
              key={title}
              id={id}
              className="flex scroll-mt-24 flex-col gap-6"
            >
              <KineticHeading
                as="h2"
                className={cn(
                  "px-6 text-2xl sm:text-3xl",
                  index > 0 && "mt-[100px]"
                )}
              >
                {title}
              </KineticHeading>
              <div className="flex w-full flex-wrap justify-center gap-6">
                {cards.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className={cn(
                      "w-[75%] sm:w-[calc(37.5%-0.5625rem)]",
                      columns === 3
                        ? "lg:w-[calc(25%-0.75rem)]"
                        : "lg:w-[calc(18.75%-0.84375rem)]"
                    )}
                  >
                    <PriceCard {...card} rate={idrRate} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
