// Centralized SEO configuration for Astute Computer

export const siteConfig = {
  name: 'Astute Computer',
  url: 'https://astutecomputer.com',
  ogImage: 'https://astutecomputer.com/og-image.png',
  description: 'Transform your business with Astute Computer. We offer digital branding, operations digitalization, AI-powered document archives, and custom software development.',
  keywords: 'digital transformation, software development, AI, document management, branding, business automation',
  author: 'Astute Computer',
  phone: '+91-8667331224',
  email: 'astutecomputer.contact@gmail.com',
  social: {
    twitter: 'https://twitter.com/astutecomputer',
    linkedin: 'https://linkedin.com/company/astutecomputer',
  },
};

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  description: siteConfig.description,
  sameAs: [siteConfig.social.twitter, siteConfig.social.linkedin],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: 'customer service',
  },
};

// Local Business Schema
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: '$$',
  image: siteConfig.ogImage,
};

// Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
};

// Service Schemas
export const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Branding',
    description: 'Complete visual identity and brand strategy for modern businesses.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    serviceType: 'Branding',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Operations Digitalization',
    description: 'Transform manual processes into efficient digital workflows.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    serviceType: 'Digital Transformation',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Document Archives',
    description: 'Intelligent document management powered by artificial intelligence.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    serviceType: 'Document Management',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom Software Development',
    description: 'Bespoke software solutions tailored to your business needs.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    serviceType: 'Software Development',
  },
];

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// Default breadcrumbs for homepage
export const homeBreadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: siteConfig.url },
]);
