import TextLoop from "@/components/TextLoop"

export function TextLoopSection() {
  return (
    <section className="py-0">
      <TextLoop
        text="Sadar Dipalak, Sadar Dibakar, Sadar Dimiskinkan"
        shape="wave"
        speed={25}
        direction="forward"
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
      />
    </section>
  )
}
