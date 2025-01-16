import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Bell, Download, LineChart, PieChart, Target, TrendingUp, Wallet } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import Navigation from '@/components/landing/Navigation'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import HowItWorks from '@/components/landing/HowItWorks'
import Benefits from '@/components/landing/Benefits'
import Testimonials from '@/components/landing/Testimonials'
import TrustedBy from '@/components/landing/TrustedBy'
import CTA from '@/components/landing/CTA'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <TrustedBy />
      <CTA />
    </div>
  )
}
