import { TextAnimate } from "@/components/ui/text-animate"
import { KineticHeading } from "@/components/ui/kinetic-heading"

export function PlaceholderPage({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <section className="flex flex-col items-center px-6 pt-40 pb-[15px] text-center">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <KineticHeading className="text-5xl">{title}</KineticHeading>
        <TextAnimate
          as="p"
          animation="blurInUp"
          by="character"
          delay={0.1}
          once
          className="text-muted-foreground"
        >
          {subtitle ?? `Halaman ${title}`}
        </TextAnimate>
      </div>
    </section>
  )
}
