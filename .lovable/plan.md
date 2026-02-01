

# Comprehensive Case Studies CMS Plan

This plan creates a full-featured Content Management System for case studies with a rich text editor, image uploads, and dynamic frontend integration.

---

## Overview

The current case studies are hardcoded in `Portfolio.tsx`. We'll transform this into a dynamic, database-driven system with:

- **Admin Dashboard**: Protected CMS interface for managing case studies
- **Rich Text Editor**: TipTap-based editor with formatting, headings, lists, and inline images
- **Media Management**: Image uploads for thumbnails and content images via storage
- **Dynamic Frontend**: Portfolio section pulling from database
- **Individual Case Study Pages**: Full page view when clicking a case study

---

## Architecture Overview

```text
+------------------------------------------+
|           ADMIN DASHBOARD                |
|  /admin/case-studies                     |
|  +------------------------------------+  |
|  |  Case Study List                   |  |
|  |  [+ New] [Edit] [Delete] [Publish] |  |
|  +------------------------------------+  |
|  |  Rich Text Editor                  |  |
|  |  - Thumbnail upload                |  |
|  |  - Title, Category, Description    |  |
|  |  - Stats (metric + value)          |  |
|  |  - Full content (TipTap editor)    |  |
|  |  - Gallery images                  |  |
|  |  - SEO meta fields                 |  |
|  +------------------------------------+  |
+------------------------------------------+

+------------------------------------------+
|           PUBLIC FRONTEND                |
|  /                                       |
|  +------------------------------------+  |
|  |  Portfolio Section (carousel)      |  |
|  |  - Pulls from database             |  |
|  |  - Shows published case studies    |  |
|  |  - Click to view full page         |  |
|  +------------------------------------+  |
|                                          |
|  /case-studies/:slug                     |
|  +------------------------------------+  |
|  |  Full Case Study Page              |  |
|  |  - Hero with thumbnail             |  |
|  |  - Rich content rendered           |  |
|  |  - Image gallery                   |  |
|  |  - Related case studies            |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

## 1. Database Schema

### 1.1 Case Studies Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Case study title |
| slug | text | URL-friendly identifier (unique) |
| category | text | Service category |
| short_description | text | Brief description for cards |
| thumbnail_url | text | Main image URL |
| thumbnail_alt | text | Alt text for accessibility |
| stat_value | text | e.g., "150%", "10M+" |
| stat_metric | text | e.g., "Brand Recognition" |
| content | jsonb | TipTap JSON content |
| is_published | boolean | Visibility toggle |
| published_at | timestamp | When published |
| meta_title | text | SEO title |
| meta_description | text | SEO description |
| display_order | integer | Sorting order |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last modified |

### 1.2 Case Study Images Table (Gallery)

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| case_study_id | uuid | Foreign key to case_studies |
| image_url | text | Storage URL |
| alt_text | text | Accessibility text |
| caption | text | Optional caption |
| display_order | integer | Gallery ordering |
| created_at | timestamp | Upload date |

### 1.3 User Roles Table (for admin access)

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References auth.users |
| role | app_role enum | 'admin', 'editor', 'user' |

### 1.4 Storage Bucket

Create a `case-studies` storage bucket for:
- Thumbnail images
- Gallery images
- Inline content images

---

## 2. Authentication & Authorization

### 2.1 Admin Role System

- Create `app_role` enum with values: 'admin', 'editor', 'user'
- Create `user_roles` table linking users to roles
- Create `has_role()` security definer function for RLS policies

### 2.2 RLS Policies

**case_studies table:**
- Public SELECT for published items (`is_published = true`)
- Admin/Editor INSERT, UPDATE, DELETE

**case_study_images table:**
- Public SELECT for images linked to published case studies
- Admin/Editor INSERT, UPDATE, DELETE

**Storage policies:**
- Public read access
- Admin/Editor write access

---

## 3. Admin Interface Components

### 3.1 New Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| /admin | AdminLayout | Admin shell with sidebar |
| /admin/login | AdminLogin | Admin authentication |
| /admin/case-studies | CaseStudyList | List all case studies |
| /admin/case-studies/new | CaseStudyEditor | Create new |
| /admin/case-studies/:id | CaseStudyEditor | Edit existing |

### 3.2 CMS Dashboard Layout

```text
+------------------------------------------+
|  LOGO          Case Studies  |  Logout   |
+------------------------------------------+
|         |                                |
|  NAV    |    CONTENT AREA                |
|         |                                |
| Studies |    [Breadcrumb: All > Edit]    |
| Media   |                                |
| Settings|    +------------------------+  |
|         |    |  Form/Editor Area      |  |
|         |    +------------------------+  |
+------------------------------------------+
```

### 3.3 Case Study Editor Form

**Thumbnail Section:**
- Image upload dropzone
- Preview thumbnail
- Alt text input

**Basic Info Section:**
- Title (text input)
- Slug (auto-generated, editable)
- Category (dropdown: Digital Branding, Operations, AI Archives, Software Dev)
- Short Description (textarea, max 160 chars)
- Stat Value (text input)
- Stat Metric (text input)

**Content Section (Rich Text Editor):**
- TipTap editor with toolbar
- Formatting: Bold, Italic, Underline, Strike
- Headings: H2, H3, H4
- Lists: Bullet, Numbered
- Blockquotes
- Code blocks
- Links
- Image upload (inline)
- Horizontal rule

**Gallery Section:**
- Drag-and-drop image uploads
- Reorder gallery images
- Alt text and caption per image
- Delete images

**SEO Section:**
- Meta Title
- Meta Description
- OG Image (uses thumbnail by default)

**Publishing Section:**
- Status toggle (Draft/Published)
- Display order (number input)
- Save Draft / Publish buttons

---

## 4. Rich Text Editor (TipTap)

### 4.1 Editor Configuration

```text
TipTap Extensions:
+------------------------------------------+
| StarterKit (basic formatting)            |
| Heading (levels: 2, 3, 4)                |
| Image (with upload handler)              |
| Link (with URL validation)               |
| Placeholder ("Start writing...")         |
| TextAlign (left, center, right)          |
| Underline                                |
| TextStyle + Color                        |
+------------------------------------------+
```

### 4.2 Image Upload in Editor

When user adds an image:
1. Open file picker or drag-drop
2. Upload to storage bucket
3. Get public URL
4. Insert image node with URL

### 4.3 Content Storage

Store as TipTap JSON format in `content` column:
```json
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "The Challenge" }]
    },
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "..." }]
    }
  ]
}
```

---

## 5. Frontend Integration

### 5.1 Update Portfolio Component

Modify `Portfolio.tsx` to:
- Fetch published case studies from database
- Use React Query for data fetching
- Fallback to skeleton loading state
- Link cards to individual case study pages

### 5.2 Case Study Detail Page

**Route:** `/case-studies/:slug`

**Layout:**
```text
+------------------------------------------+
|  NAVBAR                                  |
+------------------------------------------+
|                                          |
|  [HERO - Full width thumbnail]           |
|  Category badge                          |
|  Title (H1)                              |
|  Stats display                           |
|                                          |
+------------------------------------------+
|                                          |
|  [Content Area - max-w-3xl centered]     |
|  - Rendered TipTap content               |
|  - Inline images                         |
|  - Proper typography                     |
|                                          |
+------------------------------------------+
|                                          |
|  [Image Gallery - Grid]                  |
|  - Lightbox on click                     |
|                                          |
+------------------------------------------+
|                                          |
|  [Related Case Studies]                  |
|  - 3 cards from same category            |
|                                          |
+------------------------------------------+
|  FOOTER                                  |
+------------------------------------------+
```

### 5.3 Content Renderer

Create a component to render TipTap JSON to React:
- Parse JSON structure
- Map node types to styled components
- Handle images, headings, lists, etc.

---

## 6. File Structure

### New Files to Create:

```text
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── CaseStudyEditor.tsx
│   │   ├── CaseStudyForm.tsx
│   │   ├── CaseStudyList.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── RichTextEditor.tsx
│   │   ├── GalleryManager.tsx
│   │   └── EditorToolbar.tsx
│   └── case-study/
│       ├── CaseStudyCard.tsx
│       ├── CaseStudyHero.tsx
│       ├── CaseStudyContent.tsx
│       ├── CaseStudyGallery.tsx
│       ├── RelatedCaseStudies.tsx
│       └── ContentRenderer.tsx
├── hooks/
│   ├── useCaseStudies.ts
│   ├── useCaseStudy.ts
│   ├── useAdminAuth.ts
│   └── useImageUpload.ts
├── pages/
│   ├── admin/
│   │   ├── AdminLogin.tsx
│   │   ├── CaseStudies.tsx
│   │   └── CaseStudyEdit.tsx
│   └── CaseStudy.tsx
└── lib/
    └── tiptap-config.ts
