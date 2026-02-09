import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CoreMission } from '@/components/CoreMission';
import { WhyPartner } from '@/components/WhyPartner';
import { WhyIndia } from '@/components/WhyIndia';
import { StatsBento } from '@/components/StatsBento';
import { HowWeWork } from '@/components/HowWeWork';
import { OfferingsSection } from '@/components/OfferingsSection';
import { Portfolio } from '@/components/Portfolio';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { useSecretSequence } from '@/hooks/useSecretSequence';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // Reset scroll position on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);
  
  // Enable secret keyboard sequence to access admin
  useSecretSequence();
  return (
    <>
      <SEOHead
        title="Astute Computer | Digital Transformation & Software Solutions in Chennai"
        description="Astute Computer is a Chennai-based software consultancy specialising in digital transformation, AI-powered document digitization, operations automation, and custom software development for healthcare, legal, manufacturing, finance, and retail industries."
        canonical="https://astutecomputer.com/"
        type="website"
      />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-background noise">
        <Navbar />
        <main>
          <Hero />
          {/* Content container that covers the fixed hero */}
          <div className="relative z-10 bg-[#0a0a0a]">
            <CoreMission />
            <WhyPartner />
            <WhyIndia />
            <StatsBento />
            <HowWeWork />
            <OfferingsSection />
            <Portfolio />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
