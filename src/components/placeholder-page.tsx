import { KineticText } from "@/components/ui/kinetic-text"

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="flex flex-col items-center px-6 pt-40 pb-[15px] text-center">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <KineticText
          text={title}
          className="justify-center text-5xl tracking-tight"
        />
        <p className="text-muted-foreground">Halaman {title}</p>
      </div>
    </section>
  )
}
