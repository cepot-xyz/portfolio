export const PRICING_TARGET_KEY = "pricing-target"

export function openPricingSection(target: string) {
  sessionStorage.setItem(PRICING_TARGET_KEY, target)
  window.location.hash = "#/pricing"
}
