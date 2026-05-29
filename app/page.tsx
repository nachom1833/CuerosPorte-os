import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutSection } from "@/components/about-section"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Suspense fallback={<div className="py-24 text-center">Cargando destacados...</div>}>
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
