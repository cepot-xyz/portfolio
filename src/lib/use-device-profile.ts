import { useEffect, useState } from "react"

export type DeviceTier = "desktop" | "tablet" | "mobile"

export type DeviceProfile = {
  tier: DeviceTier
  lowPower: boolean
  fullEffects: boolean
}

const MOBILE_QUERY = "(max-width: 767px)"
const TABLET_QUERY = "(max-width: 1023px)"
const COARSE_QUERY = "(pointer: coarse)"
const queries = [MOBILE_QUERY, TABLET_QUERY, COARSE_QUERY]

function readProfile(): DeviceProfile {
  if (typeof window === "undefined") {
    return { tier: "desktop", lowPower: false, fullEffects: true }
  }

  const override = new URLSearchParams(window.location.search).get("tier")
  let tier: DeviceTier

  if (override === "desktop" || override === "tablet" || override === "mobile") {
    tier = override
  } else {
    const mobile = window.matchMedia(MOBILE_QUERY).matches
    const coarse = window.matchMedia(COARSE_QUERY).matches
    const narrow = window.matchMedia(TABLET_QUERY).matches

    if (mobile) tier = "mobile"
    else if (coarse) tier = narrow ? "tablet" : "mobile"
    else if (narrow) tier = "tablet"
    else tier = "desktop"
  }

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency
  const lowPower =
    tier === "desktop" &&
    ((memory !== undefined && memory <= 4) || (cores !== undefined && cores <= 2))

  return { tier, lowPower, fullEffects: tier === "desktop" && !lowPower }
}

export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState(readProfile)

  useEffect(() => {
    const update = () => {
      const next = readProfile()
      setProfile((previous) =>
        previous.tier === next.tier && previous.lowPower === next.lowPower
          ? previous
          : next
      )
    }

    const mediaQueries = queries.map((query) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener("change", update)
      return mediaQuery
    })

    window.addEventListener("resize", update)

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        mediaQuery.removeEventListener("change", update)
      })
      window.removeEventListener("resize", update)
    }
  }, [])

  return profile
}
