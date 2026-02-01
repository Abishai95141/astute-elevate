
# Fix: Admin Login Stuck on "Signing in..."

## Root Cause

The login flow has a race condition between the `signIn` function and the `onAuthStateChange` listener:

1. User clicks Sign In → `isSigningIn` becomes `true`
2. Auth succeeds (confirmed by 200 status in logs)
3. `signIn` function checks roles and sets `isSigningIn: false`
4. BUT the component redirect depends on `user && (isAdmin || isEditor)` from state
5. The `onAuthStateChange` callback is async and takes time to update roles in state
6. Result: Button shows "Signing in..." because state updates are racing

```text
Current Problem:
┌──────────────┐     ┌────────────────────┐
│   signIn()   │     │ onAuthStateChange  │
│ isSigningIn  │     │ (async callback)   │
│   = false    │     │ checks roles...    │
└──────────────┘     └────────────────────┘
       ↓                      ↓
   Returns                Still processing
   immediately            role check
```

## Solution

Navigate directly from the `signIn` function after confirming the user has admin/editor permissions, rather than waiting for the `onAuthStateChange` to update state and trigger the redirect effect.

### Changes to `src/hooks/useAdminAuth.ts`

Return a success flag with role information from `signIn`:

```typescript
// After role check succeeds (user is admin/editor)
setState(prev => ({ 
  ...prev, 
  isSigningIn: false,
  user: data.user,  // Set user immediately
  isAdmin: roles.isAdmin,  // Set roles immediately  
  isEditor: roles.isEditor 
}));
return { data, roles };  // Return roles so caller can act
```

### Changes to `src/pages/admin/AdminLogin.tsx`

Handle navigation in the submit handler after successful login:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLocalError(null);

  if (!email || !password) {
    setLocalError('Please enter email and password');
    return;
  }

  const result = await signIn(email, password);
  
  // Navigate on success - don't wait for effect
  if (!result.error) {
    navigate('/admin');
  }
};
```

## Technical Details

### Files to Modify

1. **`src/hooks/useAdminAuth.ts`**
   - Update the `signIn` function to immediately set user/roles in state after verification
   - This ensures the state is updated synchronously after role check

2. **`src/pages/admin/AdminLogin.tsx`**  
   - Call `navigate('/admin')` directly after successful `signIn` call
   - Keep the existing `useEffect` redirect as a backup for page refresh scenarios

### Why This Works

```text
Fixed Flow:
┌──────────────────────────────────────────┐
│              signIn()                     │
│  1. Auth succeeds                         │
│  2. Check roles                           │
│  3. Set user + roles in state immediately │
│  4. Return success                        │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│          handleSubmit()                   │
│  5. Receives success                      │
│  6. Calls navigate('/admin')              │
└──────────────────────────────────────────┘
```

The redirect happens synchronously in the same execution path as the login success, eliminating the race condition.
