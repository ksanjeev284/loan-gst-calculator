import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'
import { TaxCalculator } from '@/components/TaxCalculator'
import { FAQ } from '@/components/FAQ'
import { HowToUse } from '@/components/HowToUse'
import { taxHelp } from '@/data/help-content'

export default function TaxPage() {
  return (
    <Layout>
      <SEO
        title="Income Tax Calculator India"
        description="Calculate your income tax under both old and new tax regimes with our comprehensive income tax calculator. Compare tax savings and plan your finances effectively."
        keywords="income tax calculator, india tax calculator, new tax regime calculator, old tax regime calculator, tax savings calculator, income tax comparison"
        canonicalUrl="/tax"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Income Tax Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Calculate and compare your income tax under both old and new tax regimes. Get detailed breakdowns of your tax liability and find the best tax saving options.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <TaxCalculator />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <HowToUse
            title="How to Use the Income Tax Calculator"
            steps={taxHelp.howToUse}
          />
          
          <FAQ
            title="Frequently Asked Questions"
            faqs={taxHelp.faqs}
          />
        </div>
      </div>
    </Layout>
  )
}
