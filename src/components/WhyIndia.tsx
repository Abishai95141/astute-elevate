import { Counter } from '@/components/ui/Counter';
import { BlurFade } from '@/components/ui/BlurFade';
import FlowingMenu from '@/components/ui/FlowingMenu';

import healthcareImg from '@/assets/sections/industry-healthcare.jpg';
import legalImg from '@/assets/sections/industry-legal.jpg';
import manufacturingImg from '@/assets/sections/industry-manufacturing.jpg';
import financeImg from '@/assets/sections/industry-finance.jpg';
import retailImg from '@/assets/sections/industry-retail.jpg';

const stats = [
  { 
    value: 10, 
    suffix: '+', 
    label: 'SOLUTIONS DEPLOYED', 
    sublabel: 'ACROSS INDUSTRIES',
    gradient: 'from-cyan-400 to-blue-500'
  },
  { 
    value: 90, 
    suffix: '%', 
    label: 'OF BUSINESS DATA', 
    sublabel: 'IS STILL UNSTRUCTURED',
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    value: 80, 
    suffix: '%', 
    label: 'OF ENTERPRISES', 
    sublabel: 'ARE INVESTING IN AI',
    gradient: 'from-blue-600 to-blue-400'
  },
];

const industryMenuItems = [
  { link: '/industries/healthcare', text: 'Healthcare', image: healthcareImg },
  { link: '/industries/legal', text: 'Legal', image: legalImg },
  { link: '/industries/manufacturing', text: 'Manufacturing', image: manufacturingImg },
  { link: '/industries/finance', text: 'Finance', image: financeImg },
  { link: '/industries/retail', text: 'Retail', image: retailImg },
];

export function WhyIndia() {
  return (
    <section className="relative bg-[#f5f3ef] py-20 sm:py-28 lg:py-36">
      <div className="container-custom px-6 sm:px-8 lg:px-12">
        
        {/* Top: Header + Stats side by side */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start mb-14 sm:mb-16 lg:mb-20">
          {/* Left - Title & Description */}
          <div className="lg:max-w-md xl:max-w-lg flex-shrink-0 text-left">
            <BlurFade>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
                  Industries We Serve
                </span>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.05}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-[1.15]">
                Solving Industry<br />Challenges
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.1}>
              <p className="text-base sm:text-lg text-gray-600">
                Every sector faces unique digital transformation hurdles. We've solved them all.
              </p>
            </BlurFade>
          </div>

          {/* Right - Stats Cards */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-6">
              {/* First tall card */}
              <BlurFade delay={0.1} className="w-full sm:w-[180px] md:w-[200px] lg:w-[220px]">
                <div className="relative bg-[#1a1f3c] rounded-2xl p-5 sm:p-6 md:p-7 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] flex flex-col justify-center overflow-hidden h-full">
                  <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                  <div className="relative z-10 text-center sm:text-left">
                    <div className="flex items-baseline justify-center sm:justify-start gap-0.5 mb-3">
                      <Counter value={stats[0].value} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" />
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{stats[0].suffix}</span>
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">{stats[0].label}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{stats[0].sublabel}</p>
                  </div>
                </div>
              </BlurFade>

              {/* Stacked cards column */}
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 flex-1">
                <BlurFade delay={0.15}>
                  <div className="relative bg-[#1a1f3c] rounded-2xl p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[130px] md:min-h-[132px] flex items-center overflow-hidden">
                    <div className="absolute right-0 top-5 bottom-5 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                    <div className="relative z-10 text-center sm:text-left flex-shrink-0">
                      <div className="flex items-baseline justify-center sm:justify-start gap-0.5 mb-3">
                        <Counter value={stats[1].value} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" />
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{stats[1].suffix}</span>
                      </div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">{stats[1].label}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{stats[1].sublabel}</p>
                    </div>
                    <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-2 opacity-40">
                      <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="30" r="8" stroke="#3b82f6" strokeWidth="2" fill="none" />
                        <circle cx="40" cy="20" r="6" stroke="#60a5fa" strokeWidth="2" fill="none" />
                        <circle cx="60" cy="35" r="10" stroke="#2563eb" strokeWidth="2" fill="none" />
                        <path d="M20 30 L40 20 L60 35" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" />
                        <defs>
                          <linearGradient id="grad1" x1="20" y1="30" x2="60" y2="35">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#60a5fa" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <div className="relative bg-[#1a1f3c] rounded-2xl p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[130px] md:min-h-[132px] flex items-center overflow-hidden">
                    <div className="absolute right-0 top-5 bottom-5 w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full" />
                    <div className="relative z-10 text-center sm:text-left flex-shrink-0">
                      <div className="flex items-baseline justify-center sm:justify-start gap-0.5 mb-3">
                        <Counter value={stats[2].value} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" />
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{stats[2].suffix}</span>
                      </div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">{stats[2].label}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{stats[2].sublabel}</p>
                    </div>
                    <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-2 opacity-40">
                      <svg width="90" height="60" viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="25" width="20" height="25" rx="3" stroke="#3b82f6" strokeWidth="2" fill="none" />
                        <rect x="35" y="15" width="20" height="35" rx="3" stroke="#2563eb" strokeWidth="2" fill="none" />
                        <rect x="60" y="10" width="20" height="40" rx="3" stroke="#1d4ed8" strokeWidth="2" fill="none" />
                        <circle cx="20" cy="18" r="4" fill="#3b82f6" opacity="0.6" />
                        <circle cx="45" cy="8" r="3" fill="#2563eb" opacity="0.6" />
                        <circle cx="70" cy="5" r="3" fill="#1d4ed8" opacity="0.6" />
                      </svg>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-10 sm:mb-12 lg:mb-14" />

        {/* Bottom: Flowing Industry Menu */}
        <BlurFade delay={0.1}>
          <div className="rounded-2xl overflow-hidden">
            <FlowingMenu
              items={industryMenuItems}
              speed={12}
              textColor="#1a1a2e"
              bgColor="#ffffff"
              marqueeBgColor="#1a1f3c"
              marqueeTextColor="#ffffff"
              borderColor="#e5e7eb"
            />
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
