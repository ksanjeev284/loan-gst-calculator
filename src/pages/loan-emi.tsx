import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'
import { LoanEMICalculator } from '@/components/LoanEMICalculator'
import { FAQ } from '@/components/FAQ'
import { HowToUse } from '@/components/HowToUse'
import { loanEMIHelp } from '@/data/help-content'

export default function LoanEMIPage() {
  return (
    <Layout>
      <SEO
        title="Loan EMI Calculator"
        description="Calculate your monthly EMI (Equated Monthly Installment) with our free loan EMI calculator. Plan your loan repayment with accurate EMI calculations for home loans, car loans, and personal loans."
        keywords="loan emi calculator, emi calculator, loan calculator, home loan emi, car loan emi, personal loan emi, monthly emi calculator, loan repayment calculator"
        canonicalUrl="/loan-emi"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Loan EMI Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Calculate your monthly loan EMI and plan your finances better. Get instant results for your home loan, car loan, or personal loan EMI calculations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <LoanEMICalculator />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <HowToUse
            title="How to Use the Loan EMI Calculator"
            steps={loanEMIHelp.howToUse}
          />
          
          <FAQ
            title="Frequently Asked Questions"
            faqs={loanEMIHelp.faqs}
          />
        </div>
      </div>
    </Layout>
  )
}
