export function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">Halaman {title}</p>
    </section>
  )
}
