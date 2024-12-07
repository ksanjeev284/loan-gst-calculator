import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'
import { GSTCalculator } from '@/components/GSTCalculator'
import { FAQ } from '@/components/FAQ'
import { HowToUse } from '@/components/HowToUse'
import { gstHelp } from '@/data/help-content'

export default function GSTPage() {
  return (
    <Layout>
      <SEO
        title="GST Calculator"
        description="Calculate GST (Goods and Services Tax) easily with our free GST calculator. Get instant calculations for GST inclusive and exclusive amounts for all GST rates in India."
        keywords="gst calculator, gst calculation, gst inclusive calculator, gst exclusive calculator, indian gst calculator, gst tax calculator, gst percentage calculator"
        canonicalUrl="/gst"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            GST Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Calculate GST amounts quickly and accurately. Support for both inclusive and exclusive GST calculations with all standard GST rates in India.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <GSTCalculator />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <HowToUse
            title="How to Use the GST Calculator"
            steps={gstHelp.howToUse}
          />
          
          <FAQ
            title="Frequently Asked Questions"
            faqs={gstHelp.faqs}
          />
        </div>
      </div>
    </Layout>
  )
}
