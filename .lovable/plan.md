
# Rebuild Admin Login System

## Problem Analysis

The current implementation has a fundamental issue: the `useAdminAuth` hook creates isolated state instances in each component. When you:
1. Click "Sign In" on the login page
2. The `signIn` function succeeds and updates state in the login page's hook instance
3. Navigation to `/admin` triggers `AdminLayout` to mount
4. `AdminLayout` creates a NEW instance of `useAdminAuth` with fresh state (`isLoading: true`)
5. This new instance starts checking `getSession()` again
6. Meanwhile, the login page may still show "Signing in..." if render timing is off

Additionally, there's complexity from having async role checking inside `onAuthStateChange` which can cause race conditions.

## Solution: Simplified Auth Architecture

Rebuild the login system with a cleaner, more predictable flow:

1. **Simplify the auth hook** - Remove async operations from `onAuthStateChange` callback
2. **Use refs for navigation** - Avoid state-based navigation that can race
3. **Separate concerns** - Auth checking vs. sign-in action

---

## Implementation Plan

### 1. Rewrite `src/hooks/useAdminAuth.ts`

Create a cleaner implementation with:
- Synchronous `onAuthStateChange` callback (defer role check)
- Explicit loading states that don't conflict
- A dedicated `checkRoles` function that can be called after auth state is known

```typescript
// Key changes:
// 1. Don't await inside onAuthStateChange - use setTimeout to defer
// 2. Track "initializing" separately from "signing in"
// 3. Return clear success/failure from signIn
```

### 2. Rewrite `src/pages/admin/AdminLogin.tsx`

Simplify to:
- Local form state only (email, password, submitting, error)
- Simple async submit handler that navigates on success
- No useEffect-based redirects (they cause timing issues)
- Check if already logged in once on mount, redirect if so

```typescript
// Key changes:
// 1. Use local isSubmitting state instead of hook's isSigningIn
// 2. Navigate immediately after signIn returns success
// 3. Single useEffect for initial redirect check only
```

### 3. Keep `AdminLayout` simple

The layout should continue to:
- Show loading spinner during initial auth check
- Redirect to login if not authenticated
- Render children if authenticated

---

## Technical Details

### New `useAdminAuth.ts` Structure

```typescript
interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isEditor: boolean;
  isInitializing: boolean;  // Initial session check
  error: string | null;
}

// Key improvements:
// 1. onAuthStateChange sets user/session immediately, then checks roles
// 2. signIn function is self-contained - returns { success, error }
// 3. No external loading state for sign-in (handled in component)
```

### New `AdminLogin.tsx` Structure

```typescript
export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAdmin, isEditor, isInitializing, signIn } = useAdminAuth();
  const navigate = useNavigate();

  // Single effect: redirect if already logged in
  useEffect(() => {
    if (!isInitializing && user && (isAdmin || isEditor)) {
      navigate('/admin', { replace: true });
    }
  }, [isInitializing, user, isAdmin, isEditor, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn(email, password);
    
    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.error || 'Sign in failed');
      setIsSubmitting(false);
    }
  };

  // Show loading only during initial check, not during form interaction
  if (isInitializing) {
    return <LoadingSpinner />;
  }

  // Form is always interactive once initialized
  return <LoginForm />;
}
```

### Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useAdminAuth.ts` | Complete rewrite with simplified state management |
| `src/pages/admin/AdminLogin.tsx` | Use local submitting state, simplify redirects |

---

## Why This Will Work

```text
New Flow:
┌─────────────────────────────────────────────────────────┐
│                  Page Load                               │
│  isInitializing = true → Show loading spinner            │
│  getSession() runs → sets user if exists                 │
│  checkRoles() runs → sets isAdmin/isEditor               │
│  isInitializing = false → Show login form                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              User Clicks Sign In                         │
│  Local isSubmitting = true → Button shows spinner        │
│  signIn() called → auth.signInWithPassword              │
│  Check roles immediately → verify admin/editor           │
│  Return { success: true }                                │
│  handleSubmit calls navigate('/admin')                   │
│  Navigation happens SYNCHRONOUSLY after success          │
└─────────────────────────────────────────────────────────┘
```

The key fix is moving the loading/submitting state to the component level and having the `signIn` function return a clear success/failure result that the component can act on immediately.
