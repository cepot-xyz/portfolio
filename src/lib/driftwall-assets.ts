import type { DriftWallItem } from "@/components/DriftWall"

export const driftWallPhotos: DriftWallItem[] = Array.from({ length: 15 }, (_, index) => ({
  image: `${import.meta.env.BASE_URL}Assets/driftwall/driftwall${index + 1}.png`,
}))
