import Topography, { type TopographyProps } from "@/components/Topography"
import { useIsDark } from "@/lib/use-is-dark"

type TopographyBackgroundProps = Omit<TopographyProps, "color" | "lightMode">

export function TopographyBackground(props: TopographyBackgroundProps) {
  const isDark = useIsDark()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <Topography
        {...props}
        lightMode={!isDark}
        color={isDark ? "#d4d4d4" : "#262626"}
      />
    </div>
  )
}
