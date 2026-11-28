import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
} from "react"
import { flushSync } from "react-dom"
import {
  useAnimate,
  type AnimationOptions,
  type ValueAnimationTransition,
} from "motion/react"

import { cn } from "@/lib/utils"

const HAS_SEGMENTER = typeof Intl !== "undefined" && "Segmenter" in Intl

const splitIntoCharacters = (text: string): string[] => {
  if (HAS_SEGMENTER) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
    return Array.from(segmenter.segment(text), ({ segment }) => segment)
  }
  return Array.from(text)
}

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (children == null) return ""
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  }

  if (React.isValidElement(children)) {
    const props = children.props as Record<string, unknown>
    const childText = props.children as React.ReactNode
    if (childText != null) {
      return extractTextFromChildren(childText)
    }
  }

  return ""
}

const ROTATION_MAP = {
  top: "rotateX(90deg)",
  right: "rotateY(90deg)",
  bottom: "rotateX(-90deg)",
  left: "rotateY(-90deg)",
} as const

const INBOUND_TRANSFORMS = {
  top: "rotateX(-90deg)",
  right: "rotateY(-90deg)",
  bottom: "rotateX(90deg)",
  left: "rotateY(90deg)",
} as const

const DEFAULT_TRANSITION: ValueAnimationTransition = {
  type: "spring",
  damping: 30,
  stiffness: 300,
}

interface Text3DFlipProps {
  children?: React.ReactNode
  texts?: string[]
  as?: ElementType
  className?: string
  textClassName?: string
  flipTextClassName?: string
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number | "random"
  transition?: ValueAnimationTransition | AnimationOptions
  rotateDirection?: "top" | "right" | "bottom" | "left"
}

const Text3DFlip = ({
  children,
  texts,
  as: ElementTag = "p",
  className,
  textClassName,
  flipTextClassName,
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = DEFAULT_TRANSITION,
  rotateDirection = "right",
  ...props
}: Text3DFlipProps) => {
  const isAnimatingRef = useRef(false)
  const isMountedRef = useRef(false)
  const [scope, animate] = useAnimate()

  const rotationTransform = ROTATION_MAP[rotateDirection]

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      isAnimatingRef.current = false
    }
  }, [])

  const fallbackText = useMemo(() => {
    try {
      return extractTextFromChildren(children)
    } catch {
      return ""
    }
  }, [children])

  const [textIndex, setTextIndex] = useState(0)
  const [isIncoming, setIsIncoming] = useState(false)

  const text = texts?.length
    ? (texts[textIndex % texts.length] ?? "")
    : fallbackText

  const characters = useMemo(() => {
    const words = text.split(" ")
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1,
    }))
  }, [text])

  const charOffsets = useMemo(() => {
    const offsets = [0]
    for (const word of characters) {
      offsets.push(offsets.at(-1)! + word.characters.length)
    }
    return offsets
  }, [characters])

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      if (staggerFrom === "first") return index * staggerDuration
      if (staggerFrom === "last")
        return (totalChars - 1 - index) * staggerDuration
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2)
        return Math.abs(center - index) * staggerDuration
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * totalChars)
        return Math.abs(randomIndex - index) * staggerDuration
      }
      return Math.abs(staggerFrom - index) * staggerDuration
    },
    [staggerFrom, staggerDuration]
  )

  const handleHoverStart = useCallback(async () => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    try {
      const totalChars = characters.reduce(
        (sum, word) => sum + word.characters.length,
        0
      )

      const delays = Array.from({ length: totalChars }, (_, i) =>
        getStaggerDelay(i, totalChars)
      )

      await animate(
        ".text-3d-flip-char",
        { transform: rotationTransform },
        {
          ...transition,
          delay: (i: number) => delays[i],
        }
      )

      if (!isMountedRef.current) return

      if (texts && texts.length > 1) {
        const nextText = texts[(textIndex + 1) % texts.length] ?? ""
        const nextTotalChars = nextText
          .split(" ")
          .reduce((sum, word) => sum + splitIntoCharacters(word).length, 0)
        const nextDelays = Array.from({ length: nextTotalChars }, (_, i) =>
          getStaggerDelay(i, nextTotalChars)
        )

        flushSync(() => {
          setTextIndex((index) => (index + 1) % texts.length)
          setIsIncoming(true)
        })

        await animate(
          ".text-3d-flip-char",
          { transform: "rotateX(0deg) rotateY(0deg)" },
          {
            ...transition,
            delay: (i: number) => nextDelays[i] ?? 0,
          }
        )
      } else {
        await animate(
          ".text-3d-flip-char",
          { transform: "rotateX(0deg) rotateY(0deg)" },
          { duration: 0 }
        )
      }
    } finally {
      if (isMountedRef.current) {
        isAnimatingRef.current = false
      }
    }
  }, [
    characters,
    transition,
    getStaggerDelay,
    rotationTransform,
    animate,
    texts,
    textIndex,
  ])

  return (
    <ElementTag
      className={cn("relative flex flex-wrap", className)}
      onMouseEnter={handleHoverStart}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{text}</span>

      {characters.map((wordObj, wordIndex) => (
        <span key={wordIndex} className="inline-flex">
          {wordObj.characters.map((char, charIndex) => (
            <CharBox
              key={charOffsets[wordIndex] + charIndex}
              char={char}
              textClassName={textClassName}
              flipTextClassName={flipTextClassName}
              rotateDirection={rotateDirection}
              initialTransform={
                isIncoming ? INBOUND_TRANSFORMS[rotateDirection] : undefined
              }
              hideBackFace={Boolean(texts && texts.length > 1)}
            />
          ))}
          {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
        </span>
      ))}
    </ElementTag>
  )
}

interface CharBoxProps {
  char: string
  textClassName?: string
  flipTextClassName?: string
  rotateDirection: "top" | "right" | "bottom" | "left"
  initialTransform?: string
  hideBackFace?: boolean
}

const SECOND_FACE_TRANSFORMS = {
  top: "rotateX(-90deg) translateZ(0.5lh)",
  right:
    "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
  bottom: "rotateX(90deg) translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)",
} as const

const FRONT_FACE_TRANSFORMS = {
  top: "translateZ(0.5lh)",
  bottom: "translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(-90deg) translateX(50%) rotateY(90deg)",
} as const

const CONTAINER_TRANSFORMS = {
  top: "translateZ(-0.5lh)",
  bottom: "translateZ(-0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
} as const

const CharBox = memo(
  ({
    char,
    textClassName,
    flipTextClassName,
    rotateDirection,
    initialTransform,
    hideBackFace,
  }: CharBoxProps) => (
    <span
      className="text-3d-flip-char inline transform-3d"
      style={{
        transform:
          initialTransform ?? CONTAINER_TRANSFORMS[rotateDirection],
      }}
    >
      <span
        className={cn("relative h-[1lh] backface-hidden", textClassName)}
        style={{ transform: FRONT_FACE_TRANSFORMS[rotateDirection] }}
      >
        {char}
      </span>
      {!hideBackFace && (
        <span
          className={cn(
            "absolute top-0 left-0 h-[1lh] backface-hidden",
            flipTextClassName
          )}
          style={{ transform: SECOND_FACE_TRANSFORMS[rotateDirection] }}
        >
          {char}
        </span>
      )}
    </span>
  )
)

CharBox.displayName = "CharBox"
Text3DFlip.displayName = "Text3DFlip"

export default Text3DFlip
