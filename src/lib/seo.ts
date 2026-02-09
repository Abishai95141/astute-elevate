// Centralized SEO configuration for Astute Computer

export const siteConfig = {
  name: 'Astute Computer',
  url: 'https://astutecomputer.com',
  ogImage: 'https://astutecomputer.com/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  description: 'Astute Computer is a Chennai-based software consultancy specialising in digital transformation, AI-powered document digitization, operations automation, and custom software development for healthcare, legal, manufacturing, finance, and retail industries.',
  keywords: 'digital transformation Chennai, software development Tamil Nadu, AI document digitization, operations automation India, custom software development Chennai, document management system, business process automation, legacy modernization, healthcare software Chennai, legal document digitization, manufacturing ERP Chennai, retail digitization India',
  author: 'Astute Computer',
  foundingDate: '2023',
  phone: '+91-8667331224',
  email: 'astutecomputer.contact@gmail.com',
  locale: 'en_IN',
  language: 'en',
  address: {
    street: '130 MTH Road, I Floor, Lucky Towers',
    landmark: 'Opp. Ambattur Estate Bus Stand',
    area: 'Padi',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600058',
    country: 'India',
    countryCode: 'IN',
  },
  geo: {
    latitude: 13.0527,
    longitude: 80.1831,
  },
  social: {
    twitter: 'https://twitter.com/astutecomputer',
    linkedin: 'https://linkedin.com/company/astutecomputer',
  },
};

// Organization Schema — enhanced with foundingDate, knowsAbout, slogan
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/favicon-512x512.png`,
    width: 512,
    height: 512,
  },
  image: siteConfig.ogImage,
  description: siteConfig.description,
  foundingDate: siteConfig.foundingDate,
  slogan: 'Modernize Your Operations. Digitalize Your Legacy.',
  knowsAbout: [
    'Digital Transformation',
    'Document Digitization',
    'AI Automation',
    'Custom Software Development',
    'Operations Automation',
    'Legacy System Modernization',
  ],
  sameAs: [siteConfig.social.twitter, siteConfig.social.linkedin],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Tamil'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  },
};

// ProfessionalService Schema — better fit than plain LocalBusiness for a consultancy
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': `${siteConfig.url}/#business`,
  name: siteConfig.name,
  url: siteConfig.url,
  image: siteConfig.ogImage,
  logo: `${siteConfig.url}/favicon-512x512.png`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: '$$',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Bank Transfer, UPI',
  foundingDate: siteConfig.foundingDate,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'State', name: 'Tamil Nadu' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Place', name: 'Anna Nagar, Chennai' },
    { '@type': 'Place', name: 'Ambattur, Chennai' },
    { '@type': 'Place', name: 'Velachery, Chennai' },
    { '@type': 'Place', name: 'T. Nagar, Chennai' },
    { '@type': 'Place', name: 'Adyar, Chennai' },
    { '@type': 'Place', name: 'Guindy, Chennai' },
    { '@type': 'Place', name: 'Porur, Chennai' },
    { '@type': 'Place', name: 'Tambaram, Chennai' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Transformation Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Document Digitization',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Powered OCR & Scanning' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Intelligent Document Archival' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'AI Automation',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow Automation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Powered Analytics' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Custom Software Development',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Application Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
        ],
      },
    ],
  },
};

// Website Schema — with SearchAction for sitelinks search box
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { '@id': `${siteConfig.url}/#organization` },
  inLanguage: siteConfig.language,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/case-studies?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// SiteNavigationElement Schema — helps Google create sitelinks
