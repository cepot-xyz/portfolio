import { lazy, Suspense } from "react"

import FluxLines from "@/components/FluxLines"
import { BorderBeam } from "@/components/ui/border-beam"
import { TextAnimate } from "@/components/ui/text-animate"
import { KineticHeading } from "@/components/ui/kinetic-heading"
import { useDeviceProfile } from "@/lib/use-device-profile"
import { useIsDark } from "@/lib/use-is-dark"

const Lanyard = lazy(() => import("@/components/Lanyard"))
const profileUrl = `${import.meta.env.BASE_URL}Assets/about/profile.png`

const aboutParagraphs = [
  "I'm Affandi Rahman Hakim, also known as cepot, a Motion Creative Developer with a strong interest in motion design, visual storytelling, and the space where creativity meets technology. I enjoy turning ideas into clean, expressive visuals, especially through motion, short-form content, and design systems that feel intentional and human. I'm curious about how design, motion, and technology can work together to communicate better.",
  "Alongside my studies in Information Technology at UIN Walisongo Semarang, I have worked as a Graphic Designer at Backstage Prodigy and gained experience through a Graphic Design internship at Aneka Service Kudus, campus organizations, and independent projects. I enjoy using tools such as After Effects, Photoshop, Figma, and DaVinci Resolve, and I'm also interested in building with React, TypeScript, Python, Rust, C#, and Unity.",
  "One of my projects is Walisongo Domains Map, an interactive 3D visualization that maps 269 subdomains of walisongo.ac.id. It brings together academic systems, information portals, faculty sites, study programs, and student press domains in one explorable map, with color categories, search, and detail overlays. I built it with D3.js, vanilla JavaScript, HTML5, and CSS3.",
]

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
            <div className="flex flex-col items-start pt-32 text-left">
              <div className="flex w-full flex-col items-start gap-6 rounded-[24px] border border-border bg-card/80 p-8 text-card-foreground shadow-[0_24px_48px_-26px_rgba(24,24,27,0.32),0_8px_18px_-12px_rgba(24,24,27,0.18)] ring-1 ring-foreground/5 ring-inset backdrop-blur-md dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.85),0_8px_18px_-10px_rgba(0,0,0,0.6)]">
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
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-xl text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
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

          <div className="flex w-full flex-col items-center gap-4 rounded-[24px] border border-border bg-card/80 p-6 text-card-foreground shadow-[0_18px_36px_-24px_rgba(24,24,27,0.35)] ring-1 ring-foreground/5 ring-inset backdrop-blur-md dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.85)]">
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
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-xl text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
