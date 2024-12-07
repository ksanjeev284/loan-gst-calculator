import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'
import { LoanComparisonCalculator } from '@/components/LoanComparisonCalculator'
import { FAQ } from '@/components/FAQ'
import { HowToUse } from '@/components/HowToUse'
import { loanComparisonHelp } from '@/data/help-content'

export default function LoanComparisonPage() {
  return (
    <Layout>
      <SEO
        title="Loan Comparison Calculator"
        description="Compare different loan options side by side with our loan comparison calculator. Analyze EMIs, interest costs, and total payments to make informed borrowing decisions."
        keywords="loan comparison calculator, compare loans, loan options comparison, emi comparison calculator, loan interest comparison, best loan calculator"
        canonicalUrl="/loan-comparison"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Loan Comparison Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Compare different loan options side by side to find the best deal. Analyze EMIs, total interest costs, and total payments to make an informed decision.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <LoanComparisonCalculator />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <HowToUse
            title="How to Use the Loan Comparison Calculator"
            steps={loanComparisonHelp.howToUse}
          />
          
          <FAQ
            title="Frequently Asked Questions"
            faqs={loanComparisonHelp.faqs}
          />
        </div>
      </div>
    </Layout>
  )
}
