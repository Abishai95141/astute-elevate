import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { BlurFade } from '@/components/ui/BlurFade';
import CardSwap, { Card } from '@/components/ui/CardSwap';

import precisionImg from '@/assets/sections/about-precision.jpg';
import innovationImg from '@/assets/sections/about-innovation.jpg';
import partnershipImg from '@/assets/sections/about-partnership.jpg';
import impactImg from '@/assets/sections/about-impact.jpg';
import securityImg from '@/assets/sections/about-security.jpg';
import reliabilityImg from '@/assets/sections/about-reliability.jpg';

const cardImages = [
  { title: 'Precision', brief: 'Every decision made with purpose and accuracy — from code to delivery.', image: precisionImg },
  { title: 'Innovation', brief: 'Embracing cutting-edge technologies to build modern, future-ready solutions.', image: innovationImg },
  { title: 'Partnership', brief: 'Your success is our success. We grow together as true partners.', image: partnershipImg },
  { title: 'Impact', brief: 'Solutions that make a measurable difference to your bottom line.', image: impactImg },
  { title: 'Security', brief: 'Enterprise-grade measures to protect your data and operations.', image: securityImg },
  { title: 'Reliability', brief: '99.9% uptime with 24/7 monitoring and rapid response times.', image: reliabilityImg },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState({ w: 500, h: 380 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      const mobile = containerW < 640;
      setIsMobile(mobile);
      const w = mobile ? Math.min(containerW * 0.7, 320) : Math.min(containerW * 0.85, 600);
      const h = w * 0.75;
      setCardSize({ w, h });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28 md:py-36">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container-custom relative z-10 px-6 sm:px-8">

        {/* About Us Content — TOP */}
        <div className="max-w-3xl mx-auto mb-24 sm:mb-32 lg:mb-40">
          <BlurFade delay={0.1}>
            <div className="flex items-center gap-3 mb-5 justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                About Us
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={0.15}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 sm:mb-10 text-center leading-[1.15]">
              Built on Trust.
              <br />
              <span className="text-gradient-purple">Driven by Innovation.</span>
            </h2>
          </BlurFade>

          <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <BlurFade delay={0.2}>
              <p>
                Astute Computer is a technology-driven firm built on over <span className="text-foreground font-medium">26 years of trusted service</span> and long-standing customer relationships. What began as a reliable computer solutions business has now evolved into a forward-thinking software and AI solutions company.
              </p>
            </BlurFade>

            <BlurFade delay={0.25}>
              <p>
                We combine legacy trust with modern innovation — helping businesses transition from traditional operations to intelligent digital systems.
              </p>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p className="text-foreground font-medium">
                Our focus is simple: Build practical, scalable, and high-impact technology solutions that solve real business problems.
              </p>
            </BlurFade>

            <BlurFade delay={0.35}>
              <p>
                From custom software development and AI automations to enterprise systems and IT consulting, we work closely with our clients to understand their workflows, identify inefficiencies, and implement smart solutions that drive measurable growth.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p>
                At Astute Computer, we believe technology should not complicate business — it should <span className="text-foreground font-medium">simplify and strengthen it</span>.
              </p>
            </BlurFade>

            <BlurFade delay={0.45}>
              <p className="text-foreground font-semibold text-lg sm:text-xl pt-2">
                Backed by experience. Driven by innovation. Built for the future.
              </p>
            </BlurFade>
          </div>
        </div>

        {/* Card Swap — BOTTOM */}
        <BlurFade delay={0.5}>
          <div
            ref={containerRef}
            className="flex items-center justify-center mt-16 sm:mt-20 lg:mt-28"
            style={{ height: cardSize.h + 120 }}
          >
            <CardSwap
              width={cardSize.w}
              height={cardSize.h}
              cardDistance={isMobile ? 20 : 40}
              verticalDistance={isMobile ? 25 : 45}
              delay={2500}
              pauseOnHover={true}
              skewAmount={isMobile ? 1.5 : 3}
              easing="elastic"
            >
              {cardImages.map((card) => (
                <Card key={card.title}>
                  <div className="relative w-full h-full">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <h4 className="text-white font-bold text-xl sm:text-2xl mb-1">{card.title}</h4>
                      <p className="text-white/70 text-sm sm:text-base leading-snug">{card.brief}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
