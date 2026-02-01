import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Cog, FileText, Code } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Digital Branding',
    description: 'Brand strategy, logo design, and complete visual identity systems that make your business unforgettable.',
    features: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines'],
  },
  {
    icon: Cog,
    title: 'Operations Digitalization',
    description: 'Transform your business processes with cutting-edge digitization and automation solutions.',
    features: ['Process Automation', 'Workflow Design', 'System Integration', 'Digital Transformation'],
  },
  {
    icon: FileText,
    title: 'AI Document Archives',
    description: 'AI-powered scanning, OCR, and intelligent archival systems that bring order to your documents.',
    features: ['AI-Powered OCR', 'Smart Indexing', 'Secure Storage', 'Quick Retrieval'],
  },
  {
    icon: Code,
    title: 'Custom Software',
    description: 'Full-stack web and mobile applications tailored to your unique business requirements.',
    features: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Solutions'],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 50, rotateX: -15 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      className="group relative perspective-1000"
    >
      <div className="relative p-8 rounded-2xl bg-card border border-border/50 transition-all duration-500 group-hover:border-foreground/20 group-hover:shadow-xl overflow-hidden preserve-3d">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative z-10 w-14 h-14 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors"
        >
          <service.icon className="w-7 h-7 text-foreground" />
        </motion.div>

        {/* Content */}
        <h3 className="relative z-10 text-2xl font-semibold text-foreground mb-3">
          {service.title}
        </h3>
        <p className="relative z-10 text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <ul className="relative z-10 space-y-2">
          {service.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: index * 0.15 + i * 0.1 + 0.3 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="w-1 h-1 rounded-full bg-foreground/50" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-foreground/10 to-transparent rounded-bl-3xl" />
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-4"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            End-to-end digital solutions that transform how you operate, communicate, and grow.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
