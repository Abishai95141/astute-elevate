import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { About } from '@/components/About';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'About', url: `${siteConfig.url}/about` },
  ]);

  const aboutFAQs = [
    {
      question: 'What does Astute Computer do?',
      answer: 'Astute Computer is a Chennai-based software consultancy that helps businesses modernize their operations through digital transformation, AI-powered document digitization, workflow automation, and custom software development.',
    },
    {
      question: 'How long has Astute Computer been in business?',
      answer: 'Astute Computer was founded in 2023 and has been delivering digital transformation solutions to businesses across healthcare, legal, manufacturing, finance, and retail industries in Chennai and Tamil Nadu.',
    },
    {
      question: 'What makes Astute Computer different from other IT companies?',
      answer: 'We specialise in end-to-end digital transformation — from scanning paper records with AI-powered OCR to building custom software platforms. Unlike generic IT firms, we focus on measurable operational improvements for paper-heavy, legacy-burdened organisations.',
    },
  ];

  return (
    <>
      <SEOHead
        title="About Astute Computer | Digital Transformation Consultancy in Chennai"
        description="Astute Computer is a Chennai-based software consultancy founded in 2023. We help healthcare, legal, manufacturing, finance, and retail businesses modernize operations with AI document digitization, workflow automation, and custom software."
        canonical="https://astutecomputer.com/about"
        type="website"
        keywords="about Astute Computer, software consultancy Chennai, digital transformation company Tamil Nadu, IT company Padi Chennai, business automation consultancy India"
        faqs={aboutFAQs}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
}
