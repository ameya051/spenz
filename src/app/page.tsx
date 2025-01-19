import Navigation from '@/components/landing/Navigation'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Testimonials from '@/components/landing/Testimonials'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Navigation />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
