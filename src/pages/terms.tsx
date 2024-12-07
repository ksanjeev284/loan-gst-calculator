import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'

export default function Terms() {
  return (
    <Layout showBackButton>
      <SEO
        title="Terms of Service"
        description="Terms of Service for PaisaFinance - Understand the terms and conditions for using our financial calculators."
        keywords="terms of service, terms and conditions, user agreement, calculator terms"
        canonicalUrl="/terms"
      />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using PaisaFinance, you accept and agree to be bound by these Terms of Service.
          </p>

          <h2>2. Use of Calculators</h2>
          <p>
            Our calculators are for informational purposes only. The results should not be considered as financial advice.
            Always consult with qualified professionals for specific financial decisions.
          </p>

          <h2>3. Accuracy of Information</h2>
          <p>
            While we strive to keep our calculators accurate and up-to-date, we make no guarantees about the accuracy
            of the results. Users should verify all calculations independently.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on PaisaFinance, including calculators, design, and code, is protected by intellectual property rights.
          </p>

          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the service implies acceptance of the updated terms.
          </p>

          <h2>6. Contact Information</h2>
          <p>
            For any questions regarding these terms, please contact us at:
            <br />
            Email: gamingwithhomie@gmail.com
          </p>
        </div>
      </div>
    </Layout>
  )
}
