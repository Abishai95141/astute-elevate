import { useParams, Link } from 'react-router-dom';
import { useCaseStudyBySlug } from '@/hooks/useCaseStudies';
import { useCaseStudyImages } from '@/hooks/useCaseStudyImages';
import { SEOHead } from '@/components/SEOHead';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContentRenderer } from '@/components/case-study/ContentRenderer';
import { CaseStudyGallery } from '@/components/case-study/CaseStudyGallery';
import { RelatedCaseStudies } from '@/components/case-study/RelatedCaseStudies';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { JSONContent } from '@tiptap/react';

export default function CaseStudy() {
  const { slug } = useParams();
  const { data: caseStudy, isLoading, error } = useCaseStudyBySlug(slug);
  const { data: images = [] } = useCaseStudyImages(caseStudy?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The case study you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/#portfolio">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={caseStudy.meta_title || `${caseStudy.title} | Astute Computer`}
        description={caseStudy.meta_description || caseStudy.short_description}
        canonical={`https://astutecomputer.com/case-studies/${caseStudy.slug}`}
        type="article"
        image={caseStudy.thumbnail_url || undefined}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Fixed Back Button */}
        <div className="fixed top-24 left-4 z-40 md:left-8">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="backdrop-blur-sm bg-background/80 border-border/50 shadow-lg"
          >
            <Link to="/#portfolio">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-end">
            {/* Background Image */}
            {caseStudy.thumbnail_url && (
              <div className="absolute inset-0">
                <img
                  src={caseStudy.thumbnail_url}
                  alt={caseStudy.thumbnail_alt || caseStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>
            )}

            <div className="container-custom relative py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to="/#portfolio"
                  className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Portfolio
                </Link>

                <span className="inline-block text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  {caseStudy.category}
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  {caseStudy.title}
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                  {caseStudy.short_description}
                </p>

                {caseStudy.stat_value && caseStudy.stat_metric && (
                  <div className="inline-flex items-baseline gap-2 px-6 py-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                    <span className="text-4xl font-bold text-foreground">
                      {caseStudy.stat_value}
                    </span>
                    <span className="text-muted-foreground">
                      {caseStudy.stat_metric}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Content Section */}
          <section className="container-custom py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto prose prose-lg dark:prose-invert"
            >
              <ContentRenderer content={caseStudy.content as JSONContent} />
            </motion.div>
          </section>

          {/* Gallery Section */}
          {images.length > 0 && (
            <section className="container-custom py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-8">Project Gallery</h2>
                <CaseStudyGallery images={images} />
              </motion.div>
            </section>
          )}

          {/* Related Case Studies */}
          <RelatedCaseStudies
            currentId={caseStudy.id}
            category={caseStudy.category}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
