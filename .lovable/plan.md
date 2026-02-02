

# Vercel SPA Fallback Configuration (Excluding Admin Routes)

## Goal

Configure Vercel to enable SPA fallback for public pages only. Admin routes will NOT be rewritten, meaning:
- Direct URL access to `/admin/*` returns 404
- Admin pages only work when navigating from within the app (client-side routing)

---

## Implementation

### Create `vercel.json`

```json
{
  "rewrites": [
    { "source": "/case-studies/:path*", "destination": "/" },
    { "source": "/services/:path*", "destination": "/" },
    { "source": "/about", "destination": "/" },
    { "source": "/contact", "destination": "/" }
  ]
}
```

---

## Route Behavior After Fix

| Route | Direct URL Access | In-App Navigation |
|-------|-------------------|-------------------|
| `/` | Works | Works |
| `/case-studies` | Works | Works |
| `/case-studies/:slug` | Works | Works |
| `/services/:slug` | Works | Works |
| `/about` | Works | Works |
| `/contact` | Works | Works |
| `/admin/*` | 404 | Works |

---

## Security Benefit

Admin routes are hidden from direct URL access:
- Bots and crawlers can't find admin pages
- Users must navigate to admin from within the app
- Combined with authentication, provides an extra layer of obscurity

---

## Files to Create

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel hosting configuration with selective SPA rewrites |

