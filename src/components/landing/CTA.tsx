import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="container mx-auto px-4 py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of users who are already managing their finances smarter with spenz.
        </p>
        <Button className="bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-400 dark:to-pink-400 text-white px-8 py-6 text-lg hover:opacity-90 transition-opacity">
          Get Started Now
        </Button>
      </div>
    </section>
  )
}
