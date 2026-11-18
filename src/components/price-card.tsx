import type { CSSProperties, ReactNode } from "react"
import { motion } from "motion/react"

import AnimatedList from "@/components/AnimatedList"
import Magnet from "@/components/Magnet"
import SpecularButton from "@/components/SpecularButton"
import { BorderBeam } from "@/components/ui/border-beam"
import { ShineBorder } from "@/components/ui/shine-border"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { useIsDark } from "@/lib/use-is-dark"
import { cn } from "@/lib/utils"

type PriceCardProps = {
  eyebrow?: string
  title?: string
  priceIdr?: number
  rate?: number
  benefits?: string[]
  effect?: "shine" | "beam"
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

const listStyle = {
  "--al-tile": "transparent",
  "--al-tile-edge": "transparent",
  "--al-tile-highlight": "transparent",
  "--al-tile-shadow": "none",
  "--al-hover": "none",
  "--al-press": "none",
  "--al-active": "none",
  "--al-ring": "transparent",
  "--al-ring-fill": "transparent",
} as CSSProperties

export function PriceCard({
  eyebrow,
  title,
  priceIdr = 18000,
  rate = 18273,
  benefits = [],
  effect,
  children,
  className,
  style,
}: PriceCardProps) {
  const isDark = useIsDark()
  const { tier } = useDeviceProfile()
  const reduceBlur = tier !== "desktop"

  return (
    <Magnet
      style={{ display: "block" }}
      wrapperClassName="w-full"
      innerClassName="w-full"
      padding={100}
      alwaysFollow
      exclusive={false}
      magnetStrength={1}
      maxOffset={20}
      tilt={20}
    >
      <motion.div
        initial={
          reduceBlur
            ? { opacity: 0, y: 20 }
            : { opacity: 0, filter: "blur(10px)", y: 20 }
        }
        whileInView={
          reduceBlur
            ? { opacity: 1, y: 0 }
            : { opacity: 1, filter: "blur(0px)", y: 0 }
        }
        viewport={{ once: true }}
        transition={{
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          ...(reduceBlur ? {} : { filter: { duration: 0.3 } }),
        }}
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-[18px] bg-card text-card-foreground shadow-[0_24px_48px_-26px_rgba(24,24,27,0.32),0_8px_18px_-12px_rgba(24,24,27,0.18)] ring-1 ring-foreground/5 ring-inset dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.85),0_8px_18px_-10px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
      >
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs text-muted-foreground">{eyebrow}</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">{title}</h3>
          <div className="mt-4">
            <p className="text-3xl font-semibold tracking-tight">
              {`Rp${priceIdr.toLocaleString("id-ID")}`}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              or{" "}
              <span className="font-medium text-foreground">
                {`$${(priceIdr / rate).toFixed(2)}`}
              </span>{" "}
              USD
            </p>
          </div>
          <div className="mt-5">
            <AnimatedList
              items={benefits}
              renderItem={(item) => {
                const label = typeof item === "string" ? item : item.title
                return (
                  <div className="flex w-full items-start gap-2 text-left text-sm leading-snug text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-px text-xs text-foreground/60"
                    >
                      {"\u2713"}
                    </span>
                    <span>{label}</span>
                  </div>
                )
              }}
              animation="fade"
              animateOnce
              stagger={0.04}
              showGradients={false}
              fadeSize={24}
              displayScrollbar={false}
              frame={false}
              scrollable={false}
              theme={isDark ? "dark" : "light"}
              radius={8}
              gap={2}
              width="100%"
              maxHeight="none"
              selectOnHover={false}
              enableArrowNavigation={false}
              itemClassName="pointer-events-none"
              style={listStyle}
            />
          </div>
          {children}
          <div className="mt-auto flex justify-center pt-6">
            <SpecularButton
              size="md"
              tint="#ffffff"
              tintOpacity={isDark ? 0.04 : 0.5}
              textColor={isDark ? "#f5f5f5" : "#18181b"}
              lineColor={isDark ? "#ffffff" : "#18181b"}
              baseColor={isDark ? "#525252" : "#a1a1aa"}
              glow={isDark ? 1 : 0.6}
            >
              Get Started
            </SpecularButton>
          </div>
        </div>
        {effect === "shine" && (
          <ShineBorder
            borderWidth={1.5}
            duration={10}
            shineColor={["#0060de", "#38bdf8", "#a78bfa", "#f0abfc"]}
          />
        )}
        {effect === "beam" && (
          <BorderBeam
            size={70}
            duration={7}
            colorFrom={isDark ? "#fafafa" : "#18181b"}
            colorTo={isDark ? "#525252" : "#a1a1aa"}
            borderWidth={1.5}
          />
        )}
      </motion.div>
    </Magnet>
  )
}
