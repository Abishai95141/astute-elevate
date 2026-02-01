import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCaseStudyById,
  useCreateCaseStudy,
  useUpdateCaseStudy,
  generateSlug,
} from '@/hooks/useCaseStudies';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Loader2, Eye } from 'lucide-react';
import type { JSONContent } from '@tiptap/react';
import type { Json } from '@/integrations/supabase/types';

const CATEGORIES = [
  'Digital Branding',
  'Operations',
  'AI Archives',
  'Software Dev',
];

export default function CaseStudyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === 'new';

  const { data: existingStudy, isLoading: isLoadingStudy } = useCaseStudyById(
    isNew ? undefined : id
  );
  const createMutation = useCreateCaseStudy();
  const updateMutation = useUpdateCaseStudy();

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailAlt, setThumbnailAlt] = useState('');
  const [statValue, setStatValue] = useState('');
  const [statMetric, setStatMetric] = useState('');
  const [content, setContent] = useState<JSONContent>({ type: 'doc', content: [] });
  const [isPublished, setIsPublished] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (existingStudy) {
      setTitle(existingStudy.title);
      setSlug(existingStudy.slug);
      setCategory(existingStudy.category);
      setShortDescription(existingStudy.short_description);
      setThumbnailUrl(existingStudy.thumbnail_url);
      setThumbnailAlt(existingStudy.thumbnail_alt || '');
      setStatValue(existingStudy.stat_value || '');
      setStatMetric(existingStudy.stat_metric || '');
      setContent(existingStudy.content as JSONContent || { type: 'doc', content: [] });
      setIsPublished(existingStudy.is_published);
      setDisplayOrder(existingStudy.display_order);
      setMetaTitle(existingStudy.meta_title || '');
      setMetaDescription(existingStudy.meta_description || '');
    }
  }, [existingStudy]);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && title && !slug) {
      setSlug(generateSlug(title));
    }
  }, [title, isNew, slug]);

  const handleSave = async (publish: boolean = false) => {
    if (!title || !slug || !category || !shortDescription) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in title, slug, category, and description.',
        variant: 'destructive',
      });
      return;
    }

    const data = {
      title,
      slug,
      category,
      short_description: shortDescription,
      thumbnail_url: thumbnailUrl,
      thumbnail_alt: thumbnailAlt || null,
      stat_value: statValue || null,
      stat_metric: statMetric || null,
      content: content as Json,
      is_published: publish || isPublished,
      published_at: (publish || isPublished) ? new Date().toISOString() : null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      display_order: displayOrder,
    };

    try {
      if (isNew) {
        await createMutation.mutateAsync(data);
        toast({ title: 'Case study created!' });
      } else {
        await updateMutation.mutateAsync({ id: id!, ...data });
        toast({ title: 'Case study updated!' });
      }
      navigate('/admin/case-studies');
    } catch (error) {
      toast({
        title: 'Error saving',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (!isNew && isLoadingStudy) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/case-studies')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">
              {isNew ? 'New Case Study' : 'Edit Case Study'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {!isNew && existingStudy?.is_published && (
              <Button variant="outline" asChild>
                <a href={`/case-studies/${slug}`} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </a>
              </Button>
            )}
            <Button onClick={() => handleSave(false)} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
            {!isPublished && (
              <Button variant="default" onClick={() => handleSave(true)} disabled={isSaving}>
                Publish
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Thumbnail Section */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Thumbnail</h2>
            <ImageUploader
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
              folder="thumbnails"
            />
            <div className="mt-4">
              <Label htmlFor="thumbnailAlt">Alt Text</Label>
              <Input
                id="thumbnailAlt"
                value={thumbnailAlt}
                onChange={(e) => setThumbnailAlt(e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </div>
          </section>

          {/* Basic Info */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Case study title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief description for cards (max 160 chars)"
                  maxLength={160}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {shortDescription.length}/160 characters
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="statValue">Stat Value</Label>
                  <Input
                    id="statValue"
                    value={statValue}
                    onChange={(e) => setStatValue(e.target.value)}
                    placeholder="e.g., 150%, 10M+"
                  />
                </div>
                <div>
                  <Label htmlFor="statMetric">Stat Metric</Label>
                  <Input
                    id="statMetric"
                    value={statMetric}
                    onChange={(e) => setStatMetric(e.target.value)}
                    placeholder="e.g., Brand Recognition"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Content Editor */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Content</h2>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your case study content here..."
            />
          </section>

          {/* Gallery */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Gallery</h2>
            <GalleryManager caseStudyId={isNew ? undefined : id} />
          </section>

          {/* SEO */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">SEO</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="SEO title (defaults to case study title)"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO description (max 160 chars)"
                  maxLength={160}
                  rows={2}
                />
              </div>
            </div>
          </section>

          {/* Publishing */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Publishing</h2>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="published">Published</Label>
                <p className="text-sm text-muted-foreground">
                  Make this case study visible on the website
                </p>
              </div>
              <Switch
                id="published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="w-24"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Lower numbers appear first
              </p>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
