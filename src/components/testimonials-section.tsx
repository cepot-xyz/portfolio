import GlassSurface from "@/components/GlassSurface"
import { TextAnimate } from "@/components/ui/text-animate"
import { KineticHeading } from "@/components/ui/kinetic-heading"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Luminette",
    role: "CEO Backstage Prodigy",
    body: "Design cepzky cakep semua, sesuai sama yg ku mau, trs cepzky tuh orgnya bisa mikir sendiri desain bagusnya gimana, ga harus full di dikte.",
  },
  {
    name: "Kumala Nur Afiah",
    role: "Koordinator Media FORMAKIP Walisongo",
    body: "ketcee color palettenya juga baguss cocok untuk karya yg pamflet dll yah ini, buat video yg baru kamu mulai ini cakep editane.",
  },
  {
    name: "Dimas Alfa Rizky",
    role: "Kahim HMJTI 2025",
    body: "walaikumsalam 100% kerennn, gwacorrr, sesuai ekspektasi client. Hasilnya pass banget sama brief yang dikasih.",
  },
  {
    name: "LourenT",
    role: "Owner Server Minecraft Foxy Network",
    body: "Umm... cakep ko... rapi + detail dan sesuai sm brand guidelines, aku td liat ig fn kaget... cakep bgt design nya.",
  },
  {
    name: "Billa UKM KORDAIS",
    role: "Ketua Panitia KONGRES KORDAIS 2024",
    body: "Demi apa pun hasil karya nya cepot tuh ngga pernah gagal, selalu cocok. ngga banyak revisi malah jarang banget revisi.",
  },
  {
    name: "Reza Rahmatullah",
    role: "UI/UX Designer",
    body: "Keren pot, semuanya udah bisa kamu kuasai stylenya.",
  },
  {
    name: "Raihan Zain",
    role: "Koordinator Divisi CyberCom HMJTI 2025",
    body: "Yang pamflett kerenn sihh, sekali desain langsung cocok sama hasilnya eksekusi dari brief ke desainnya pass.",
  },
  {
    name: "Teteh Dyaa",
    role: "Admin Komunitas Online Shohibul Jannah",
    body: "Yang pasti Maa syaa Allah editan editan kamu bagus poll, keren, rapihh jugaa, thank you for the help. You are great!",
  },
]

const firstRow = testimonials.slice(0, 4)
const secondRow = testimonials.slice(4)

type Testimonial = (typeof testimonials)[number]

function TestimonialCard({ name, role, body }: Testimonial) {
  return (
    <GlassSurface
      width="22rem"
      height="auto"
      borderRadius={12}
      backgroundOpacity={0.25}
      className="shrink-0"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-primary/10 via-card/60 to-card/75"
      />
      <figure className="relative flex h-full w-full flex-col justify-between gap-5 p-3 text-left">
        <blockquote className="text-pretty text-sm leading-relaxed text-card-foreground/90">
          {body}
        </blockquote>
        <figcaption>
          <p className="text-sm font-medium text-card-foreground">{name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{role}</p>
        </figcaption>
      </figure>
    </GlassSurface>
  )
}

export function TestimonialsSection({ className }: { className?: string }) {
  return (
    <section
      aria-label="Testimoni klien"
      className={cn("relative overflow-hidden py-0", className)}
    >
      <div className="mb-10 flex flex-col items-center gap-4 px-6 text-center">
        <KineticHeading as="h2" className="text-4xl sm:text-5xl">
          Testimonials
        </KineticHeading>
        <TextAnimate
          as="p"
          animation="blurInUp"
          by="character"
          delay={0.1}
          once
          className="max-w-md text-muted-foreground"
        >
          Kind words from people I've worked with
        </TextAnimate>
      </div>
      <div className="flex flex-col gap-4">
        <Marquee className="[--duration:35s]">
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse className="[--duration:40s]">
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background to-transparent" />
    </section>
  )
}
