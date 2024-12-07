import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  keywords: string
  canonicalUrl?: string
}

export function SEO({ title, description, keywords, canonicalUrl }: SEOProps) {
  const siteUrl = 'https://paisafinance.fun'
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl

  return (
    <Helmet>
      <title>{`${title} | PaisaFinance`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  )
}
