import { Wallet } from 'lucide-react'

const benefits = [
  {
    title: "Save Time & Money",
    description: "Automated tracking and categorization saves hours of manual work each month."
  },
  // ...add remaining benefits
];

export default function Benefits() {
  return (
    <section className="container mx-auto px-4 py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Why Choose ExisyFi?</h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-400 dark:to-pink-400 flex items-center justify-center flex-shrink-0">
                  <Wallet className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* ...existing grid content... */}
        </div>
      </div>
    </section>
  )
}
