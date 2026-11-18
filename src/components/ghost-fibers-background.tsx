import GhostFibers, { type GhostFibersProps } from "@/components/GhostFibers"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { useIsDark } from "@/lib/use-is-dark"

type GhostFibersBackgroundProps = Omit<
  GhostFibersProps,
  "glowColor" | "lineColor" | "secondaryColor" | "lightMode"
>

export function GhostFibersBackground(props: GhostFibersBackgroundProps) {
  const isDark = useIsDark()
  const { fullEffects } = useDeviceProfile()

  if (!fullEffects) return null

  return (
    <GhostFibers
      {...props}
      lightMode={!isDark}
      glowColor={isDark ? "#d4d4d4" : "#404040"}
      lineColor={isDark ? "#fafafa" : "#171717"}
      secondaryColor={isDark ? "#737373" : "#8a8a8a"}
    />
  )
}
