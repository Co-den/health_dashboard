# FlowDesk - Customer Health Dashboard

A production-ready Next.js SaaS application for monitoring and managing customer health metrics. Built with Next.js 14+, TypeScript, Tailwind CSS, and shadcn/ui components.

## Overview

FlowDesk helps Customer Success Managers quickly evaluate customer health and prioritize outreach through real-time metrics, segmentation, and detailed analytics. The application features a comprehensive dashboard with filtering, pagination, and an interactive slide-over panel for detailed customer insights.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Date Formatting**: date-fns

## Project Structure

```
app/
├── page.tsx                          # Home/landing page
├── layout.tsx                        # Root layout with metadata
├── globals.css                       # Global styles and design tokens
├── customers/
│   └── health/
│       ├── page.tsx                  # Main customer health page
│       ├── content.tsx               # Main content component (Client)
│       ├── filters.tsx               # Filter controls (Client)
│       ├── table.tsx                 # Customer table (Client)
│       ├── pagination.tsx            # Pagination controls (Client)
│       ├── details-panel.tsx         # Customer details slide-over (Client)
│       └── skeleton.tsx              # Loading skeleton UI
├── components/
│   ├── health-badge.tsx              # Health status badge
│   ├── status-indicator.tsx          # Status indicator dot
│   └── ui/                           # shadcn/ui components
└── lib/
    ├── types.ts                      # TypeScript type definitions
    ├── api.ts                        # Mock API functions
    └── utils.ts                      # Utility functions
hooks/
├── use-async.ts                      # Custom async hook for data fetching
└── use-toast.ts                      # Toast notifications hook
```

## Features

### Customer Health Page (`/customers/health`)

#### 1. **Search & Filtering**
- Real-time search by customer name or domain
- Filter by health segment: All, Healthy, Watch, At Risk
- URL search parameters for shareable links
- Reset button to clear all filters

#### 2. **Customer Table**
- Displays: Name, MRR, Last Active, Health Score, Owner
- Visual health score progress bar
- Hover states for better UX
- Click rows to view detailed customer information
- Responsive design with horizontal scroll on mobile

#### 3. **Health Segmentation**
- **Healthy** (Green): Score 80-100, engaged customers
- **Watch** (Amber): Score 60-79, declining engagement
- **At Risk** (Red): Score 0-59, urgent attention needed
- **Unknown** (Gray): No data available

#### 4. **Pagination**
- Server-side pagination with 10 customers per page
- Previous/Next navigation with disabled states
- Page indicator showing current position
- Smooth scroll to top on page change

#### 5. **Customer Details Panel**
- Slide-over panel triggered by clicking a table row
- Displays:
  - Customer name and domain
  - Health score with visual indicator
  - Monthly recurring revenue (MRR)
  - Account owner
  - 30-day health trend chart
  - Usage percentage with trend
  - Recent activity timeline
  - Customer notes
- Dismissible with backdrop click or close button
- Smooth animations
- Loading skeleton while fetching

### Home Page (`/`)

Professional landing page with:
- Navigation with FlowDesk branding
- Hero section with CTA
- Features overview (3 key benefits)
- Call-to-action section
- Footer with copyright

## API Integration

### Mock API Structure

The application uses mock data with async functions to simulate a real API:

#### `getCustomers(params: FilterParams)`
Fetches paginated, filtered customer list
- **Parameters**: search, segment, page, pageSize, sortBy, sortOrder
- **Returns**: `CustomerResponse` with data array, total count, and pagination info
- **Simulated delay**: 300ms

#### `getCustomerDetail(customerId: string)`
Fetches detailed customer information with health trends
- **Parameters**: Customer ID
- **Returns**: `CustomerDetailResponse` with customer data and 30-day health trend
- **Simulated delay**: 200ms

### Data Types

```typescript
// Core customer data
interface Customer {
  id: string
  name: string
  domain: string
  mrr: number
  lastActive: Date
  healthScore: number
  segment: HealthSegment
  owner: string
  ownerAvatar?: string
  usage?: { percentage: number; trend: number }
  recentEvents?: CustomerEvent[]
  notes?: string
}

// Health segments
type HealthSegment = 'healthy' | 'watch' | 'at-risk' | 'unknown'

// Filter parameters
interface FilterParams {
  search?: string
  segment?: HealthSegment | 'all'
  page?: number
  pageSize?: number
  sortBy?: 'name' | 'mrr' | 'healthScore' | 'lastActive'
  sortOrder?: 'asc' | 'desc'
}
```

## Component Architecture

### Server Components
- `page.tsx` - Root page component
- `content.tsx` - Main content orchestrator

### Client Components
- `filters.tsx` - Filter UI with URL search params
- `table.tsx` - Customer data table with row click handlers
- `pagination.tsx` - Navigation controls
- `details-panel.tsx` - Modal-like slide-over panel
- `health-badge.tsx` - Health status indicator
- `status-indicator.tsx` - Simple status dot

## Styling & Design

### Color System
- **Primary**: Blue (`#0050ff`)
- **Success**: Green (Health indicators)
- **Warning**: Amber (Watch status)
- **Error**: Red (At Risk status)
- **Neutrals**: Gray scale for text and borders

### Design Tokens
All colors defined as CSS custom properties for:
- Dark mode support
- Consistent theming
- Easy customization

### Responsive Design
- Mobile-first approach
- Tablet breakpoints (md: 768px)
- Desktop breakpoints (lg: 1024px)
- Responsive table with horizontal scroll

## Custom Hooks

### `useAsync<T>()`
Handles async operations with loading and error states.

```typescript
const { data, isLoading, error, execute } = useAsync(
  () => getCustomers(filterParams),
  true // immediate execution
)
```

## URL Parameters

The app uses search parameters for state management:

```
?search=techcorp&segment=healthy&page=2&customerId=123
```

- `search`: Search query string
- `segment`: Health segment filter
- `page`: Current page number
- `customerId`: Currently selected customer

## Accessibility

- Semantic HTML elements (`<table>`, `<nav>`, `<main>`)
- ARIA labels on buttons and interactive elements
- Keyboard navigation support
- Color contrast compliant
- Screen reader friendly

## Performance Optimizations

- Suspense boundaries with skeleton loaders
- Efficient URL parameter handling
- Memoized callbacks in components
- Optimized table rendering
- CSS classes over inline styles

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Or with Vercel CLI
vercel install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## Deployment

Deploy to Vercel with one command:

```bash
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Mock Data

The application includes 10 sample customers with:
- Varied health scores and segments
- Different MRR amounts ($1.5k - $8.9k)
- Realistic engagement patterns
- Activity logs and notes

Customize by editing `/lib/api.ts`

## Future Enhancements

- Real API integration replacing mock data
- Database persistence (Supabase, Neon, etc.)
- User authentication and authorization
- Export functionality (CSV, PDF)
- Advanced filtering and sorting
- Dashboard widgets and custom views
- Customer communication tools
- Integration with CRM systems
- Analytics and reporting
- Role-based access control

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Built with v0.app
