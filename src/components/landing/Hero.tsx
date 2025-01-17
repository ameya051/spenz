import React from 'react'
import { Button } from '../ui/button'
import { InteractiveHoverButton } from '../ui/interactive-hover-button'

function Hero() {
  return (
    <section className="mx-auto px-4 py-20 max-w-4xl h-screen">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl leading-tight">
            Simplify Expenses{' '}
            <br />
            With{' '}
            <span className="text-primary relative after:absolute after:-bottom-3  after:left-0 after:w-full after:h-6 after:bg-[url('/needle-underline.svg')] after:bg-no-repeat after:bg-contain after:animate-draw">
              Spenz.
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg">
            We are providing easiest way to manage expenses. Get a full view so you know where to save. Track spending, detect fraud, and keep tabs on rising subscription costs.
          </p>
          <div className='relative justify-center'>
            <InteractiveHoverButton text='Get Started' />
          </div>

          {/* <Button className="bg-primary text-white px-8 py-6 text-lg hover:opacity-90 transition-opacity">
            Get Started
          </Button> */}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
              <div className="w-20 h-20 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-400 dark:to-pink-400 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-2xl">✦</span>
                  </div>
                </div>
              </div>
              <div className="h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M0,50 Q25,30 50,50 T100,50"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0891b2" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Crystal Clear</h3>
              <p className="text-gray-600 dark:text-gray-400">Visualize your spending patterns</p>
            </div>
          </div>
          <div className="space-y-4 mt-12">
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">-1200$</h3>
              <div className="h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M0,50 Q25,70 50,50 T100,50"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0891b2" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
              <div className="w-20 h-20 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-400 dark:to-pink-400 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-2xl">✦</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero