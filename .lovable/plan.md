

# Fix Blurry Hero Section After Navigation

## Problem Summary

When navigating away from the home page and returning (or randomly), the hero section appears extremely blurry. The screenshot shows heavy blur on text, buttons, and the 3D grid background - everything looks like it has a 10+ pixel blur filter applied.

---

## Root Cause Analysis

### Issue 1: Scroll-Linked Blur Not Resetting

In `Hero.tsx`, the blur effect is controlled by scroll position:

```tsx
const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
// ...
style={{ filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none' }}
```

**The Problem**: When navigating back to the home page:
1. The page may retain scroll position OR
2. The `useTransform` hook maintains stale values from the previous visit
3. The `blur.get()` call in the style prop reads a stale value that doesn't update reactively

### Issue 2: Incorrect Filter Application

The current implementation uses `blur.get()` inside the style object, which:
- Only evaluates once during render
- Does NOT reactively update as `blur` motion value changes
- Can capture an intermediate/stale blur value

### Issue 3: WebGL Context Loss

Console shows: `THREE.WebGLRenderer: Context Lost`

This happens when:
1. Navigating away unmounts the Canvas
2. Returning remounts it but WebGL context isn't properly restored
3. The 3D grid may render incorrectly or not at all

### Issue 4: React Ref Warnings

Console warnings about function components not accepting refs for:
- `AnimatedCounter`
- `MagneticButton`  
- `Footer`

These warnings indicate ref forwarding issues that could cause component lifecycle problems.

---

## Solution Plan

### Fix 1: Reactive Blur Filter in Hero.tsx

Replace the static `blur.get()` call with proper motion value binding:

```tsx
// Current (broken):
style={{ 
  opacity, 
  y, 
  filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none' 
}}

// Fixed (reactive):
// Option A: Use useMotionTemplate for reactive string interpolation
const blurFilter = useMotionTemplate`blur(${blur}px)`;

// Then in JSX:
style={{ 
  opacity, 
  y, 
  filter: blurFilter 
}}
```

Alternatively, transform blur to a string motion value:

```tsx
const blurFilter = useTransform(blur, (value) => 
  value > 0 ? `blur(${value}px)` : 'none'
);
```

### Fix 2: Reset Scroll Position on Mount

Add explicit scroll reset when Index component mounts:

```tsx
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
```

### Fix 3: Handle WebGL Context Restoration

In `FloatingGrid.tsx`, add proper context loss handling:

```tsx
<Canvas
  // ... existing props
  onCreated={({ gl }) => {
    // Handle context restoration
    gl.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
    }, false);
    gl.domElement.addEventListener('webglcontextrestored', () => {
      // Force re-render
    }, false);
  }}
>
```

Or simpler - add a key that forces remount:

```tsx
// In Index.tsx, add key based on route
<Hero key={location.key} />
```

### Fix 4: Add forwardRef to Components with Ref Warnings

For `AnimatedCounter` (local to IndustryPage), wrap in forwardRef or remove ref usage.

For `MagneticButton` and `Footer`, they're function components being passed to motion elements - need to ensure proper ref forwarding.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Hero.tsx` | Fix blur filter to be reactive; add useMotionTemplate or useTransform |
| `src/pages/Index.tsx` | Add scroll reset on mount; potentially add key to Hero for remounting |
| `src/components/FloatingGrid.tsx` | Add WebGL context loss handling |
| `src/pages/IndustryPage.tsx` | Fix AnimatedCounter ref warning |
| `src/components/MagneticButton.tsx` | Add forwardRef if needed |

---

## Technical Changes Detail

### Hero.tsx Changes

```tsx
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// Inside component:
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start start', 'end start'],
});

const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
const blurFilter = useMotionTemplate`blur(${blurValue}px)`;

// In JSX - use motion values directly:
<motion.div
  style={{ opacity, y, filter: blurFilter }}
  className="relative z-10 container-custom text-center px-4"
>
```

### Index.tsx Changes

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);
  
  // ... rest unchanged
};
```

### FloatingGrid.tsx Changes

```tsx
export function FloatingGrid() {
  const [contextLost, setContextLost] = useState(false);
  
  return (
    <div className="absolute inset-0 z-0">
      {!contextLost && (
        <Canvas
          key={contextLost ? 'lost' : 'active'}
          camera={{ position: [0, 0, 20], fov: 60 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            canvas.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              setContextLost(true);
            });
            canvas.addEventListener('webglcontextrestored', () => {
              setContextLost(false);
            });
          }}
        >
          <Scene />
        </Canvas>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
}
```

---

## Before vs After

| Issue | Before | After |
|-------|--------|-------|
| Blur filter | Static value from `blur.get()` | Reactive motion value via `useMotionTemplate` |
| Scroll position | May retain stale position | Explicitly reset on mount |
| WebGL context | Crashes on context loss | Graceful degradation with recovery |
| Ref warnings | Console errors | Proper ref handling |

---

## Testing Checklist

After implementation:
1. Navigate to an industry page
2. Click back to home
3. Verify hero is NOT blurry
4. Scroll down, then scroll back up - verify blur transitions smoothly
5. Check console for no ref warnings
6. Verify 3D grid renders correctly after multiple navigations

