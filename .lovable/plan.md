
# Fix: Duplicate Back Button and Admin Login Issues

## Issues Identified

### 1. Two Back Buttons on Case Study Page
There are currently two navigation elements to go back to the portfolio:
- A fixed button in the top-left corner (newly added)
- An inline link inside the hero section content

### 2. Admin Login Stuck in "Signing in..." State
When you load the login page, it shows "Signing in..." with disabled inputs because:
- The auth hook starts with loading=true while checking if you're already logged in
- The form uses that same loading state to disable inputs and show the spinner
- This means you can't type anything until the session check completes

---

## Solution

### Fix 1: Remove Duplicate Back Button
Remove the inline "Back to Portfolio" link from the hero section, keeping only the fixed button in the corner.

**File:** `src/pages/CaseStudy.tsx`
- Delete lines 98-104 (the inline Link element in the hero section)

### Fix 2: Separate Loading States
Add a new state specifically for the sign-in action, so initial auth checking doesn't block the form.

**File:** `src/hooks/useAdminAuth.ts`
- Add a new `isSigningIn` state (starts as `false`)
- Keep `isLoading` for initial auth check only
- Use `isSigningIn` in the `signIn` function instead of `isLoading`

**File:** `src/pages/admin/AdminLogin.tsx`
- Use `isSigningIn` to disable inputs and show spinner
- Use `isLoading` only for initial redirect logic

---

## Technical Details

```text
Current flow:
┌─────────────────────┐
│   Page loads        │
│   isLoading = true  │──► Form disabled, shows "Signing in..."
└─────────────────────┘

Fixed flow:
┌─────────────────────┐
│   Page loads        │
│   isLoading = true  │──► Form enabled, ready to use
│   isSigningIn=false │
└─────────────────────┘
          │
          ▼ (user clicks Sign In)
┌─────────────────────┐
│  isSigningIn = true │──► Form disabled, shows "Signing in..."
└─────────────────────┘
```

### Files to Modify:
1. `src/pages/CaseStudy.tsx` - Remove duplicate back link
2. `src/hooks/useAdminAuth.ts` - Add `isSigningIn` state
3. `src/pages/admin/AdminLogin.tsx` - Use `isSigningIn` for form state
