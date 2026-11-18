import {
  BriefcaseBusiness,
  ClipboardCheck,
  Home,
  ReceiptText,
  UserRound,
} from "lucide-react"

import StaggeredMenu from "@/components/StaggeredMenu"
import { Dock, DockIcon } from "@/components/ui/dock"
import { playHover } from "@/lib/audio"
import { useDeviceProfile } from "@/lib/use-device-profile"
import type { RoutePath } from "@/lib/use-hash-route"
import { useIsDark } from "@/lib/use-is-dark"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: ClipboardCheck },
  { href: "/portfolio", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/pricing", label: "Price List", icon: ReceiptText },
  { href: "/about", label: "About", icon: UserRound },
] as const satisfies readonly {
  href: RoutePath
  label: string
  icon: typeof Home
}[]

const menuItems = links.map(({ href, label }) => ({
  label,
  ariaLabel: label,
  link: `#${href}`,
}))

export function SiteNav({
  current,
  hidden,
}: {
  current: RoutePath
  hidden: boolean
}) {
  const { tier } = useDeviceProfile()
  const isDark = useIsDark()

  if (tier === "desktop") {
    return (
      <StaggeredMenu
        position="left"
        isFixed
        hidden={hidden}
        items={menuItems}
        colors={
          isDark
            ? ["#0a0a0a", "#171717", "#262626"]
            : ["#f9f9f9", "#eaeaea", "#d2d2d2"]
        }
        panelColor={isDark ? "#0a0a0a" : "#f9f9f9"}
        textColor={isDark ? "#fafafa" : "#0a0a0a"}
        mutedColor={isDark ? "#a3a3a3" : "#707070"}
        menuButtonColor={isDark ? "#fafafa" : "#0a0a0a"}
        openMenuButtonColor={isDark ? "#fafafa" : "#0a0a0a"}
        accentColor={isDark ? "#fafafa" : "#0a0a0a"}
        displaySocials={false}
        displayItemNumbering={false}
      />
    )
  }

  return (
    <header
      inert={hidden}
      className={cn(
        "fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-opacity duration-300",
        hidden && "pointer-events-none opacity-0"
      )}
    >
      <nav aria-label="Navigasi utama">
        <Dock className="mt-0">
          {links.map(({ href, label, icon: Icon }) => (
            <DockIcon key={href} active={current === href}>
              <a
                href={`#${href}`}
                aria-label={label}
                aria-current={current === href ? "page" : undefined}
                onMouseEnter={() => playHover()}
                onClick={(event) => {
                  if (current !== href) return
                  event.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
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
