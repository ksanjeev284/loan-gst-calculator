interface Step {
  title: string
  description: string
}

interface HowToUseProps {
  title: string
  steps: Step[]
}

export function HowToUse({ title, steps }: HowToUseProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{title}</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">
              {index + 1}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
