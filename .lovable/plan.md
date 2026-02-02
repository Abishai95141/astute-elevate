
# Comprehensive SEO Improvement Plan for AstuteComputer.com

This plan addresses all 10 items in your SEO requirements, focusing on structured content, internal linking, and crawlability without changing the existing design.

---

## Phase 1: Database Schema Updates (CMS Enhancements)

### 1.1 Add New Columns to `case_studies` Table

Add the following fields to support richer SEO metadata:

| Field | Type | Purpose |
|-------|------|---------|
| `industry` | text | Single select (Audit, Retail, Manufacturing, Healthcare, Fintech, Legal, Education) |
| `services` | text[] | Multi-select array (Document Digitization, AI Automation, Custom Software, Digital Transformation) |
| `tech_stack` | text[] | Array of technology tags |
| `results` | jsonb | Array of 2-4 result objects with label, value, context |
| `client_type` | text | Non-PII safe label (e.g., "Mid-size audit firm (India)") |
| `faqs` | jsonb | Array of Q/A pairs for FAQ schema |
| `related_case_study_ids` | uuid[] | References to 2-3 related case studies |

### 1.2 Create `services` Table

New table for dedicated service pages:

| Column | Type | Purpose |
|--------|------|---------|
| `id` | uuid | Primary key |
| `title` | text | Service name |
| `slug` | text | URL-friendly slug |
| `description` | text | Short description |
| `content` | jsonb | Rich text content |
| `icon` | text | Icon identifier |
| `features` | text[] | Feature list |
| `meta_title` | text | SEO title |
| `meta_description` | text | SEO description |
| `display_order` | integer | Sort order |
| `is_published` | boolean | Visibility flag |
| `created_at` | timestamp | Creation date |
| `updated_at` | timestamp | Last update |

---

## Phase 2: New Pages & Components

### 2.1 Case Studies Hub Page (`/case-studies`)

Create a filterable listing page:

- Grid of case study cards with thumbnail, title, short description, industry tag, services tags
- Filter UI for industry and services (simple dropdown/checkbox filters)
- SEO-optimized with proper title, description, and BreadcrumbList schema
- Content rendered immediately (not behind loading state) for crawler accessibility

**File Structure:**
```
src/pages/CaseStudiesHub.tsx
src/components/case-studies/CaseStudyFilters.tsx
src/components/case-studies/CaseStudyCard.tsx
```

### 2.2 Service Pages (`/services/:slug`)

Create 4 dedicated service pages:

| Route | Service |
|-------|---------|
| `/services/document-digitization` | AI Document Archives |
| `/services/ai-automation` | Operations Digitalization |
| `/services/custom-software-development` | Custom Software |
| `/services/digital-transformation` | Digital Branding |

Each page includes:
- Hero section with service title and description
- Feature list
- "Related Case Studies" section linking to relevant cases
- Internal links to 1-2 other service pages
- BreadcrumbList schema
- Service schema (JSON-LD)

**File Structure:**
```
src/pages/Service.tsx
src/hooks/useServices.ts
```

---

## Phase 3: Navigation & Internal Linking Updates

### 3.1 Update Navbar

Add links to:
- "Case Studies" -> `/case-studies`
- "Services" dropdown with links to each service page

### 3.2 Update Footer

Add links to:
- All 4 service pages
- Case Studies hub page
- Ensure every important page is within 3 clicks from homepage

### 3.3 Homepage Internal Links

- Add links to featured case studies (first 3 published)
- Service cards link to their dedicated pages

---

## Phase 4: SEO Meta & Canonical Rules

### 4.1 SEOHead Component Updates

