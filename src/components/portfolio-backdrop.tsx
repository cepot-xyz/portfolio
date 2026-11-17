import DriftWall, { type DriftWallItem } from "@/components/DriftWall"
import { ViewportMount } from "@/components/viewport-mount"

const photos: DriftWallItem[] = Array.from({ length: 15 }, (_, index) => ({
  image: `${import.meta.env.BASE_URL}Assets/driftwall/driftwall${index + 1}.png`,
}))

export function PortfolioBackdrop() {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <ViewportMount className="h-full w-full">
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
            focusable={false}
          />
        </ViewportMount>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-background/60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-52 bg-linear-to-b from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-t from-background to-transparent"
      />
    </>
  )
}
