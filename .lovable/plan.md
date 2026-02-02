
# Admin Panel: Contact Messages & Newsletter Subscribers

## Problem Summary

The contact form saves messages to `contact_submissions` table, but there's **no way to view them** in the admin panel. The same applies to newsletter subscribers.

---

## Current State

| Feature | Status |
|---------|--------|
| Contact form saves to DB | ✅ Working (1 submission exists) |
| Admin can view messages | ❌ No interface exists |
| RLS allows admin to read | ❌ Only INSERT policy exists |
| Newsletter subscribers view | ❌ No interface exists |

---

## Solution Overview

Create a complete admin section for managing contact submissions and newsletter subscribers with:
- Message list with unread/read status indicators
- Filters by service type, date range, and read status
- Detailed message view with mark-as-read functionality
- Newsletter subscribers list
- Database updates for RLS policies and status tracking

---

## Part 1: Database Changes

### Add Status Column to `contact_submissions`

```sql
ALTER TABLE public.contact_submissions 
ADD COLUMN is_read boolean NOT NULL DEFAULT false;

ALTER TABLE public.contact_submissions 
ADD COLUMN read_at timestamp with time zone;
```

### Add RLS Policies for Admin Access

```sql
-- Allow admins/editors to view all contact submissions
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

-- Allow admins/editors to update (mark as read)
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

-- Allow admins to delete contact submissions
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
```

### Add RLS Policies for Newsletter Subscribers

```sql
-- Allow admins/editors to view newsletter subscribers
CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

-- Allow admins to delete subscribers
CREATE POLICY "Admins can delete newsletter subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
```

---

## Part 2: New Admin Pages

### File Structure

```text
src/pages/admin/
├── ContactMessages.tsx     (NEW - Message list & management)
├── NewsletterSubscribers.tsx (NEW - Subscriber list)
└── ... existing files
```

### ContactMessages.tsx Features

| Feature | Description |
|---------|-------------|
| Message List | Table with name, email, service, date, read status |
| Unread Badge | Visual indicator for new messages (dot or badge) |
| Filters | Service type dropdown, date range, read/unread toggle |
| Search | Search by name, email, or message content |
| Detail View | Expandable row or modal for full message |
| Actions | Mark as read, delete (admin only) |
| Bulk Actions | Mark selected as read, delete selected |

### NewsletterSubscribers.tsx Features

| Feature | Description |
|---------|-------------|
| Subscriber List | Table with email, subscribed date, status |
| Export | Download as CSV |
| Delete | Remove inactive subscribers |

---

## Part 3: UI Components

### Message Card/Row Design

```text
┌─────────────────────────────────────────────────────────────────┐
│ ● John Doe                           Digital Branding           │
│   john@example.com                   2 hours ago                │
│   "I'm interested in learning more about your AI automation..." │
├─────────────────────────────────────────────────────────────────┤
│ [Mark as Read] [View Details] [Delete]                          │
└─────────────────────────────────────────────────────────────────┘

● = Unread indicator (blue dot)
```

### Filter Bar Design

```text
┌──────────────────────────────────────────────────────────────────┐
│ [🔍 Search...]  [Service: All ▼]  [Status: All ▼]  [Date: All ▼] │
└──────────────────────────────────────────────────────────────────┘
```

---

## Part 4: Navigation Updates

### Update AdminLayout.tsx

Add new navigation items:

```tsx
const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages', badge: unreadCount },
  { href: '/admin/subscribers', icon: Mail, label: 'Subscribers' },
  { href: '/admin/case-studies', icon: FileText, label: 'Case Studies' },
];
```

### Update Dashboard Stats

Add message stats to dashboard:

```text
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Case Studies    │ Published       │ Messages        │ Subscribers     │
│ 5               │ 3               │ 12 (3 new)      │ 45              │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

## Part 5: Custom Hooks

### useContactMessages.ts

```tsx
// Fetches contact submissions with filters
// Provides mark as read, delete functions
// Returns unread count for badge

export function useContactMessages(filters?: MessageFilters) {
  // ...query with filters
  return {
    messages,
    unreadCount,
    markAsRead,
    deleteMessage,
    isLoading,
  };
}
```

### useNewsletterSubscribers.ts

```tsx
export function useNewsletterSubscribers() {
  return {
    subscribers,
    totalCount,
    deleteSubscriber,
    exportToCSV,
    isLoading,
  };
}
```

---

## Part 6: Routing Updates

### Update App.tsx

```tsx
// Add new admin routes
<Route path="/admin/messages" element={<ContactMessages />} />
<Route path="/admin/subscribers" element={<NewsletterSubscribers />} />
```

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| Database Migration | Create | Add is_read column, RLS policies |
| `src/pages/admin/ContactMessages.tsx` | Create | Message management page |
| `src/pages/admin/NewsletterSubscribers.tsx` | Create | Subscriber management page |
| `src/hooks/useContactMessages.ts` | Create | Messages data hook |
| `src/hooks/useNewsletterSubscribers.ts` | Create | Subscribers data hook |
| `src/components/admin/AdminLayout.tsx` | Modify | Add nav items with badges |
| `src/pages/admin/AdminDashboard.tsx` | Modify | Add message/subscriber stats |
| `src/App.tsx` | Modify | Add new routes |

---

## Implementation Order

1. **Phase 1**: Database migration (add columns + RLS policies)
2. **Phase 2**: Create data hooks (useContactMessages, useNewsletterSubscribers)
3. **Phase 3**: Create ContactMessages.tsx page
4. **Phase 4**: Create NewsletterSubscribers.tsx page
5. **Phase 5**: Update AdminLayout with new navigation + unread badge
6. **Phase 6**: Update AdminDashboard with new stats
7. **Phase 7**: Update App.tsx with routes
8. **Phase 8**: Test admin access and message management

---

## Security Considerations

- All RLS policies require authenticated user with admin/editor role
- Delete operations restricted to admin role only
- No sensitive data exposed in client-side code
- Role check uses existing `has_role()` security definer function