Enhance for:
- Consistent canonical URLs (https://astutecomputer.com/{path})
- Trailing slash consistency (no trailing slash)
- OpenGraph tags for all pages
- Auto-generated title/description templates for case studies:
  - Title: `Case Study: {Title} | Astute Computer`
  - Description: `{shortDescription} Results: {result1.value} {result1.label}.`

### 4.2 Create CaseStudySEOHead Component

Generates structured data for case studies including:
- Article/CreativeWork schema
- FAQPage schema (if FAQs exist)
- BreadcrumbList schema

---

## Phase 5: Dynamic Sitemap Generation

### 5.1 Create Sitemap Generation Logic

Replace static sitemap with dynamic generation:

**Pages to include:**
- Homepage (`/`)
- All service pages (`/services/*`)
- Case Studies hub (`/case-studies`)
- All published case study detail pages (`/case-studies/{slug}`)
- About, Contact anchors

**Implementation Options:**
1. Edge function that generates sitemap.xml dynamically
2. Pre-rendered sitemap updated when content changes

### 5.2 Update robots.txt

```
User-agent: *
Allow: /

Disallow: /admin
Disallow: /admin/*

Sitemap: https://astutecomputer.com/sitemap.xml
```

---

## Phase 6: Enhanced Structured Data (JSON-LD)

### 6.1 Sitewide Schemas (already exists, verify)

- Organization schema with logo, sameAs, contactPoint
- WebSite schema
- LocalBusiness schema

### 6.2 Page-Specific Schemas

**Case Study Pages:**
```json
{
  "@type": "Article",
  "headline": "{title}",
  "description": "{shortDescription}",
  "datePublished": "{publishedAt}",
  "dateModified": "{updatedAt}",
  "image": "{thumbnailUrl}",
  "author": { "@type": "Organization", "name": "Astute Computer" }
}
```

**Service Pages:**
```json
{
  "@type": "Service",
  "name": "{title}",
  "description": "{description}",
  "provider": { "@type": "Organization", "name": "Astute Computer" }
}
```

**FAQ Schema** (for case studies with FAQs):
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

---

## Phase 7: Admin CMS Updates

### 7.1 Update CaseStudyEdit.tsx

Add form fields for:
- Industry (single select)
- Services (multi-select checkboxes)
- Tech Stack (tag input)
- Results (array builder with label/value/context)
- Client Type (text input)
- FAQs (array of Q/A pairs)
- Related Case Studies (multi-select from existing studies)

### 7.2 Create Service Admin Pages

- `/admin/services` - list all services
- `/admin/services/:id` - edit service content

---

## Phase 8: Image SEO & Performance

### 8.1 Ensure All Images Have Alt Text

Already implemented in CMS - verify thumbnail_alt is always used.

### 8.2 Lazy Loading

Already implemented with `loading="lazy"` on images.

### 8.3 Responsive Images

Consider adding srcset for different viewport sizes (optional enhancement).

---

## Phase 9: Indexation Hygiene

### 9.1 Ensure Public Pages Return 200 OK

- Case study pages check for `is_published` - non-published returns 404-like UI
- Service pages are always available

### 9.2 No Accidental noindex

- Verify SEOHead only adds `noindex` when explicitly requested
- Admin pages should have `noIndex={true}`

### 9.3 OpenGraph Tags

Already implemented in SEOHead - verify image, url, title, description for all pages.

---

## Files to Create/Modify

### New Files:
| File | Purpose |
|------|---------|
| `src/pages/CaseStudiesHub.tsx` | Case studies listing page |
| `src/pages/Service.tsx` | Dynamic service page |
| `src/hooks/useServices.ts` | Service data hook |
| `src/components/case-studies/CaseStudyFilters.tsx` | Filter UI component |
| `src/components/case-studies/CaseStudyCard.tsx` | Card component for listings |
| `src/components/seo/CaseStudySEO.tsx` | Case study structured data |
| `src/components/seo/ServiceSEO.tsx` | Service structured data |
| `src/pages/admin/Services.tsx` | Admin services list |
| `src/pages/admin/ServiceEdit.tsx` | Admin service editor |
| `supabase/functions/sitemap/index.ts` | Dynamic sitemap generator |

### Files to Modify:
| File | Changes |
|------|---------|
| `src/App.tsx` | Add new routes |
| `src/components/Navbar.tsx` | Add Case Studies & Services links |
| `src/components/Footer.tsx` | Add links to all pages |
| `src/components/Services.tsx` | Make cards link to service pages |
| `src/components/Portfolio.tsx` | Add "View All" link to hub |
| `src/pages/CaseStudy.tsx` | Enhanced structured data, breadcrumbs |
| `src/pages/admin/CaseStudyEdit.tsx` | Add new CMS fields |
| `src/lib/seo.ts` | Add breadcrumb generators, schema helpers |
| `public/robots.txt` | Block admin routes |

### Database Migration:
- Add columns to `case_studies` table
- Create `services` table
- Add RLS policies for services table

---

## Summary Checklist

| Item | Status |
|------|--------|
| CMS fields for industry, services, results, FAQs | To implement |
| `/case-studies` hub page with filters | To create |
| Service pages (`/services/*`) | To create |
| Internal linking updates (nav, footer, homepage) | To implement |
| SEO meta & canonical consistency | To enhance |
| Dynamic sitemap generation | To create |
| Structured data (Article, FAQ, Breadcrumbs) | To implement |
| Image alt text & lazy loading | Already done |
| Indexation hygiene (robots.txt, noindex) | To verify/update |
| Admin CMS for new fields | To implement |

---

## Final URL List for Sitemap

```
https://astutecomputer.com/
https://astutecomputer.com/case-studies
https://astutecomputer.com/case-studies/{each-published-slug}
https://astutecomputer.com/services/document-digitization
https://astutecomputer.com/services/ai-automation
https://astutecomputer.com/services/custom-software-development
https://astutecomputer.com/services/digital-transformation
```

---

## Remaining SEO Gaps

1. **Backlinks**: Technical SEO is covered, but off-page SEO (backlinks, social signals) requires marketing efforts
2. **Page Speed**: Consider image compression, code splitting for larger bundles
3. **Mobile-First**: Ensure all new pages are fully responsive (already using Tailwind)
4. **Google Search Console**: After implementation, submit sitemap and monitor indexing



We already have a comprehensive SEO plan drafted. Update it to incorporate the following corrections and additions. Keep it implementation-focused, but do not write code.

A) Case study page headings: enforce in template, not manually in editor

