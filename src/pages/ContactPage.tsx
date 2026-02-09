import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Contact } from '@/components/Contact';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Contact', url: `${siteConfig.url}/contact` },
  ]);

  const contactFAQs = [
    {
      question: 'How can I contact Astute Computer?',
      answer: 'You can reach Astute Computer by phone at +91-8667331224, by email at astutecomputer.contact@gmail.com, or by visiting our office at 130 MTH Road, I Floor, Lucky Towers, Padi, Chennai 600058. You can also fill out the contact form on our website.',
    },
    {
      question: 'Where is Astute Computer office located?',
      answer: 'Our office is at 130 MTH Road, I Floor, Lucky Towers, opposite Ambattur Estate Bus Stand, Padi, Chennai 600058, Tamil Nadu, India. We are open Monday to Friday, 9 AM to 6 PM.',
    },
    {
      question: 'Does Astute Computer offer free consultations?',
      answer: 'Yes. We offer an initial consultation to understand your business challenges and recommend the right digital transformation approach. Contact us to schedule a call or in-person meeting at our Chennai office.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Contact Astute Computer | Get a Free Consultation in Chennai"
        description="Contact Astute Computer for digital transformation, AI document digitization, workflow automation, or custom software development. Visit our Chennai office at Padi or call +91-8667331224."
        canonical="https://astutecomputer.com/contact"
        type="website"
        keywords="contact Astute Computer, software company Chennai contact, digital transformation consultation, IT company Padi Chennai, free consultation software development"
        faqs={contactFAQs}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
