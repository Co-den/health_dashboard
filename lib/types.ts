/**
 * Customer Health Data Types
 */

export type HealthSegment = 'healthy' | 'watch' | 'at-risk' | 'unknown'

export interface Customer {
  id: string
  name: string
  domain: string
  mrr: number
  lastActive: Date
  healthScore: number
  segment: HealthSegment
  owner: string
  ownerAvatar?: string
  usage?: {
    percentage: number
    trend: number // positive or negative
  }
  recentEvents?: CustomerEvent[]
  notes?: string
}

export interface CustomerEvent {
  id: string
  type: 'login' | 'export' | 'api_call' | 'support_ticket' | 'renewal'
  timestamp: Date
  description: string
}

export interface CustomerResponse {
  data: Customer[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface CustomerDetailResponse {
  data: Customer
  healthTrend: HealthTrendPoint[]
}

export interface HealthTrendPoint {
  date: string
  score: number
}

export interface FilterParams {
  search?: string
  segment?: HealthSegment | 'all'
  page?: number
  pageSize?: number
  sortBy?: 'name' | 'mrr' | 'healthScore' | 'lastActive'
  sortOrder?: 'asc' | 'desc'
}
