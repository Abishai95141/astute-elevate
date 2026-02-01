
# Fix Case Study Text Colors (Not Showing White)

## Problem

The rich text content on case study pages displays with dark/muted colors instead of white text. Looking at the screenshot:
- Headings appear in a dark color (nearly invisible)
- Body text is gray instead of white
- The formatting structure works, but colors are wrong

## Root Cause

The site uses Tailwind's class-based dark mode (`darkMode: ["class"]`), but the `<html>` element doesn't have the `dark` class applied. 

The case study page uses:
```tsx
className="prose prose-lg dark:prose-invert"
```

The `prose-invert` class (which makes text white for dark backgrounds) only activates when `dark:` variant is triggered - but since there's no `.dark` class on the HTML element, it never activates.

The CSS defines dark colors in `:root` by default:
```css
:root {
  --background: 0 0% 4%;    /* Dark background */
  --foreground: 0 0% 98%;   /* Light text */
}
```

But Tailwind Typography doesn't know about these custom CSS variables - it uses its own color system.

## Solution

Two options to fix this:

### Option A: Add `dark` class to HTML (Simple)
Add `class="dark"` to the `<html>` element so `dark:prose-invert` activates.

### Option B: Use `prose-invert` directly (Most Reliable)
Since the site is always dark, remove the `dark:` prefix and just use `prose-invert` directly. This ensures it always applies regardless of the class system.

**I recommend Option B** as it's simpler and doesn't require coordinating between index.html and component classes.

---

## Implementation

### File: `src/pages/CaseStudy.tsx`

Change line 130 from:
```tsx
className="max-w-3xl mx-auto prose prose-lg dark:prose-invert"
```

To:
```tsx
className="max-w-3xl mx-auto prose prose-lg prose-invert"
```

Additionally, customize prose colors to match the monochromatic theme by adding prose color modifiers:

```tsx
className="max-w-3xl mx-auto prose prose-lg prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-foreground"
```

This ensures:
- Headings are white (`text-foreground` = 98% white)
- Body text is readable gray (`text-muted-foreground` = 60% gray - or we can make it lighter)
- Bold text stands out
- Links are visible

---

## Alternative: CSS-based Customization

For more control, add typography customization to `src/index.css`:

```css
@layer components {
  /* Custom prose colors for dark theme */
  .prose-custom {
    --tw-prose-body: hsl(0 0% 75%);
    --tw-prose-headings: hsl(0 0% 98%);
    --tw-prose-lead: hsl(0 0% 70%);
    --tw-prose-links: hsl(0 0% 98%);
    --tw-prose-bold: hsl(0 0% 98%);
    --tw-prose-counters: hsl(0 0% 60%);
    --tw-prose-bullets: hsl(0 0% 50%);
    --tw-prose-hr: hsl(0 0% 25%);
    --tw-prose-quotes: hsl(0 0% 80%);
    --tw-prose-quote-borders: hsl(0 0% 30%);
    --tw-prose-captions: hsl(0 0% 60%);
    --tw-prose-code: hsl(0 0% 98%);
    --tw-prose-pre-code: hsl(0 0% 75%);
    --tw-prose-pre-bg: hsl(0 0% 10%);
    --tw-prose-th-borders: hsl(0 0% 30%);
    --tw-prose-td-borders: hsl(0 0% 20%);
  }
}
```

Then use: `prose prose-lg prose-custom`

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/CaseStudy.tsx` | Change `dark:prose-invert` to `prose-invert` and add color modifiers |
| `src/index.css` (optional) | Add custom `.prose-custom` class for precise color control |

---

## Summary

The fix is simple: since the site is always dark-themed, use `prose-invert` directly instead of `dark:prose-invert`. This will immediately make all text visible with proper light-on-dark colors.
