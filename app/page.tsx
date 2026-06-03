import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutSection } from "@/components/about-section"
import { CustomizationSection } from "@/components/customization-section"
import { ContactForm } from "@/components/contact-form"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CustomizationSection />
      <Suspense fallback={<div className="py-24 text-center">Cargando destacados...</div>}>
        <FeaturedProducts />
      </Suspense>
      <ContactForm id="contacto" />
    </>
  )
}
