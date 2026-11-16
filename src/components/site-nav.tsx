import {
  FolderKanban,
  Home,
  MessageSquareQuote,
  ReceiptText,
  Wrench,
} from "lucide-react"

import { Dock, DockIcon } from "@/components/ui/dock"
import { playHover } from "@/lib/audio"
import type { RoutePath } from "@/lib/use-hash-route"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/pricing", label: "Price List", icon: ReceiptText },
  { href: "/testimonials", label: "Testimonials", icon: MessageSquareQuote },
] as const satisfies readonly {
  href: RoutePath
  label: string
  icon: typeof Home
}[]

export function SiteNav({
  current,
  hidden,
}: {
  current: RoutePath
  hidden: boolean
}) {
  return (
    <header
      inert={hidden}
      className={cn(
        "fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-opacity duration-300",
        hidden && "pointer-events-none opacity-0"
      )}
    >
      <nav aria-label="Navigasi utama">
        <Dock className="mt-0 border-border">
          {links.map(({ href, label, icon: Icon }) => (
            <DockIcon key={href}>
              <a
                href={`#${href}`}
                aria-label={label}
                aria-current={current === href ? "page" : undefined}
                onMouseEnter={() => playHover()}
                className={cn(
                  "group relative flex size-full items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  current === href && "bg-accent text-foreground"
                )}
              >
                <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-popover px-2 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {label}
                </span>
              </a>
            </DockIcon>
          ))}
        </Dock>
      </nav>
    </header>
  )
}
