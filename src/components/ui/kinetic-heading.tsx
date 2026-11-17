import type { CSSProperties } from "react"

import { TextAnimate } from "@/components/ui/text-animate"
import { cn } from "@/lib/utils"

const segmentClassName =
  "[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]"

const style = {
  "--hover-padding": "calc(1em / 12)",
  "--text-stroke-width": "calc(1em * 125 / 6000)",
} as CSSProperties

export function KineticHeading({
  children,
  as = "h1",
  className,
}: {
  children: string
  as?: "h1" | "h2" | "h3"
  className?: string
}) {
  return (
    <TextAnimate
      as={as}
      animation="blurInUp"
      by="character"
      once
      className={cn("font-semibold tracking-tight", className)}
      segmentClassName={segmentClassName}
      style={style}
    >
      {children}
    </TextAnimate>
  )
}
