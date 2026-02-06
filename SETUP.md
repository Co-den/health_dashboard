# FlowDesk Setup Guide

## Quick Start

### 1. Clone & Install

```bash
# If using GitHub
git clone <your-repo-url>
cd flowdesk

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Access the Dashboard

- **Home Page**: `http://localhost:3000/`
- **Customer Health Dashboard**: `http://localhost:3000/customers/health`

## Project Features at a Glance

### Home Page
- Professional landing page with features overview
- Navigation to dashboard
- Call-to-action buttons

### Customer Health Dashboard (`/customers/health`)

**What You Can Do:**

1. **Search Customers**
   - Type in the search box to find customers by name or domain
   - Results update in real-time

2. **Filter by Health Status**
   - Click the "Health Status" dropdown
   - Select: All, Healthy, Watch, At Risk
   - Filters combine with search

3. **View Customer List**
   - See all customers in a table with:
     - Customer name and domain
     - Monthly recurring revenue (MRR)
     - Last active date
     - Health score (0-100) with progress bar
     - Account owner

4. **Click on a Customer**
   - A slide-over panel opens from the right
   - Shows detailed customer information:
     - Full customer profile
     - Health score with visual indicator
     - 30-day health trend chart
     - Usage percentage with trend
     - Recent activity timeline
     - Customer notes

5. **Navigate Pages**
   - Use Previous/Next buttons
   - Shows page indicator (Page X of Y)

## File Structure Overview

### Important Files

```
app/
├── page.tsx                 # Home page - start here
├── layout.tsx              # App metadata and configuration
├── globals.css             # Design tokens and global styles
└── customers/health/       # Customer health dashboard
    ├── page.tsx            # Main page entry point
    ├── content.tsx         # Main logic - fetches and renders
    ├── filters.tsx         # Search and filter UI
    ├── table.tsx           # Customer table display
    ├── pagination.tsx      # Page navigation
    ├── details-panel.tsx   # Customer details slide-over
    └── skeleton.tsx        # Loading state skeleton

components/
├── health-badge.tsx        # Health status badge component
├── status-indicator.tsx    # Status indicator dot
└── ui/                     # Pre-built shadcn/ui components

lib/
├── api.ts                  # Mock API with sample data
├── types.ts                # TypeScript type definitions
└── utils.ts                # Helper functions

hooks/
└── use-async.ts            # Custom hook for async data fetching
```

## Understanding the Data Flow

### Home Page Flow
```
page.tsx (Server Component)
  └── Renders: Navigation, Hero, Features, CTA, Footer
```

### Dashboard Flow
```
customers/health/page.tsx (Server Component - Suspense boundary)
  └── Suspense fallback: CustomerTableSkeleton
    └── CustomerHealthContent (Client Component)
      ├── useAsync hook → getCustomers() → Mock API
      ├── Renders: Filters, Table, Pagination
      └── CustomerDetailsPanel (when customer selected)
        └── useAsync hook → getCustomerDetail() → Mock API
```

## Customization Guide

### 1. Change Colors/Theme

Edit `/app/globals.css` - modify the CSS custom properties:

```css
:root {
  --primary: 210 100% 50%;        /* Primary blue */
  --background: 0 0% 100%;        /* White background */
  --foreground: 0 0% 9%;          /* Dark text */
  /* ... other colors */
}
```

### 2. Add More Mock Customers

Edit `/lib/api.ts` - add to `mockCustomers` array:

```typescript
{
  id: '11',
  name: 'Your Company',
  domain: 'yourcompany.com',
  mrr: 5000,
  lastActive: new Date('2026-02-06'),
  healthScore: 85,
  segment: 'healthy',
  owner: 'Your Name',
  // ... more fields
}
```

### 3. Connect Real API

Replace `lib/api.ts` functions with real API calls:

```typescript
export async function getCustomers(params: FilterParams) {
  const response = await fetch('/api/customers', {
    method: 'POST',
    body: JSON.stringify(params),
  })
  return response.json()
}
```

### 4. Add Database Integration

Connect to Supabase, Neon, or other databases:

1. Set up integration in your hosting platform
2. Update environment variables
3. Replace mock API with database queries

### 5. Modify Table Columns

Edit `/app/customers/health/table.tsx` - add new columns:

```typescript
<th className="px-6 py-4">New Column</th>
// In the table body:
<td className="px-6 py-4">{customer.newField}</td>
```

## Key Technologies Explained

### Next.js App Router
- File-based routing: `/customers/health/page.tsx` → `/customers/health`
- Server Components by default for SSR and data fetching
- Client Components with `'use client'` directive for interactivity

### TypeScript
- Strict type checking for all data
- Auto-completion in your editor
- Type safety across the app

### Tailwind CSS
- Utility-first CSS framework
- All styling via class names (no separate CSS files)
- Responsive design with prefixes: `md:`, `lg:`, etc.

### shadcn/ui
- Pre-built accessible components
- Fully customizable and open-source
- Located in `/components/ui/`

## Common Tasks

### 1. Add a New Route

Create file: `/app/new-page/page.tsx`

```typescript
export default function NewPage() {
  return <h1>New Page</h1>
}
```

### 2. Add a New Component

Create file: `/components/my-component.tsx`

```typescript
export function MyComponent() {
  return <div>Component</div>
}
```

### 3. Style an Element

Use Tailwind classes:

```typescript
<div className="flex items-center justify-between gap-4 rounded-lg bg-gray-100 p-4">
  Content
</div>
```

### 4. Fetch Data (Server)

In a Server Component or API route:

```typescript
import { getCustomers } from '@/lib/api'

const data = await getCustomers({ page: 1, pageSize: 10 })
```

### 5. Fetch Data (Client)

Use the custom `useAsync` hook:

```typescript
'use client'
import { useAsync } from '@/hooks/use-async'
import { getCustomers } from '@/lib/api'

export function MyComponent() {
  const { data, isLoading, error } = useAsync(() => getCustomers(params))
}
```

## Debugging

### View Logs
Open browser DevTools (F12) → Console tab

### Add Debug Logs
```typescript
console.log("[v0] Debug info:", variable)
```

### Check Network
DevTools → Network tab to see API calls

## Performance Tips

1. **Use Suspense** for loading states
2. **Memoize callbacks** with `useCallback`
3. **Lazy load components** with `React.lazy()`
4. **Optimize images** with `next/image`

## Deployment Checklist

- [ ] Test all features locally
- [ ] Update metadata in `layout.tsx`
- [ ] Remove debug console.log statements
- [ ] Test responsive design on mobile
- [ ] Check for TypeScript errors: `npm run type-check`
- [ ] Build locally: `npm run build`
- [ ] Deploy to Vercel or your hosting platform

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org/docs

## Troubleshooting

### Port already in use
```bash
npm run dev -- -p 3001  # Use different port
```

### Dependencies not installing
```bash
rm node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
npm run type-check
```

## Next Steps

1. ✅ Explore the dashboard at `/customers/health`
2. Try filtering and searching customers
3. Click on a customer to see the details panel
4. Review the code structure in `/app/customers/health/`
5. Customize colors and styling in `/app/globals.css`
6. Connect a real API by modifying `/lib/api.ts`
7. Add database integration (Supabase, Neon, etc.)
8. Deploy to Vercel

Enjoy building with FlowDesk!
