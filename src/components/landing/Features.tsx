import { cn } from '@/lib/utils';
import { BarChart3, Bell, PieChart, Target } from 'lucide-react'

export default function Features() {

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 stroke-1" />,
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with interactive charts and graphs."
    },
    {
      icon: <Bell className="w-8 h-8 stroke-1" />,
      title: "Smart Alerts",
      description: "Receive notifications for unusual spending, upcoming bills, and budget limits."
    },
    {
      icon: <Target className="w-8 h-8 stroke-1" />,
      title: "Goal Tracking",
      description: "Set and track your financial goals with visual progress indicators."
    },
    {
      icon: <PieChart className="w-8 h-8 stroke-1" />,
      title: "Budget Categories",
      description: "Organize expenses with custom categories and tags for better tracking."
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left">
                Powerful Features
              </h2>
              <p className="text-lg max-w-xl leading-relaxed tracking-tight text-muted-foreground  text-left">
                Everything you need to take control of your finances in one place.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "cursor-pointer bg-muted rounded-md aspect-square p-6 flex justify-between flex-col",
                    "transition-all duration-150 ease-in-out hover:scale-[1.01] hover:shadow-sm",
                    (index === 1 || index === 2) && "lg:aspect-auto h-full lg:col-span-2"
                  )}
                >
                  {feature.icon}
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">{feature.title}</h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
