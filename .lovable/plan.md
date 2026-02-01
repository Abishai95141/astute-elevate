
# Fix Loading Screen Logo Visibility

## Problem

The logo on the loading screen is black and not visible against the dark background. The current CSS classes are broken:

```tsx
className="h-16 w-auto invert brightness-0 invert"
```

The issue:
- Using `invert` twice cancels itself out (inverts, then inverts back to original black)
- `brightness-0` makes the image completely black

## Solution

Apply a single `invert` filter to flip the black logo to white. We also need to handle the animation filter conflict - the `animate` prop uses a `filter` property which can override Tailwind's filter classes.

## Implementation

### File: `src/components/LoadingScreen.tsx`

**Line 44** - Fix the className and update the animation filter:

Change from:
```tsx
className="h-16 w-auto invert brightness-0 invert"
animate={{
  filter: [
    'brightness(1)',
    'brightness(1.2)',
    'brightness(1)',
  ],
}}
```

To:
```tsx
className="h-16 w-auto"
animate={{
  filter: [
    'invert(1) brightness(1)',
    'invert(1) brightness(1.2)',
    'invert(1) brightness(1)',
  ],
}}
```

This approach:
1. Removes the conflicting Tailwind classes from className
2. Applies `invert(1)` directly in the animation filter values, which inverts black to white
3. Maintains the subtle brightness pulse animation effect

## Summary

| File | Change |
|------|--------|
| `src/components/LoadingScreen.tsx` | Fix filter classes and animation to show white logo |
