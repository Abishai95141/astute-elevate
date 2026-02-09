import { ArrowRight } from 'lucide-react';
import LightPillar from '@/components/ui/LightPillar';

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToOfferings = () => {
    const element = document.querySelector('#offerings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Hero Background */}
      <section className="fixed top-0 left-0 right-0 h-screen flex items-center overflow-hidden bg-[#0a0a0a] z-0">
        {/* Light Pillar Background Effect */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <LightPillar
            topColor="#305CDE"
            bottomColor="#60A5FA"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.08}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="medium"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 pt-24 sm:pt-24 md:pt-28 lg:pt-28">
          <div className="max-w-3xl">
            {/* Headline */}
            <h1 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tight leading-[1.15] md:leading-[1.2] lg:leading-[1.25] mb-5 sm:mb-6 md:mb-8">
              <span className="text-white">Modernize Your Operations.</span>
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#a78bfa] bg-clip-text text-transparent">Digitalize Your Legacy.</span>
            </h1>

            {/* Subheadline - Bold and bright */}
            <p className="text-[0.95rem] sm:text-base md:text-lg lg:text-xl xl:text-[1.35rem] text-white font-medium max-w-2xl mb-6 sm:mb-8 md:mb-10 leading-[1.6]">
              We help businesses establish their own dedicated digital transformation hub — 
              a fully owned capability center designed to deliver technology, 
              operations, and business functions at scale.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6 sm:mb-8 md:mb-10">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 pl-5 sm:pl-6 pr-2 py-2 bg-gradient-to-r from-[#305CDE] to-[#60A5FA] hover:from-[#2548B5] hover:to-[#3B82F6] text-white text-[0.9rem] sm:text-base font-medium rounded-full transition-all"
              >
                <span>Contact Us</span>
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full">
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white transition-transform duration-300 ease-out group-hover:-translate-x-0.5" />
                </span>
              </button>
              <button
                onClick={scrollToOfferings}
                className="group inline-flex items-center gap-2 pl-5 sm:pl-6 pr-2 py-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white text-[0.9rem] sm:text-base font-medium rounded-full transition-all backdrop-blur-sm"
              >
                <span>Explore Our Offerings</span>
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full">
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white transition-transform duration-300 ease-out group-hover:-translate-x-0.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to push content below */}
      <div className="h-screen" />
    </>
  );
}
