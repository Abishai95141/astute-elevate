
# Fix Sitemap for SEO Best Practices

## Current Issues

1. **Anchor URLs in static sitemap** - URLs like `/#services`, `/#portfolio`, `/#contact` are not separate pages and shouldn't be in sitemap
2. **Outdated lastmod dates** - Shows `2025-02-01` instead of current date
3. **Duplicate sitemap sources** - Both a static file and dynamic edge function exist

## Solution

Replace the static `public/sitemap.xml` with SEO-optimized content that only includes real, unique URLs. The dynamic edge function already has the correct structure.

---

## Implementation

### Update `public/sitemap.xml`

Remove all anchor-based URLs and only include real pages:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://astutecomputer.com/</loc>
    <lastmod>2026-02-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://astutecomputer.com/case-studies</loc>
    <lastmod>2026-02-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://astutecomputer.com/about</loc>
    <lastmod>2026-02-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://astutecomputer.com/contact</loc>
    <lastmod>2026-02-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## URLs Included (Real Pages Only)

| URL | Priority | Rationale |
|-----|----------|-----------|
| `/` | 1.0 | Homepage - highest priority |
| `/case-studies` | 0.9 | Hub page for all case studies |
| `/about` | 0.7 | Standalone about page |
| `/contact` | 0.8 | Contact page for conversions |

---

## URLs Removed (Anchor Links)

| Removed URL | Reason |
|-------------|--------|
| `/#services` | Anchor on homepage, not a unique page |
| `/#portfolio` | Anchor on homepage, not a unique page |
| `/#about` | Anchor on homepage (real `/about` page exists) |
| `/#sectors` | Anchor on homepage, not a unique page |
| `/#contact` | Anchor on homepage (real `/contact` page exists) |

---

## Dynamic Sitemap (Already Correct)

The edge function at `supabase/functions/sitemap/index.ts` is already properly configured to:
- Include only real page URLs
- Dynamically add `/services/{slug}` for published services
- Dynamically add `/case-studies/{slug}` for published case studies
- Use current date for `lastmod`

---

## Future Recommendation

Consider setting up your server/CDN to serve the dynamic sitemap from the edge function at `/sitemap.xml` instead of the static file. This ensures:
- New case studies and services are automatically included
- `lastmod` dates are always current
- No manual updates required

---

## Files to Modify

| File | Changes |
|------|---------|
| `public/sitemap.xml` | Remove anchor URLs, update to real pages only, fix lastmod date |
