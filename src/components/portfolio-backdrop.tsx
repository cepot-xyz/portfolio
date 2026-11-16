import DriftWall, { type DriftWallItem } from "@/components/DriftWall"

const photos: DriftWallItem[] = [
  { image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=75", title: "Studio" },
  { image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=75", title: "Team" },
  { image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=75", title: "Collaboration" },
  { image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=75", title: "Workspace" },
  { image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=75", title: "Office" },
  { image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=75", title: "Design" },
  { image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=75", title: "Interface" },
  { image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=75", title: "Code" },
  { image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=75", title: "Development" },
  { image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=75", title: "Engineering" },
  { image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=900&q=75", title: "Process" },
  { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=75", title: "Build" },
  { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=75", title: "Creative" },
  { image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=75", title: "Detail" },
  { image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=75", title: "Studio life" },
]

export function PortfolioBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        inert
        className="pointer-events-none absolute inset-0 z-0"
      >
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
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-background/60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 h-52 bg-linear-to-b from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-t from-background to-transparent"
      />
    </>
  )
}
