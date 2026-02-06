import { Customer, CustomerResponse, CustomerDetailResponse, FilterParams, HealthTrendPoint, HealthSegment } from './types'

/**
 * Mock customer data
 */
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'TechCorp Inc',
    domain: 'techcorp.com',
    mrr: 5200,
    lastActive: new Date('2026-02-04'),
    healthScore: 92,
    segment: 'healthy',
    owner: 'Sarah Johnson',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    usage: { percentage: 95, trend: 5 },
    notes: 'Strong engagement, active API user. Recently integrated webhooks.',
  },
  {
    id: '2',
    name: 'StartupXYZ',
    domain: 'startupxyz.io',
    mrr: 1800,
    lastActive: new Date('2026-02-02'),
    healthScore: 78,
    segment: 'watch',
    owner: 'Mike Chen',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    usage: { percentage: 62, trend: -8 },
    notes: 'Usage declining. Last support ticket 2 weeks ago.',
  },
  {
    id: '3',
    name: 'Enterprise Solutions LLC',
    domain: 'enterprise-sol.com',
    mrr: 8900,
    lastActive: new Date('2026-01-28'),
    healthScore: 45,
    segment: 'at-risk',
    owner: 'Emma Davis',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    usage: { percentage: 35, trend: -15 },
    notes: 'Contract expires in 30 days. No activity for 2 weeks.',
  },
  {
    id: '4',
    name: 'Digital Marketing Co',
    domain: 'digmark.com',
    mrr: 3400,
    lastActive: new Date('2026-02-05'),
    healthScore: 88,
    segment: 'healthy',
    owner: 'Sarah Johnson',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    usage: { percentage: 88, trend: 3 },
    notes: 'New customer, quick adoption. Excellent feedback.',
  },
  {
    id: '5',
    name: 'CloudSync Services',
    domain: 'cloudsync.dev',
    mrr: 2100,
    lastActive: new Date('2026-01-15'),
    healthScore: 52,
    segment: 'at-risk',
    owner: 'James Wilson',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    usage: { percentage: 40, trend: -10 },
    notes: 'Multiple support tickets. Considering alternatives.',
  },
  {
    id: '6',
    name: 'Analytics Plus',
    domain: 'analyticsplus.io',
    mrr: 4500,
    lastActive: new Date('2026-02-03'),
    healthScore: 85,
    segment: 'healthy',
    owner: 'Lisa Martinez',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    usage: { percentage: 92, trend: 7 },
    notes: 'Power user. Excellent champion in organization.',
  },
  {
    id: '7',
    name: 'FastTrack Media',
    domain: 'fasttrack.media',
    mrr: 2900,
    lastActive: new Date('2026-02-01'),
    healthScore: 71,
    segment: 'watch',
    owner: 'Mike Chen',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    usage: { percentage: 58, trend: -5 },
    notes: 'Implementation stalled. Waiting on their engineering team.',
  },
  {
    id: '8',
    name: 'GrowthLabs',
    domain: 'growthlab.com',
    mrr: 1500,
    lastActive: new Date('2026-02-04'),
    healthScore: 94,
    segment: 'healthy',
    owner: 'Emma Davis',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    usage: { percentage: 98, trend: 12 },
    notes: 'Expansion opportunity. Recently upgraded plan.',
  },
  {
    id: '9',
    name: 'SecureNet Corp',
    domain: 'securenet.com',
    mrr: 6700,
    lastActive: new Date('2026-01-30'),
    healthScore: 62,
    segment: 'watch',
    owner: 'James Wilson',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    usage: { percentage: 70, trend: -2 },
    notes: 'Compliance concerns being addressed. Quarterly check-in scheduled.',
  },
  {
    id: '10',
    name: 'EcoTech Industries',
    domain: 'ecotech.co',
    mrr: 3200,
    lastActive: new Date('2026-02-06'),
    healthScore: 89,
    segment: 'healthy',
    owner: 'Sarah Johnson',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    usage: { percentage: 93, trend: 8 },
    notes: 'Consistent engagement. Potential for case study.',
  },
]

/**
 * Generate mock health trend data for a customer
 */
function generateHealthTrend(): HealthTrendPoint[] {
  const today = new Date()
  const trend: HealthTrendPoint[] = []

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const score = Math.max(30, Math.min(100, 70 + Math.sin(i * 0.3) * 20 + Math.random() * 10))
    trend.push({
      date: date.toISOString().split('T')[0],
      score: Math.round(score),
    })
  }

  return trend
}

/**
 * Mock API: Get customers with filtering and pagination
 */
export async function getCustomers(params: FilterParams): Promise<CustomerResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filtered = [...mockCustomers]

  // Apply search filter
  if (params.search && params.search.trim() !== '') {
    const searchLower = params.search.toLowerCase()
    filtered = filtered.filter(
      (c) => c.name.toLowerCase().includes(searchLower) || c.domain.toLowerCase().includes(searchLower),
    )
  }

  // Apply segment filter
  if (params.segment && params.segment !== 'all') {
    filtered = filtered.filter((c) => c.segment === params.segment)
  }

  // Apply sorting
  const sortBy = params.sortBy || 'lastActive'
  const sortOrder = params.sortOrder || 'desc'

  filtered.sort((a, b) => {
    let aVal: any
    let bVal: any

    switch (sortBy) {
      case 'name':
        aVal = a.name
        bVal = b.name
        break
      case 'mrr':
        aVal = a.mrr
        bVal = b.mrr
        break
      case 'healthScore':
        aVal = a.healthScore
        bVal = b.healthScore
        break
      case 'lastActive':
        aVal = a.lastActive.getTime()
        bVal = b.lastActive.getTime()
        break
    }

    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Apply pagination
  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginated = filtered.slice(start, end)
  const totalPages = Math.ceil(filtered.length / pageSize)

  return {
    data: paginated,
    total: filtered.length,
    page,
    pageSize,
    totalPages,
  }
}

/**
 * Mock API: Get customer details with health trend
 */
export async function getCustomerDetail(customerId: string): Promise<CustomerDetailResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const customer = mockCustomers.find((c) => c.id === customerId)
  if (!customer) {
    throw new Error(`Customer ${customerId} not found`)
  }

  // Generate mock events
  const events = [
    {
      id: '1',
      type: 'login' as const,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      description: 'Dashboard login from New York',
    },
    {
      id: '2',
      type: 'export' as const,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      description: 'Exported 500 records',
    },
    {
      id: '3',
      type: 'api_call' as const,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      description: '12,450 API calls',
    },
    {
      id: '4',
      type: 'support_ticket' as const,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      description: 'Support ticket #4521 opened',
    },
  ]

  return {
    data: {
      ...customer,
      recentEvents: events,
    },
    healthTrend: generateHealthTrend(),
  }
}
