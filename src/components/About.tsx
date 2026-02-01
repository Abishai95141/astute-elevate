import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Lightbulb, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every line of code, every pixel, every decision is made with purpose.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries and embrace cutting-edge technologies.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Your success is our success. We grow together.',
  },
  {
    icon: Zap,
    title: 'Impact',
    description: 'We deliver solutions that make a measurable difference.',
  },
];

const timeline = [
  { year: '2019', event: 'Founded Astute Computer' },
  { year: '2020', event: 'Expanded to AI solutions' },
  { year: '2022', event: 'Reached 30+ enterprise clients' },
  { year: '2024', event: 'Launched document AI platform' },
];

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="inline-block">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + index * 0.03 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-4"
            >
              About Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8"
            >
              We Build Digital
              <br />
              <span className="text-muted-foreground">Excellence</span>
            </motion.h2>
          </div>
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Astute Computer is a software consultancy dedicated to helping businesses modernize their operations through innovative digital solutions. We combine technical expertise with creative thinking to deliver results that matter.
            </motion.p>
          </div>
        </div>

        {/* Mission Statement with Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center py-16 mb-24 border-y border-border/30"
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            "<TypewriterText text="Our mission is to transform complexity into simplicity, legacy into innovation, and ideas into reality." delay={0.5} />"
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-14 h-14 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-colors"
              >
                <value.icon className="w-6 h-6 text-foreground" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground mb-12 text-center"
          >
            Our Journey
          </motion.h3>

          <div className="relative flex flex-col md:flex-row md:justify-between gap-8 md:gap-4">
            {/* Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-2"
              >
                {/* Dot */}
                <div className="relative z-10 w-4 h-4 rounded-full bg-background border-2 border-foreground flex-shrink-0" />
                <div className="md:text-center">
                  <span className="block text-2xl font-bold text-foreground mb-1">
                    {item.year}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.event}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
