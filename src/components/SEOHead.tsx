import { Helmet } from 'react-helmet-async';
import {
  siteConfig,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  serviceSchemas,
  homeBreadcrumbs,
  navigationSchema,
  generateFAQSchema,
  homeFAQs,
} from '@/lib/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  noIndex?: boolean;
  includeSchemas?: boolean;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  faqs?: { question: string; answer: string }[];
}

export function SEOHead({
  title = `${siteConfig.name} | Digital Transformation & Software Solutions`,
  description = siteConfig.description,
  canonical = siteConfig.url,
  type = 'website',
  image = siteConfig.ogImage,
  noIndex = false,
  includeSchemas = true,
  keywords,
  publishedTime,
  modifiedTime,
  faqs,
}: SEOHeadProps) {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const isHomepage = canonical === siteConfig.url || canonical === `${siteConfig.url}/`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content={siteConfig.author} />
      <meta name="keywords" content={keywords || siteConfig.keywords} />

      {/* Language & Locale */}
      <meta httpEquiv="content-language" content={siteConfig.language} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Hreflang — signal to Google this is the English-India version */}
      <link rel="alternate" hrefLang="en-in" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(siteConfig.ogImageWidth)} />
      <meta property="og:image:height" content={String(siteConfig.ogImageHeight)} />
      <meta property="og:image:alt" content={`${siteConfig.name} - Digital Transformation & Software Solutions`} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />

      {/* Article-specific OG tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${siteConfig.name} - Digital Transformation & Software Solutions`} />

      {/* Geo Meta Tags — Local SEO */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Chennai" />
      <meta name="geo.position" content={`${siteConfig.geo.latitude};${siteConfig.geo.longitude}`} />
      <meta name="ICBM" content={`${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`} />

      {/* JSON-LD Structured Data */}
      {includeSchemas && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(localBusinessSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(navigationSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(homeBreadcrumbs)}
          </script>
          {serviceSchemas.map((schema, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))}
          {/* Homepage FAQ rich snippets */}
          {isHomepage && (
            <script type="application/ld+json">
              {JSON.stringify(generateFAQSchema(homeFAQs))}
            </script>
          )}
          {/* Page-specific FAQ rich snippets */}
          {faqs && faqs.length > 0 && (
            <script type="application/ld+json">
              {JSON.stringify(generateFAQSchema(faqs))}
            </script>
          )}
        </>
      )}
    </Helmet>
  );
}
