import CursorGrid, { type CursorGridProps } from "@/components/CursorGrid"
import { useIsDark } from "@/lib/use-is-dark"

type CursorGridBackgroundProps = Omit<
  CursorGridProps,
  "color" | "gridColor" | "lightMode" | "children"
>

export function CursorGridBackground(props: CursorGridBackgroundProps) {
  const isDark = useIsDark()

  return (
    <CursorGrid
      {...props}
      lightMode={!isDark}
      color={isDark ? "#d4d4d4" : "#262626"}
      gridColor={isDark ? "#d4d4d4" : "#262626"}
    />
  )
}
