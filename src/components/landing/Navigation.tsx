import React from 'react'
import { Button } from '../ui/button'
import { ThemeToggle } from '../theme-toggle'
import Link from 'next/link'
import { LineChart } from 'lucide-react'

function Navigation() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <LineChart className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-400 dark:to-pink-400 bg-clip-text text-transparent">
                spenz
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Services
              </Link>
              <Link href="#features" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Features
              </Link>
              <Link href="#payments" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Payments
              </Link>
              <Link href="#pricing" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
                Log In →
              </Button>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navigation
