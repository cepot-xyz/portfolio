import { motion } from "motion/react"

import Magnet from "@/components/Magnet"
import SpecularButton from "@/components/SpecularButton"
import { ShineBorder } from "@/components/ui/shine-border"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { useIsDark } from "@/lib/use-is-dark"
import { cn } from "@/lib/utils"

type ServiceCardProps = {
  title: string
  description: string
  image: string
  alt: string
  pricingTarget: string
  onOrder: (target: string) => void
}

export function ServiceCard({
  title,
  description,
  image,
  alt,
  pricingTarget,
  onOrder,
}: ServiceCardProps) {
  const isDark = useIsDark()
  const { tier } = useDeviceProfile()
  const reduceBlur = tier !== "desktop"

  return (
    <Magnet
      style={{ display: "block" }}
      wrapperClassName="h-full w-full"
      innerClassName="h-full w-full"
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
        className="group relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-[18px] bg-card text-card-foreground shadow-[0_24px_48px_-26px_rgba(24,24,27,0.32),0_8px_18px_-12px_rgba(24,24,27,0.18)] ring-1 ring-foreground/5 ring-inset dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.85),0_8px_18px_-10px_rgba(0,0,0,0.6)]"
      >
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full select-none object-cover",
            !reduceBlur &&
              "grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 group-focus-within:grayscale-0"
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10"
        />
        <div className="relative z-10 mt-auto flex flex-col p-6">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-snug text-white/65">
            {description}
          </p>
          <div className="mt-6 flex justify-center">
            <SpecularButton
              size="md"
              tint="#ffffff"
              tintOpacity={isDark ? 0.04 : 0.5}
              textColor={isDark ? "#f5f5f5" : "#18181b"}
              lineColor={isDark ? "#ffffff" : "#18181b"}
              baseColor={isDark ? "#525252" : "#a1a1aa"}
              glow={isDark ? 1 : 0.6}
              onClick={() => {
                onOrder(pricingTarget)
              }}
            >
              Order Now
            </SpecularButton>
          </div>
        </div>
        <ShineBorder
          borderWidth={1.5}
          duration={10}
          shineColor={
            isDark
              ? ["#fafafa", "#a1a1aa", "#525252"]
              : ["#18181b", "#52525b", "#a1a1aa"]
          }
        />
      </motion.div>
    </Magnet>
  )
}
