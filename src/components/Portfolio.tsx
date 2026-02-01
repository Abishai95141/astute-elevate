import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Corporate Rebrand',
    category: 'Digital Branding',
    description: 'Complete visual identity overhaul for a Fortune 500 company.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    stats: { increase: '150%', metric: 'Brand Recognition' },
  },
  {
    id: 2,
    title: 'Process Automation',
    category: 'Operations',
    description: 'End-to-end workflow automation reducing manual work by 80%.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    stats: { increase: '80%', metric: 'Time Saved' },
  },
  {
    id: 3,
    title: 'AI Document System',
    category: 'AI Archives',
    description: 'Intelligent document management for a legal firm.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    stats: { increase: '10M+', metric: 'Documents Processed' },
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    category: 'Software Dev',
    description: 'Custom marketplace handling 100K+ daily transactions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    stats: { increase: '300%', metric: 'Revenue Growth' },
  },
  {
    id: 5,
    title: 'Healthcare Portal',
    category: 'Software Dev',
    description: 'Patient management system serving 500+ clinics.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    stats: { increase: '99.9%', metric: 'Uptime' },
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-[350px] sm:w-[400px] lg:w-[450px] group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 aspect-[4/5]">
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-muted-foreground mb-2"
          >
            {project.category}
          </motion.span>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-foreground">
                {project.stats.increase}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                {project.stats.metric}
              </span>
            </div>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors"
            >
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container-custom mb-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-4"
            >
              Our Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground"
            >
              Case Studies
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-md"
          >
            Real results from real projects. See how we've helped businesses transform.
          </motion.p>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative">
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex gap-6 pl-4 sm:pl-8 lg:pl-16"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container-custom mt-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-border/50">
          {[
            { value: '50+', label: 'Projects Completed' },
            { value: '30+', label: 'Happy Clients' },
            { value: '5+', label: 'Years Experience' },
            { value: '99%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