export const navigationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: 'Main Navigation',
  hasPart: [
    { '@type': 'WebPage', name: 'Home', url: siteConfig.url },
    { '@type': 'WebPage', name: 'About', url: `${siteConfig.url}/about` },
    { '@type': 'WebPage', name: 'Case Studies', url: `${siteConfig.url}/case-studies` },
    { '@type': 'WebPage', name: 'Contact', url: `${siteConfig.url}/contact` },
    { '@type': 'WebPage', name: 'Document Digitization', url: `${siteConfig.url}/services/document-digitization` },
    { '@type': 'WebPage', name: 'AI Automation', url: `${siteConfig.url}/services/ai-automation` },
    { '@type': 'WebPage', name: 'Custom Software Development', url: `${siteConfig.url}/services/custom-software-development` },
    { '@type': 'WebPage', name: 'Digital Transformation', url: `${siteConfig.url}/services/digital-transformation` },
  ],
};

// Enhanced Service Schemas — with URL, areaServed, and offers
export const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Branding & Transformation',
    description: 'Complete visual identity, brand strategy, and digital transformation for modern businesses in Chennai and Tamil Nadu.',
    url: `${siteConfig.url}/services/digital-transformation`,
    provider: { '@id': `${siteConfig.url}/#organization` },
    serviceType: 'Digital Transformation',
    areaServed: { '@type': 'Country', name: 'India' },
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'INR' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Operations Digitalization & Automation',
    description: 'Transform manual business processes into efficient, automated digital workflows with AI-powered solutions.',
    url: `${siteConfig.url}/services/ai-automation`,
    provider: { '@id': `${siteConfig.url}/#organization` },
    serviceType: 'Business Process Automation',
    areaServed: { '@type': 'Country', name: 'India' },
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'INR' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Document Digitization & Archives',
    description: 'AI-powered OCR scanning, intelligent indexing, and secure digital archival for paper-heavy organisations in healthcare, legal, and government sectors.',
    url: `${siteConfig.url}/services/document-digitization`,
    provider: { '@id': `${siteConfig.url}/#organization` },
    serviceType: 'Document Management',
    areaServed: { '@type': 'Country', name: 'India' },
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'INR' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom Software Development',
    description: 'Full-stack web and mobile application development tailored to your business. From MVPs to enterprise platforms, built in Chennai.',
    url: `${siteConfig.url}/services/custom-software-development`,
    provider: { '@id': `${siteConfig.url}/#organization` },
    serviceType: 'Software Development',
    areaServed: { '@type': 'Country', name: 'India' },
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'INR' },
  },
];

// FAQ Schema Generator — for rich snippets
export const generateFAQSchema = (
  faqs: { question: string; answer: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

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

// Homepage FAQs — these will render as rich snippets in Google
export const homeFAQs = [
  {
    question: 'What services does Astute Computer offer?',
    answer: 'Astute Computer offers four core services: Digital Branding & Transformation, Operations Digitalization & Automation, AI-Powered Document Digitization & Archives, and Custom Software Development. We serve healthcare, legal, manufacturing, finance, and retail industries across Chennai and India.',
  },
  {
    question: 'Where is Astute Computer located?',
    answer: 'Astute Computer is located at 130 MTH Road, I Floor, Lucky Towers, opposite Ambattur Estate Bus Stand, Padi, Chennai 600058, Tamil Nadu, India. We serve clients across Chennai and pan-India.',
  },
  {
    question: 'What industries does Astute Computer serve?',
    answer: 'We specialise in digital transformation for healthcare, legal, manufacturing, finance, retail, and education industries. Each industry solution is tailored to address sector-specific challenges like legacy systems, paper records, and compliance requirements.',
  },
  {
    question: 'How does AI document digitization work?',
    answer: 'Our AI-powered document digitization uses advanced OCR (Optical Character Recognition) to scan physical documents, extract structured data, and organise them into searchable digital archives. This typically reduces document retrieval time by up to 70% and eliminates physical storage costs.',
  },
  {
    question: 'Does Astute Computer offer custom software development?',
    answer: 'Yes. We build full-stack web applications, mobile apps, APIs, and cloud-based platforms tailored to your business requirements. Our development stack includes modern technologies like React, Node.js, and AI/ML integrations.',
  },
];
