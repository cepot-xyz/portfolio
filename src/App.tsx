import { SiteNav } from "@/components/site-nav"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

function App() {
  return (
    <main className="min-h-svh bg-background pb-28 text-foreground">
      <AnimatedThemeToggler
        aria-label="Ganti tema"
        className="fixed right-4 top-4 z-50 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4"
      />
      <SiteNav />

      <section
        id="home"
        className="flex min-h-svh scroll-mt-24 flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <h1 className="text-5xl font-semibold tracking-tight">cepot</h1>
        <p className="max-w-md text-muted-foreground">
          Motion developer yang suka bikin web terasa hidup.
        </p>
      </section>

      <section
        id="services"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
        <p className="mt-3 text-muted-foreground">
          Layanan yang bisa Kakak ambil nanti dijelasin di sini.
        </p>
      </section>

      <section
        id="portfolio"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Portfolio</h2>
        <p className="mt-3 text-muted-foreground">
          Kumpulan proyek pilihan nanti tampil di sini.
        </p>
      </section>

      <section
        id="pricing"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Price List</h2>
        <p className="mt-3 text-muted-foreground">
          Paket dan harga nanti ditulis di sini.
        </p>
      </section>

      <section
        id="testimonials"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Testimonials</h2>
        <p className="mt-3 text-muted-foreground">
          Kata mereka yang sudah kerja bareng nanti muncul di sini.
        </p>
      </section>
    </main>
  )
}

export default App
