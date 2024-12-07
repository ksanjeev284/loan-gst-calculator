import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'

export default function PrivacyPolicy() {
  return (
    <Layout showBackButton>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for PaisaFinance - Learn how we protect your data and privacy while using our financial calculators."
        keywords="privacy policy, data protection, user privacy, financial calculator privacy"
        canonicalUrl="/privacy-policy"
      />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We do not collect any personal information. All calculations are performed locally in your browser.
          </p>

          <h2>2. Use of Local Storage</h2>
          <p>
            We use local storage to save your theme preferences. This data never leaves your device.
          </p>

          <h2>3. Analytics</h2>
          <p>
            We may use analytics tools to understand how our calculators are used, but this data is anonymized and cannot be traced back to individual users.
          </p>

          <h2>4. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. You are advised to review this page periodically for any changes.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, you can contact us at:
            <br />
            Email: gamingwithhomie@gmail.com
          </p>
        </div>
      </div>
    </Layout>
  )
}