We intentionally do NOT want editors typing markdown headings (H1/H2) in the CMS content field. Instead:

The page template must guarantee semantic structure:

H1 = case study title (already)

H2 sections must always exist in a consistent order:

Client & Context

Problem

Goals / Success Criteria

Solution

Implementation

Results

Next Steps / CTA

The CMS must support content feeding those sections without requiring headings in a rich text field.
Choose one of these approaches (prefer minimal disruption):

Option 1 (recommended): add dedicated fields (rich text) for each section

Option 2: add a “section blocks” array:

sectionType (enum: context/problem/goals/solution/implementation/results/next_steps)

body (rich text)
This ensures the template renders true <h2> headings even if the editor content is freeform.

Update Phase 1 and Phase 2 in the plan accordingly.

B) CMS schema additions / fixes

Make these updates to the database/CMS schema:

Case studies must include:

published_at + optional updated_at

is_published boolean (explicit)

industry (single select)

services (multi-select) — ensure this links to service pages cleanly

tech_stack (tags/array)

results (array of 2–4 result items: label/value/context)

client_type (non-PII)

faqs (optional array for FAQ schema)

related_case_study_ids (uuid[])

Add the missing relationship:

related_service_ids OR related_service_slugs (so every case study can link to relevant service pages)

Ensure slugs are unique and stable.

C) Services pages & “about/contact”: use real URLs (not anchors) for SEO

In the sitemap and internal linking plan, do not include homepage anchors (e.g., /#contact). Instead:

Create real routes: /about, /contact
(They can reuse existing components/sections; minimal content duplication.)

Update sitemap section to include those URLs as actual pages.

D) Internal linking & crawl depth rules

Update the plan to enforce these rules:

Every published case study must be reachable within ≤3 clicks from the homepage.

/case-studies hub must be linked in navbar + footer.

Each service page must link to relevant case studies (“Related Case Studies” section).

Each case study page must link back to at least one service page (“Related Services” section).

Add “Related Case Studies” (2–3) on each case study page.

E) Indexation hygiene

Update plan with explicit rules:

Unpublished case studies/services should return 404/410 or be non-indexable AND not listed in sitemap.

Ensure no accidental noindex on public pages.

Canonical URLs consistent (https + chosen www/non-www + trailing slash policy).

Ensure OpenGraph tags use absolute URLs, and og:image is present per case study.

F) Sitemap + robots.txt requirements

Update the plan to clarify:

/sitemap.xml must include only published pages:

/

/case-studies

/case-studies/{slug}

/services/{slug}

/about

/contact

/robots.txt must include sitemap link and disallow /admin routes.

G) Structured data (schema)

Keep the existing schema plan, but update it to reflect the new structure:

Case study pages: Article or CreativeWork + BreadcrumbList + optional FAQPage

Service pages: Service + BreadcrumbList

Sitewide: Organization (and WebSite if already present)
