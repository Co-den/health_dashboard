# FlowDesk Quick Reference Guide

## 30-Second Overview

FlowDesk is a SaaS customer health monitoring dashboard. It shows a table of customers with their health status, revenue, and engagement. Click any customer to see detailed analytics and activity history.

## Getting Started (3 Steps)

### Step 1: Install
```bash
npm install
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: Visit
- Home: `http://localhost:3000/`
- Dashboard: `http://localhost:3000/customers/health`

## Dashboard Tour (1 Minute)

### Section 1: Header
```
[FlowDesk Logo] [Title: "Customer Health"]
[Subtitle: "Monitor and prioritize customer accounts"]
```

### Section 2: Filters
```
[Search Input] [Health Status Dropdown] [Reset Button]
Search by name or domain → Filter by segment → Clear filters
```

### Section 3: Customer Table
```
Name            | MRR    | Last Active | Score | Owner
TechCorp Inc    | $5,200 | Feb 4, 2026 | 92    | Sarah
StartupXYZ      | $1,800 | Feb 2, 2026 | 78    | Mike
(click to view details) →
```

### Section 4: Pagination
```
[Previous] Page 1 of 1 [Next]
Shows customers 1-10 of 10
```

### Section 5: Details Panel (When Clicked)
```
┌─────────────────────────────┐
│ X  Customer Details         │
├─────────────────────────────┤
│ TechCorp Inc                │
│ techcorp.com                │
│ [Green: Healthy (92)]       │
│                             │
│ Monthly Revenue  | Owner    │
│ $5,200          | Sarah    │
│                             │
│ Health Score Trend (30d)    │
│ [Line Chart]                │
│                             │
│ Usage: 95%                  │
│ ▓▓▓▓▓▓░░ +5% from last mo  │
│                             │
│ Recent Activity             │
│ 📍 Dashboard login 2h ago   │
│ 📊 Export 500 records 5h ago│
│ 🔗 12,450 API calls 1d ago  │
│                             │
│ Notes: Strong engagement... │
│                             │
│ [Close Button]              │
└─────────────────────────────┘
```

## Key URLs

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page, features overview |
| Dashboard | `/customers/health` | Main customer monitoring |
| Dashboard + Search | `/customers/health?search=acme` | Filter by search term |
| Dashboard + Segment | `/customers/health?segment=at-risk` | Filter by health status |
| Dashboard + Page | `/customers/health?page=2` | View page 2 of results |
| Dashboard + Details | `/customers/health?customerId=5` | Show customer details |

## Color Coding

### Health Status Badges
```
🟢 Green  = Healthy (80-100)    - ✅ Good engagement
🟡 Amber  = Watch (60-79)       - ⚠️  Declining activity
🔴 Red    = At Risk (0-59)      - 🚨 Urgent attention needed
⚪ Gray   = Unknown             - ❓ No data available
```

## File Quick Reference

### Most Important Files
| File | Purpose | When to Edit |
|------|---------|--------------|
| `lib/api.ts` | Mock data and API | Add customers, change logic |
| `app/globals.css` | Colors and styling | Change theme, adjust colors |
| `app/customers/health/table.tsx` | Table columns | Add/remove columns, change layout |
| `lib/types.ts` | Data structure | Add new fields to customer |

### Component Files
| File | Type | Purpose |
|------|------|---------|
| `page.tsx` (home) | Server | Landing page |
| `page.tsx` (health) | Server | Main page wrapper |
| `content.tsx` | Client | Main logic hub |
| `filters.tsx` | Client | Search & filter UI |
| `table.tsx` | Client | Customer data table |
| `pagination.tsx` | Client | Page navigation |
| `details-panel.tsx` | Client | Customer details modal |
| `skeleton.tsx` | Util | Loading skeleton |
| `health-badge.tsx` | Component | Status badge |
| `status-indicator.tsx` | Component | Status dot |

## Common Tasks

### Add a New Customer
```typescript
// Edit: lib/api.ts
// Find: mockCustomers array
// Add:
{
  id: '11',
  name: 'New Company',
  domain: 'newcompany.com',
  mrr: 3500,
  lastActive: new Date('2026-02-06'),
  healthScore: 85,
  segment: 'healthy',
  owner: 'Your Name',
  notes: 'Brief notes',
}
```

### Change Table Columns
```typescript
// Edit: app/customers/health/table.tsx
// In <table>:
<th>New Column</th>

// In <tbody>:
<td>{customer.newField}</td>
```

### Modify Colors
```css
/* Edit: app/globals.css */
:root {
  --primary: 210 100% 50%;      /* Blue */
  --background: 0 0% 100%;      /* White */
}
```

### Change Page Size
```typescript
// Edit: app/customers/health/content.tsx
const pageSize = 10;  // Change this number
```

## Data Structure

