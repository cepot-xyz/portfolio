import type { RefObject } from "react"

import { playClick } from "@/lib/audio"

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/cepot.xyz/",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/affandi-rahman-hakim-ab80b1372/",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:cepotmain@gmail.com",
    external: false,
  },
]

export function SiteFooter({
  footerRef,
}: {
  footerRef: RefObject<HTMLElement | null>
}) {
  return (
    <footer
      ref={footerRef}
      className="relative z-40 bg-linear-to-b from-footer/0 to-footer text-card-foreground"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="text-lg font-semibold tracking-tight">cepotxyz</p>
          <p className="text-sm text-muted-foreground">
            Crafting visual identities with precision and soul. Motion,
            design, and creative direction for modern brands.
          </p>
        </div>

        <nav aria-label="Sosial media" className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Contact</p>
          <div className="flex flex-wrap gap-4">
            {socials.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => playClick()}
                className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  )
}
