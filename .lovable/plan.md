

# UI Refinements & Sector Problems Section

This plan covers the requested changes to improve the landing page layout and add a new "Sector Problems" section with premium aesthetics.

---

## Changes Overview

### 1. Hero Section - Scroll Indicator Repositioning
Move the scroll indicator to the absolute bottom of the viewport screen, outside of the main content div so it stays fixed at the bottom regardless of content size.

**Current Issue:** The scroll indicator is inside the content container with `absolute bottom-8`, making it relative to the content area rather than the full viewport.

**Fix:** 
- Move the scroll indicator outside of the `motion.div` content wrapper
- Position it relative to the section itself using fixed bottom positioning
- Ensure it remains visible at the very bottom of the hero viewport

---

### 2. Portfolio Section - Header & Navigation Arrows

**Remove subtitle text:**
- Delete the paragraph "Real results from real projects. See how we've helped businesses transform."

**Add aesthetic navigation arrows:**
- Create left/right arrow buttons with animated hover effects
- Position them elegantly (either beside the header or below the carousel)
- Add smooth pulsing/bouncing animation to indicate scrollability
- Implement click handlers to scroll the carousel horizontally

**Arrow Design:**
- Minimal circular buttons with chevron icons
- Subtle glow effect on hover
- Connected by a thin animated line

---

### 3. About Section - Quote Formatting Fix

**Issue:** The typewriter text may have word wrapping issues causing the quote to appear misaligned.

**Fix:**
- Wrap the quote text properly with correct container styling
- Ensure the quotation marks are positioned correctly
- Add proper text centering and line-height adjustments

---

### 4. About Section - Complete Refactor

**Remove:**
- "Our Journey" timeline section entirely
- Timeline data array

**Keep:**
- Header section with "We Build Digital Excellence"
- Mission statement with typewriter effect (with fixed formatting)
- Values grid (4 cards)

**Enhance:**
- More minimal, cleaner layout
- Better spacing and visual hierarchy
- Refined animations

---

### 5. NEW: Sector Problems Section

Create a visually striking section showcasing industry sectors and the problems Astute Computer solves.

**Design Concept:**
A grid-based layout with animated cards representing different industry sectors and their common challenges.

**Sectors to Include:**
| Sector | Problem Focus |
|--------|--------------|
| Healthcare | Legacy systems, paper records, compliance |
| Legal | Document chaos, slow retrieval, security |
| Manufacturing | Outdated processes, manual tracking |
| Finance | Data silos, reporting delays, compliance |
| Retail | Inventory chaos, disconnected channels |
| Education | Administrative burden, outdated platforms |

**Visual Features:**
- Asymmetric bento-grid layout
- Each card has a subtle animated icon
- Hover reveals the solution approach
- Animated connecting lines between cards
- Background with subtle animated grid pattern

**Animations:**
- Staggered card entrance on scroll
- Cards have subtle floating/breathing animation
- Hover state: card lifts with glow effect
- Icons animate on hover (subtle pulse)

---

## Technical Implementation

### Files to Modify:
1. `src/components/Hero.tsx` - Reposition scroll indicator
2. `src/components/Portfolio.tsx` - Remove subtitle, add navigation arrows
3. `src/components/About.tsx` - Fix quote, remove timeline, enhance aesthetics
4. `src/pages/Index.tsx` - Add SectorProblems component

### New Files:
1. `src/components/SectorProblems.tsx` - New section component

---

## Section Structure After Changes

```text
+------------------+
|      Hero        |  <- Scroll indicator at absolute bottom
+------------------+
|     Services     |
+------------------+
|    Portfolio     |  <- No subtitle, aesthetic arrow navigation
+------------------+
|      About       |  <- Cleaner, no timeline
+------------------+
| Sector Problems  |  <- NEW: Bento grid with industry focus
+------------------+
|     Contact      |
+------------------+
|      Footer      |
+------------------+
```

---

## Sector Problems Grid Layout

```text
+----------------+--------+--------+
|   Healthcare   |  Legal | Manu-  |
|   (large)      |        | fact.  |
+----------------+--------+--------+
| Finance | Retail  |  Education   |
|         |         |   (large)    |
+---------+---------+--------------+
```

The bento grid will use varying card sizes for visual interest, with larger cards for primary sectors.

