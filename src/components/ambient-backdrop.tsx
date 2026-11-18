import DriftWall from "@/components/DriftWall"
import { driftWallPhotos } from "@/lib/driftwall-assets"

const ambientPhotos = driftWallPhotos.slice(0, 8)

export function AmbientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <DriftWall
        items={ambientPhotos}
        columns={3}
        tileWidth={160}
        tileHeight={110}
        gap={12}
        radius={12}
        tilt={8}
        turn={-8}
        depth={80}
        speed={18}
        direction="up"
        variance={0.25}
        parallax={0}
        fade={0.75}
        dim={0.6}
        grayscale
        overlayColor="#0a0a0a"
        focusable={false}
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-background/55" />
    </div>
  )
}
