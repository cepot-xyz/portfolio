import portfolio2024 from "@/assets/portfolio/portfolio-2024.png"
import portfolio2025 from "@/assets/portfolio/portfolio-2025.png"
import portfolio2026 from "@/assets/portfolio/portfolio-2026.png"

export type PortfolioItem = {
  year: string
  href: string
  image: string
  imageWidth: number
  imageHeight: number
}

export const portfolios: PortfolioItem[] = [
  {
    year: "2024",
    href: "https://drive.google.com/file/d/1-qgWZR1Lb8s2dkiBP-gumaVkBGss792o/view",
    image: portfolio2024,
    imageWidth: 1702,
    imageHeight: 924,
  },
  {
    year: "2025",
    href: "https://drive.google.com/file/d/1WEkN4PDT-22ePWQkJtghPrYd0w3fusTr/view",
    image: portfolio2025,
    imageWidth: 1685,
    imageHeight: 933,
  },
  {
    year: "2026",
    href: "https://www.instagram.com/p/DS-Ecb_Em9n/",
    image: portfolio2026,
    imageWidth: 1086,
    imageHeight: 1448,
  },
]
