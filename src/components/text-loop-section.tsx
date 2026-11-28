import { CursorGridBackground } from "@/components/cursor-grid-background"
import TextLoop from "@/components/TextLoop"

export function TextLoopSection({
  showGridBackground = false,
}: {
  showGridBackground?: boolean
}) {
  return (
    <section className="relative overflow-hidden py-0">
      {showGridBackground && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <CursorGridBackground />
        </div>
      )}
      <TextLoop
        text="Sadar Dipalak, Sadar Dibakar, Sadar Dimiskinkan"
        shape="wave"
        speed={25}
        direction="reverse"
        separator=" - "
        curviness={45}
        tilt={0}
        fontSize={25}
        fontWeight={800}
        letterSpacing={2}
        uppercase
        ribbon
        ribbonColor="var(--ribbon-bg)"
        color="var(--ribbon-ink)"
        ribbonWidth={100}
        edgeFade={0}
        cross={false}
        crossAngle={16}
        draggable={true}
        scrollBoost={0}
        outline={false}
        pauseOnHover={false}
        outlineWidth={1.5}
        className={showGridBackground ? "z-10" : undefined}
      />
    </section>
  )
}
