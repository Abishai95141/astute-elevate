
# Industry Pages with Premium Animations

## Overview

This plan covers two requirements:
1. Fix `vercel.json` to add `/case-studies` (hub route without path parameter)
2. Create dedicated industry pages with stunning animations and aesthetic grid layouts

---

## Part 1: Vercel Configuration Fix

### Update `vercel.json`

Add the `/case-studies` route (without `:path*`) to enable direct access to the hub page:

```json
{
  "rewrites": [
    { "source": "/case-studies", "destination": "/" },
    { "source": "/case-studies/:path*", "destination": "/" },
    { "source": "/services/:path*", "destination": "/" },
    { "source": "/industries/:path*", "destination": "/" },
    { "source": "/about", "destination": "/" },
    { "source": "/contact", "destination": "/" }
  ]
}
```

---

## Part 2: Industry Pages Architecture

### Industries to Create

Based on the existing `SectorProblems` component, we'll create pages for:

| Industry | Slug | Icon |
|----------|------|------|
| Healthcare | `/industries/healthcare` | Stethoscope |
| Legal | `/industries/legal` | Scale |
| Manufacturing | `/industries/manufacturing` | Factory |
| Finance | `/industries/finance` | TrendingUp |
| Retail | `/industries/retail` | ShoppingCart |
| Education | `/industries/education` | GraduationCap |

---

## Part 3: Page Design & Animations

### Hero Section
- Large animated icon with floating effect
- Staggered word-by-word title reveal (like main Hero)
- Animated gradient orbs in background
- Scroll-linked blur and parallax

### Problem Section
- Bento grid layout showcasing industry pain points
- Cards with hover lift effects and glow
- Staggered entrance animations
- Floating accent lines

### Solution Section
- Full-width cards with 3D perspective tilt on hover
- Animated check marks for features
- Gradient borders with subtle animation

### Case Studies Grid
- Masonry-style layout filtered by industry
- Card hover reveals with scale and shadow
- Image zoom on hover
- Stats counter animation when in view

### CTA Section
- Magnetic button effect
- Background particle animation
- Text gradient shimmer effect

---

## Part 4: Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `vercel.json` | Modify | Add `/case-studies` and `/industries/:path*` rewrites |
| `src/pages/IndustryPage.tsx` | Create | Dynamic industry page component |
| `src/lib/industries.ts` | Create | Industry data configuration |
| `src/hooks/useCaseStudiesByIndustry.ts` | Create | Hook to fetch case studies by industry |
| `src/App.tsx` | Modify | Add `/industries/:slug` route |
| `src/components/SectorProblems.tsx` | Modify | Link cards to industry pages |
| `public/sitemap.xml` | Modify | Add industry page URLs |

---

## Part 5: Animation Techniques

### Scroll-Linked Effects
- Parallax depth layers
- Opacity fade on scroll
- Scale transformations
- Blur effects for cinematic feel

### Entrance Animations
- Staggered fade-up for grid items
- Word-by-word text reveals
- Icon bounce and float
- Counter animations for stats

### Hover Interactions
- 3D card tilt with perspective
- Magnetic button effects
- Glow intensification
- Image scale with overflow hidden

### Background Effects
- Animated gradient orbs
- Grid pattern with subtle movement
- Floating particles (reuse FloatingGrid pattern)
- Noise texture overlay

---

## Part 6: Component Structure

```text
IndustryPage
├── Hero Section
│   ├── Animated Icon (floating)
│   ├── Title (staggered word reveal)
│   ├── Description
│   └── CTA Buttons (magnetic)
├── Problems Section
│   ├── Section Header
│   └── Bento Grid (pain points)
├── Solutions Section
│   ├── Section Header
│   └── Feature Cards (3D tilt)
├── Case Studies Section
│   ├── Section Header
│   └── Masonry Grid (filtered)
├── Stats Section
│   └── Counter Cards
└── CTA Section
    └── Contact CTA
```

---

## Part 7: Data Flow

1. `IndustryPage` receives slug from URL params
2. Looks up industry config from `src/lib/industries.ts`
3. Fetches related case studies via `useCaseStudiesByIndustry` hook
4. Renders page with industry-specific content and filtered case studies

---

## Part 8: SEO Integration

- Dynamic meta title/description per industry
- Breadcrumb schema (Home > Industries > {Industry})
- Industry-specific structured data
- Canonical URLs without trailing slashes
