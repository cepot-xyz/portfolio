import { navigate } from "@/lib/use-app-route"

export const PRICING_TARGET_KEY = "pricing-target"

export function openPricingSection(target: string) {
  sessionStorage.setItem(PRICING_TARGET_KEY, target)
  navigate("/pricing")
}
