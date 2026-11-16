import { KineticText } from "@/components/ui/kinetic-text"

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="flex min-h-svh flex-col items-center justify-start px-6 pt-40 pb-28 text-center">
      <div className="flex min-h-[38.75rem] w-full flex-col items-center justify-start gap-4 sm:min-h-[39.5rem]">
        <KineticText
          text={title}
          className="justify-center text-5xl tracking-tight"
        />
        <p className="text-muted-foreground">Halaman {title}</p>
      </div>
    </section>
  )
}
