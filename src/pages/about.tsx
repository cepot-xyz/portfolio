import { lazy, Suspense } from "react"

import FluxLines from "@/components/FluxLines"
import { BorderBeam } from "@/components/ui/border-beam"
import { TextAnimate } from "@/components/ui/text-animate"
import { KineticHeading } from "@/components/ui/kinetic-heading"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { useIsDark } from "@/lib/use-is-dark"

const Lanyard = lazy(() => import("@/components/Lanyard"))
const profileUrl = `${import.meta.env.BASE_URL}Assets/about/profile.png`

const aboutLorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."

export function AboutPage() {
  const { tier } = useDeviceProfile()
  const isDark = useIsDark()
  const isDesktop = tier === "desktop"

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-start overflow-hidden px-6 pb-28 text-center">
      {isDesktop && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <FluxLines
            colors={
              isDark
                ? ["#fafafa", "#a3a3a3", "#525252"]
                : ["#0a0a0a", "#525252", "#a3a3a3"]
            }
            speed={0.2}
            lightMode={!isDark}
            transparent={false}
            backgroundColor={isDark ? "#0a0a0a" : "#f9f9f9"}
            mouseInteraction={false}
            clickSwirl={false}
            className="h-full w-full"
          />
        </div>
      )}

      {isDesktop ? (
        <div className="relative z-10 min-h-[64rem] w-full max-w-7xl">
          <div className="pointer-events-auto absolute left-1/2 top-0 h-[64rem] w-screen -translate-x-1/2">
            <Suspense fallback={<div className="h-full w-full" />}>
              <Lanyard
                frontImage={profileUrl}
                backImage={profileUrl}
                imageFit="cover"
                orientation="portrait"
                finish="matte"
                cornerRadius={0.2}
                size={0.38}
                anchor="left"
                strapLength={0.55}
                strapColor={isDark ? "#171717" : "#d2d2d2"}
                metal={isDark ? "graphite" : "silver"}
                gravity={1.05}
                damping={0.85}
                elasticity={0.2}
                breeze={0.05}
                interactive
                intro
                className="h-full w-full"
              />
            </Suspense>
          </div>

          <div className="pointer-events-none relative z-20 grid grid-cols-[1.1fr_0.9fr] items-start gap-12">
            <div aria-hidden="true" className="h-[64rem]" />
            <div className="flex flex-col items-start gap-6 pt-32 text-left">
              <KineticHeading className="text-5xl sm:text-6xl">
                About
              </KineticHeading>
              <TextAnimate
                as="p"
                animation="blurInUp"
                by="character"
                delay={0.1}
                once
                className="max-w-md text-muted-foreground"
              >
                Hi, I'm cepot, a creative motion developer.
              </TextAnimate>
              <p className="max-w-xl text-muted-foreground">{aboutLorem}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="pointer-events-none relative z-10 mt-24 flex w-full max-w-3xl flex-col items-center gap-10">
          <div className="relative w-full max-w-[18rem] overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <img
              src={profileUrl}
              alt="cepot"
              draggable={false}
              className="aspect-[3/4] w-full object-cover"
            />
            <BorderBeam
              colorFrom="var(--foreground)"
              colorTo="var(--muted-foreground)"
              size={140}
              duration={7}
              borderWidth={1.5}
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <KineticHeading className="text-5xl sm:text-6xl">
              About
            </KineticHeading>
            <TextAnimate
              as="p"
              animation="blurInUp"
              by="character"
              delay={0.1}
              once
              className="max-w-md text-muted-foreground"
            >
              Hi, I'm cepot, a creative motion developer.
            </TextAnimate>
            <p className="max-w-xl text-muted-foreground">
              Crafting visual identities with precision and soul. Motion,
              design, and creative direction for modern brands.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