```

### Files to Modify:

| File | Changes |
|------|---------|
| `src/App.tsx` | Add new routes for admin and case study pages |
| `src/components/Portfolio.tsx` | Fetch from database, link to detail pages |
| `package.json` | Add TipTap dependencies |

---

## 7. Dependencies to Add

```json
{
  "@tiptap/react": "^2.1.0",
  "@tiptap/starter-kit": "^2.1.0",
  "@tiptap/extension-image": "^2.1.0",
  "@tiptap/extension-link": "^2.1.0",
  "@tiptap/extension-placeholder": "^2.1.0",
  "@tiptap/extension-text-align": "^2.1.0",
  "@tiptap/extension-underline": "^2.1.0"
}
```

---

## 8. Implementation Phases

### Phase 1: Database & Storage Setup
1. Create `case_studies` table with all columns
2. Create `case_study_images` table
3. Create `user_roles` table with enum
4. Create `case-studies` storage bucket
5. Set up RLS policies
6. Create `has_role()` function

### Phase 2: Authentication
1. Create admin login page
2. Implement `useAdminAuth` hook
3. Create protected route wrapper
4. Add initial admin user

### Phase 3: Admin CMS Interface
1. Create admin layout with sidebar
2. Build case study list view
3. Create case study editor with form
4. Implement image upload components
5. Build rich text editor with TipTap
6. Add gallery management

### Phase 4: Frontend Integration
1. Update Portfolio component to fetch from DB
2. Create case study detail page
3. Build content renderer for TipTap JSON
4. Add image gallery with lightbox
5. Implement related case studies section

### Phase 5: Polish & SEO
1. Add loading states and skeletons
2. Implement error handling
3. Add SEO meta tags to case study pages
4. Update sitemap to include case study URLs
5. Add image optimization

---

## 9. Security Considerations

- Admin routes protected by authentication
- Role-based access using `user_roles` table
- RLS policies for all database operations
- Storage bucket policies for uploads
- Input validation on all form fields
- Slug sanitization for URL safety

---

## 10. UX Features

- **Auto-save**: Draft saves every 30 seconds
- **Unsaved changes warning**: Prompt before leaving with changes
- **Image optimization**: Resize on upload
- **Drag-and-drop**: For gallery reordering
- **Preview mode**: See rendered content before publishing
- **Bulk actions**: Publish/unpublish multiple case studies