### Customer Object
```typescript
{
  id: string           // Unique ID
  name: string         // Company name
  domain: string       // Company domain
  mrr: number          // Monthly revenue
  lastActive: Date     // Last login/activity
  healthScore: number  // 0-100 score
  segment: string      // 'healthy'|'watch'|'at-risk'|'unknown'
  owner: string        // CSM name
  ownerAvatar?: string // Avatar URL
  usage?: {            // Usage metrics
    percentage: number
    trend: number      // -/+ trend
  }
  recentEvents?: []    // Activity list
  notes?: string       // Customer notes
}
```

### Filter Parameters
```typescript
{
  search?: string      // Text search
  segment?: string     // 'all'|'healthy'|'watch'|'at-risk'
  page?: number        // Page number (1-indexed)
  pageSize?: number    // Items per page
  sortBy?: string      // 'name'|'mrr'|'healthScore'|'lastActive'
  sortOrder?: string   // 'asc'|'desc'
}
```

## Component Props

### HealthBadge
```typescript
<HealthBadge 
  segment="healthy"              // Required: segment type
  score={92}                     // Optional: show score in badge
  size="md"                      // Optional: 'sm'|'md'|'lg'
/>
```

### StatusIndicator
```typescript
<StatusIndicator 
  segment="healthy"              // Required: segment type
  showLabel={true}               // Optional: show text label
  size="sm"                      // Optional: 'xs'|'sm'|'md'
/>
```

### useAsync Hook
```typescript
const { data, isLoading, error, execute } = useAsync(
  async () => {
    return await getCustomers(params)
  },
  true  // Auto-execute on mount
)
```

## Styling Cheat Sheet

### Common Tailwind Classes
```
Layout:
  flex, gap-4, items-center, justify-between

Colors:
  text-foreground, bg-background, border-border
  text-muted-foreground, bg-muted/50

Sizing:
  w-full, h-10, px-6, py-4

Responsive:
  md:grid-cols-2, lg:text-xl

States:
  hover:bg-muted/50, disabled:opacity-50, focus:ring-2
```

### Common Patterns
```typescript
// Flex row with spacing
<div className="flex items-center justify-between gap-4">

// Responsive grid
<div className="grid md:grid-cols-2 gap-6">

// Card styling
<div className="rounded-lg border border-border bg-card p-6">

// Button states
<button className="hover:bg-muted/50 disabled:opacity-50">

// Text emphasis
<span className="font-semibold text-foreground">
```

## Debugging Tips

### Check Data Loading
```typescript
// Add to component
console.log("[v0] Data loaded:", data)
console.log("[v0] Is loading:", isLoading)
console.log("[v0] Error:", error)
```

### View Current Filters
```typescript
const searchParams = useSearchParams()
console.log("[v0] Filters:", {
  search: searchParams.get('search'),
  segment: searchParams.get('segment'),
  page: searchParams.get('page'),
  customerId: searchParams.get('customerId'),
})
```

### Test URL Changes
Open browser DevTools → Console and run:
```javascript
// Manually navigate with params
window.location.href = '?search=tech&segment=healthy&page=1'
```

## Performance Tips

1. **Keep components small** - Split into smaller pieces
2. **Use Suspense** - Show skeleton while loading
3. **Memoize callbacks** - Prevent unnecessary re-renders
4. **Lazy load panels** - Only load details when needed
5. **Optimize images** - Use next/image component

## Testing Checklist

- [ ] Can search by company name
- [ ] Can search by domain
- [ ] Can filter by health status
- [ ] Can navigate pages
- [ ] Can click row to open details panel
- [ ] Details panel shows all information
- [ ] Can close details panel
- [ ] Works on mobile (responsive)
- [ ] Dark mode looks good
- [ ] No console errors

## Resources

- **Docs**: See README.md and SETUP.md
- **Architecture**: See ARCHITECTURE.md
- **Next.js**: nextjs.org/docs
- **Tailwind**: tailwindcss.com/docs
- **TypeScript**: typescriptlang.org/docs

## Emergency Commands

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check

# Run production build
npm run build

# Start production server
npm start

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## One-Page Diagram

```
┌─────────────────────────────────────────────────────┐
│                   FlowDesk App                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Home Page (/) ←──────────────────────────────────┐ │
│  - Features overview                              │ │
│  - CTA to dashboard                               │ │
│                                                   │ │
│  Customer Health Dashboard (/customers/health)   │ │
│  - Search + Filter                    [useAsync] │ │
│  - Customer Table                     [getData] │ │
│  - Pagination Controls                           │ │
│  - Details Panel (on click)          [getDetail]│ │
│                                                   │ │
│  Data Flow:                                       │ │
│  User Input → URL Params → useAsync Hook → API  │ │
│  API → State → Components → UI Update            │ │
│                                                   │ │
│  Colors:                                          │ │
│  🟢 Healthy  🟡 Watch  🔴 At Risk  ⚪ Unknown   │ │
│                                                   │ │
└─────────────────────────────────────────────────────┘
```

---

**Last Updated**: February 6, 2026
**Status**: Ready to Use ✅
**Questions?** See README.md, SETUP.md, or ARCHITECTURE.md
