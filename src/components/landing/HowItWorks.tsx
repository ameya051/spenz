const steps = [
  {
    step: "01",
    title: "Connect Your Accounts",
    description: "Securely link your bank accounts and credit cards to get started."
  },
  {
    step: "02",
    title: "Categorize Expenses",
    description: "Our AI automatically categorizes your transactions for easy tracking."
  },
  {
    step: "03",
    title: "Track & Optimize",
    description: "Monitor your spending and optimize your finances with our insights."
  }
];

export default function HowItWorks() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20 border-gray-200 dark:border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-4xl mb-4">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get started with spenz in three simple steps and take control of your finances today.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
            {index < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-gray-600 dark:text-gray-400">{'>'}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
