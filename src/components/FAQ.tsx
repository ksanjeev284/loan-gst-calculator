import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string | React.ReactNode
}

interface FAQProps {
  title: string
  faqs: FAQItem[]
}

export function FAQ({ title, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4" id="faq-section">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="border dark:border-gray-700 rounded-lg overflow-hidden"
            open={openIndex === index}
          >
            <summary
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-4 flex items-center justify-between text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </summary>
            <div
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300"
            >
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
