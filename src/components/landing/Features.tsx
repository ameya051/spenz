import { BarChart3, Bell, Download, PieChart, Target, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Smart Analytics",
    description: "Get detailed insights into your spending patterns with interactive charts and graphs."
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Smart Alerts",
    description: "Receive notifications for unusual spending, upcoming bills, and budget limits."
  },
  // ...add remaining features
];

export default function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to take control of your finances in one place. Simple, intuitive, and powerful tools to help you manage your money better.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-400 dark:to-pink-400 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
