

# Restore Normal Cursor and Add Scroll Snapping

This plan covers removing the custom animated cursor and implementing smooth scroll snapping between sections for a premium navigation experience.

---

## 1. Remove Custom Cursor

### Changes Required:

**Remove CustomCursor component from Index.tsx:**
- Remove the `<CustomCursor />` component from the page
- Remove the import statement for CustomCursor

**Delete or leave the CustomCursor.tsx file:**
- The file can remain in the codebase (unused) or be deleted
- I'll simply remove it from rendering

---

## 2. Add Smooth Scroll Snapping

Scroll snapping creates a "magnetic" effect where the viewport snaps to section boundaries when scrolling pauses, providing a polished, premium feel.

### Implementation Strategy:

**Update src/index.css:**
- Add `scroll-snap-type: y mandatory` to the html element for vertical snap scrolling
- Use `mandatory` for a stronger snap effect (user must commit to scroll direction)

**Update each section component:**
Each major section needs `scroll-snap-align: start` to define snap points:

| Section | File | Snap Configuration |
|---------|------|-------------------|
| Hero | Hero.tsx | `scroll-snap-align: start` |
| Services | Services.tsx | `scroll-snap-align: start` |
| Portfolio | Portfolio.tsx | `scroll-snap-align: start` |
| About | About.tsx | `scroll-snap-align: start` |
| Sector Problems | SectorProblems.tsx | `scroll-snap-align: start` |
| Contact | Contact.tsx | `scroll-snap-align: start` |
| Footer | Footer.tsx | `scroll-snap-align: start` |

### CSS Implementation:

```css
/* In src/index.css */
html {
  scroll-snap-type: y proximity; /* 'proximity' is gentler than 'mandatory' */
  scroll-behavior: smooth;
}

/* Utility class for snap sections */
.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}
```

### Mobile Considerations:
- Scroll snapping works well on both desktop and mobile
- The `proximity` option ensures the snap only activates when close to a section boundary (less aggressive than `mandatory`)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Remove CustomCursor import and component |
| `src/index.css` | Add scroll-snap-type to html, create snap-section utility |
| `src/components/Hero.tsx` | Add snap-section class to section element |
| `src/components/Services.tsx` | Add snap-section class to section element |
| `src/components/Portfolio.tsx` | Add snap-section class to section element |
| `src/components/About.tsx` | Add snap-section class to section element |
| `src/components/SectorProblems.tsx` | Add snap-section class to section element |
| `src/components/Contact.tsx` | Add snap-section class to section element |
| `src/components/Footer.tsx` | Add snap-section class to footer element |

---

## Visual Behavior After Changes

```text
Scroll Behavior:
+------------------+
|      HERO        | <- snap point (start)
|                  |
+------------------+
      ↓ scroll
+------------------+
|    SERVICES      | <- snap point (start)
|                  |
+------------------+
      ↓ scroll
+------------------+
|    PORTFOLIO     | <- snap point (start)
|                  |
+------------------+
      ...etc

When user scrolls:
1. Page scrolls normally
2. When scroll pauses near a section boundary
3. Page smoothly snaps to the nearest section start
4. Creates a "presentation slide" feel
```

---

## Technical Notes

- Using `proximity` instead of `mandatory` for a less jarring experience
- Each section maintains its existing min-height
- Smooth scroll behavior is already set in index.css
- Normal cursor will be restored (system default)

