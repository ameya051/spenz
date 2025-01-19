import Navigation from '@/components/landing/Navigation'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import HowItWorks from '@/components/landing/HowItWorks'
import Benefits from '@/components/landing/Benefits'
import Testimonials from '@/components/landing/Testimonials'
import TrustedBy from '@/components/landing/TrustedBy'
import CTA from '@/components/landing/CTA'
import { Home, User, Briefcase, FileText } from 'lucide-react'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText }
  ]
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* <NavBar items={navItems}/> */}
      <Navigation />
      <Hero />
      <Features />
      {/* <HowItWorks />
      <Benefits /> */}
      <Testimonials />
      {/* <TrustedBy /> */}
      <CTA />
      <Footer />
    </div>
  )
}
