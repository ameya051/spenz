import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    quote: "ExisyFi has completely changed how I manage my money. The insights are invaluable!",
    author: "Sarah Johnson",
    role: "Small Business Owner"
  },
  // ...add remaining testimonials
];

export default function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their financial lives with ExisyFi.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="mb-4 text-yellow-500">{"★".repeat(5)}</div>
              <p className="text-lg mb-4">"{testimonial.quote}"</p>
              <div>
                <div className="font-bold">{testimonial.author}</div>
                <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
