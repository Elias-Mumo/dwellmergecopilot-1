import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/hero"
import { FeaturedProperties } from "@/components/sections/featured-properties"
import { Footer } from "@/components/layout/footer"
import { ScamWarning } from "@/components/modals/scam-warning"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProperties />
      <Footer />
      <ScamWarning />
    </main>
  )
}
