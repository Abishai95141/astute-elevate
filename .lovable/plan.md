
# Fix Industry Page UI Issues

## Problem Summary

The industry pages have several UI bugs, most notably the "black box" buttons in the hero section shown in the screenshot. This plan addresses all identified issues.

---

## Issue 1: Black Box Buttons (Critical)

### Root Cause
In `IndustryPage.tsx`, the `MagneticButton` component wraps `Button` components. However, `MagneticButton` is designed to be a standalone button with its own styling:

```tsx
// MagneticButton already has full button styling:
'bg-foreground text-background' (primary)
'bg-transparent border-2 border-foreground/30' (secondary)
```

When you nest a `Button` with `variant="outline"` inside, you get:
- MagneticButton's container styles
- Button's `bg-background` (very dark) overlaid
- Text color conflicts creating an invisible "black box"

### Solution
Remove the nested `Button` components and use `MagneticButton` correctly (as done in `Hero.tsx`):

**Current (broken):**
```tsx
<MagneticButton>
  <Button variant="outline" size="lg">
    Explore Solutions
  </Button>
</MagneticButton>
```

**Fixed:**
```tsx
<MagneticButton 
  variant="secondary" 
  onClick={() => document.getElementById('problems')?.scrollIntoView({ behavior: 'smooth' })}
>
  Explore Solutions
</MagneticButton>
```

---

## Issue 2: Missing `relative` on Problem Cards

### Root Cause
The corner accent uses `absolute` positioning but the parent card lacks `position: relative`, causing the accent to be positioned relative to the wrong ancestor.

### Solution
Add `relative` class to the problem card container:

```tsx
// Line 309 - Add 'relative' class
className="group relative p-6 sm:p-8 rounded-2xl bg-card/50..."
```

---

## Issue 3: AnimatedCounter Suffix Handling

### Root Cause
The counter logic doesn't properly combine the numeric value with its suffix when animating.

### Solution
Improve the logic to correctly display suffixes:

```tsx
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const hasX = value.includes('x');
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  
  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {hasX ? value : `${prefix}${numericValue}${suffix}`}
        </motion.span>
      ) : '0'}
    </span>
  );
}
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/IndustryPage.tsx` | Fix button usage, add relative to cards, improve counter |

---

## Technical Changes Summary

### Hero CTA Buttons (Lines 243-265)
Replace nested `Button` components with proper `MagneticButton` usage matching `Hero.tsx` pattern.

### CTA Section Button (Lines 531-540)
Same fix - use `MagneticButton` with `variant="primary"` directly.

### Problem Cards (Line 309)
Add `relative` class to enable proper absolute positioning of corner accents.

### AnimatedCounter Component (Lines 15-34)
Improve suffix handling logic for edge cases.

---

## Before vs After

| Element | Before | After |
|---------|--------|-------|
| "Start Your Project" button | White button with nested styles | Clean primary MagneticButton |
| "Explore Solutions" button | Black box (invisible text) | Clean secondary MagneticButton with visible border |
| Corner accents on cards | Positioned incorrectly | Properly positioned relative to card |
| Stats counters | Suffix display issues | Correct suffix rendering |
