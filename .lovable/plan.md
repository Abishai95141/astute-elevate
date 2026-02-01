
# Fix Rich Text Formatting and Admin Login

## Overview

There are two issues to fix:
1. **Rich text formatting** from CMS not displaying properly on the website
2. **Sign-in failing** with "An error occurred during sign in"

---

## Issue 1: Rich Text Formatting Not Showing

### Problem

The case study page uses Tailwind's `prose` classes for styling rich text content:

```tsx
className="max-w-3xl mx-auto prose prose-lg dark:prose-invert"
```

However, these classes require the **@tailwindcss/typography plugin** to be registered in the Tailwind config. While the package is installed as a dev dependency, it's not added to the plugins array.

### Solution

Add the typography plugin to `tailwind.config.ts`:

```typescript
plugins: [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography"),  // Add this
],
```

### Files to Modify

| File | Change |
|------|--------|
| `tailwind.config.ts` | Add typography plugin to plugins array |

---

## Issue 2: Sign-In Not Working

### Problem Analysis

From the auth logs:
- Authentication itself succeeds (status 200, user logged in)
- User has `admin` role in `user_roles` table
- But sign-in still fails with generic error

The issue is in the `signIn` function's catch block - it catches all errors silently and returns a generic message. The actual error could be:
1. Network issue when checking roles
2. The role check returning empty data (treated as no roles)
3. Some other runtime error

### Current Code Problem

```typescript
const signIn = async (email: string, password: string): Promise<SignInResult> => {
  try {
    // ... auth code
  } catch {
    // This catches ALL errors without logging
    return { success: false, error: 'An error occurred during sign in' };
  }
};
```

### Solution

1. Add proper error logging to the catch block
2. Add more defensive checks in the role verification
3. Ensure `isSubmitting` state is reset properly on all error paths

### Files to Modify

| File | Change |
|------|--------|
| `src/hooks/useAdminAuth.ts` | Add console.error for debugging, improve error handling |
| `src/pages/admin/AdminLogin.tsx` | Ensure `isSubmitting` is always reset on errors |

---

## Technical Implementation

### 1. tailwind.config.ts

```typescript
plugins: [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography"),
],
```

### 2. useAdminAuth.ts - Improved Error Handling

```typescript
const signIn = async (email: string, password: string): Promise<SignInResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Auth error:', error);
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'Sign in failed - no user returned' };
    }

    // Check roles with better error handling
    let roles: { isAdmin: boolean; isEditor: boolean };
    try {
      roles = await checkUserRole(data.user.id);
    } catch (roleError) {
      console.error('Role check error:', roleError);
      // Sign out since we can't verify permissions
      await supabase.auth.signOut();
      return { success: false, error: 'Unable to verify permissions. Please try again.' };
    }

    if (!roles.isAdmin && !roles.isEditor) {
      await supabase.auth.signOut();
      return { success: false, error: 'You do not have permission to access the admin area.' };
    }

    // Update state
    setState({
      user: data.user,
      session: data.session,
      isAdmin: roles.isAdmin,
      isEditor: roles.isEditor,
      isInitializing: false,
    });

    return { success: true };
  } catch (err) {
    console.error('Sign in error:', err);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
};
```

### 3. AdminLogin.tsx - Ensure isSubmitting Reset

The current code doesn't reset `isSubmitting` in all paths. Add a finally block or ensure reset on all error paths:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  if (!email || !password) {
    setError('Please enter email and password');
    return;
  }

  setIsSubmitting(true);

  try {
    const result = await signIn(email, password);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.error || 'Sign in failed');
    }
  } catch {
    setError('An unexpected error occurred');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Summary

| Issue | Root Cause | Fix |
|-------|------------|-----|
| Rich text formatting | Typography plugin not registered | Add `require("@tailwindcss/typography")` to plugins |
| Sign-in error | Silent error catching, no debugging info | Add error logging and improve error messages |

After these changes:
- Bold text, headings, lists, and other formatting will display correctly on case study pages
- Sign-in errors will be logged to console for debugging
- Error messages will be more helpful to identify the actual issue
