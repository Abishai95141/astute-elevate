import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Lightbulb, Users, Zap, Shield, Clock, ArrowRight } from 'lucide-react';
import { BlurFade } from '@/components/ui/BlurFade';
import { Counter } from '@/components/ui/Counter';

const features = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every line of code, every pixel, every decision is made with purpose and accuracy.',
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries and embrace cutting-edge technologies to deliver modern solutions.',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Your success is our success. We grow together as true partners in your journey.',
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Impact',
    description: 'We deliver solutions that make a measurable difference to your bottom line.',
    accent: 'from-violet-400 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Enterprise-grade security measures to protect your data and operations.',
    accent: 'from-rose-400 to-pink-500',
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: '99.9% uptime guarantee with 24/7 monitoring and rapid response times.',
    accent: 'from-sky-400 to-blue-500',
  },
];

const stats = [
  { value: 4, suffix: '+', label: 'Industries Served' },
  { value: 3, suffix: '+', label: 'Years in Business' },
  { value: 10, suffix: '+', label: 'Solutions Deployed' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container-custom relative z-10 px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
          <BlurFade>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-widest text-primary mb-3 sm:mb-4">
              Why Partner With Us
            </span>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 sm:mb-6 leading-[1.15]">
              We Build Digital
              <br />
              <span className="text-gradient-purple">Excellence</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Astute Computer is a software consultancy dedicated to helping businesses modernize their operations through innovative digital solutions.
            </p>
          </BlurFade>
        </div>

        {/* Stats Row — inline above the bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {stats.map((stat, index) => (
            <BlurFade key={stat.label} delay={0.08 * index}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative overflow-hidden rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-sm p-5 sm:p-6 text-center group hover:border-primary/30 transition-colors duration-300"
              >
                {/* Subtle gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* Bento Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            // First and last cards span 2 cols on large screens for visual variety
            const isWide = index === 0 || index === 5;
            return (
              <BlurFade
                key={feature.title}
                delay={0.06 * index}
                className={isWide ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
                >
                  {/* Accent gradient bar at top */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className={`relative z-10 p-6 sm:p-7 flex ${isWide ? 'flex-col sm:flex-row sm:items-center sm:gap-6' : 'flex-col'}`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} flex items-center justify-center shadow-lg mb-4 ${isWide ? 'sm:mb-0 sm:flex-shrink-0' : ''}`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Arrow that slides in on hover */}
                    <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </motion.div>
              </BlurFade>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <BlurFade delay={0.5}>
          <div className="mt-14 sm:mt-20 text-center">
            <p className="text-muted-foreground text-sm sm:text-base mb-5">
              Ready to modernize your operations?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white font-medium text-sm sm:text-base hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
