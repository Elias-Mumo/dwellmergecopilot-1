import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "DwellMerge - Find Your Perfect Rental",
    template: "%s | DwellMerge"
  },
  description: "DwellMerge is a modern rental listing platform connecting tenants with verified landlords. Find apartments, houses, and commercial properties with ease.",
  keywords: ["rental", "apartment", "house", "property", "landlord", "tenant", "real estate"],
  authors: [{ name: "DwellMerge Team" }],
  creator: "DwellMerge",
  publisher: "DwellMerge",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "DwellMerge - Find Your Perfect Rental",
    description: "Modern rental listing platform connecting tenants with verified landlords",
    siteName: "DwellMerge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DwellMerge - Find Your Perfect Rental",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DwellMerge - Find Your Perfect Rental",
    description: "Modern rental listing platform connecting tenants with verified landlords",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
