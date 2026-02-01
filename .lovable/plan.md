
# Update Logo and Remove Invert Filter

## Overview

Replace the logo with the newly uploaded white SVG and remove the `invert` filter from all components since the logo is already white.

## Files to Modify

| File | Change |
|------|--------|
| `src/assets/logo.svg` | Replace with uploaded `logo_svg_no_background-3.svg` |
| `src/components/Navbar.tsx` | Remove `invert` class from logo image (line 65) |
| `src/components/Footer.tsx` | Remove `invert` class from logo image (line 42) |
| `src/components/LoadingScreen.tsx` | Remove `invert` class from logo image (line 44) |

## Implementation Details

### 1. Copy New Logo
Copy `user-uploads://logo_svg_no_background-3.svg` to `src/assets/logo.svg`, replacing the existing file.

### 2. Navbar.tsx
Line 65 - change:
```tsx
className="h-8 w-auto invert"
```
to:
```tsx
className="h-8 w-auto"
```

### 3. Footer.tsx
Line 42 - change:
```tsx
className="h-8 w-auto invert"
```
to:
```tsx
className="h-8 w-auto"
```

### 4. LoadingScreen.tsx
Line 44 - change:
```tsx
className="h-16 w-auto invert"
```
to:
```tsx
className="h-16 w-auto"
```

---

## About GitHub

Updating the GitHub repository avatar/logo must be done manually:
1. Go to your GitHub repository
2. Click on Settings
3. Under "General", find "Repository avatar" section
4. Upload the new logo there

This is outside the codebase and cannot be automated from here.
