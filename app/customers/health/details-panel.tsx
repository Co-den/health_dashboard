'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, TrendingUp, TrendingDown, Calendar, DollarSign, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { HealthBadge } from '@/components/health-badge'
import { getCustomerDetail } from '@/lib/api'
import { format } from 'date-fns'
import type { Customer, CustomerEvent, HealthTrendPoint } from '@/lib/types'

interface CustomerDetailsPanelProps {
  customerId: string
  onClose?: () => void
}

export function CustomerDetailsPanel({ customerId, onClose }: CustomerDetailsPanelProps) {
  const router = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [healthTrend, setHealthTrend] = useState<HealthTrendPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true)
        const response = await getCustomerDetail(customerId)
        setCustomer(response.data)
        setHealthTrend(response.healthTrend)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customer details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetails()
  }, [customerId])

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    // Remove customerId from URL
    router.push(window.location.pathname + window.location.search.replace(/[?&]customerId=[^&]*/, '').replace(/^[?&]/, '?').replace(/\?$/, ''))
  }

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={handleClose} />

      {/* Panel */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out">
          <div className="flex h-full flex-col overflow-y-auto bg-background shadow-xl">
            {/* Header */}
            <div className="border-b border-border bg-card px-6 py-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-foreground">Customer Details</h2>
                <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-12 w-full" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Error loading details</p>
                      <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                </div>
              ) : customer ? (
                <div className="space-y-6">
                  {/* Customer Header */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{customer.domain}</p>
                    <div className="mt-3">
                      <HealthBadge segment={customer.segment} score={customer.healthScore} size="lg" />
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <p className="text-xs font-medium text-muted-foreground">Monthly Revenue</p>
                      <p className="mt-2 text-lg font-bold text-foreground">
                        ${customer.mrr.toLocaleString('en-US')}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <p className="text-xs font-medium text-muted-foreground">Account Owner</p>
                      <p className="mt-2 text-sm font-semibold text-foreground">{customer.owner}</p>
                    </div>
                  </div>

                  {/* Health Trend Chart (Simplified) */}
                  {healthTrend.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Health Score Trend (30 days)</p>
                      <div className="relative h-16 rounded-lg border border-border bg-muted/30 p-3">
                        <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <polyline
                            points={healthTrend
                              .map((point, i) => {
                                const x = (i / (healthTrend.length - 1)) * 100
                                const y = 40 - (point.score / 100) * 40
                                return `${x},${y}`
                              })
                              .join(' ')}
                            fill="none"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>30 days ago</span>
                        <span>Today</span>
                      </div>
                    </div>
                  )}

                  {/* Usage */}
                  {customer.usage && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Usage</p>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Platform Usage</span>
                            <span className="font-semibold text-foreground">{customer.usage.percentage}%</span>
                          </div>
                          <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className={`h-full transition-all ${
                                customer.usage.percentage >= 80 ? 'bg-green-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${customer.usage.percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs">
                          {customer.usage.trend >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                          )}
                          <span className={customer.usage.trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                            {customer.usage.trend >= 0 ? '+' : ''}
                            {customer.usage.trend}% from last month
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recent Events */}
                  {customer.recentEvents && customer.recentEvents.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-foreground">Recent Activity</p>
                      <div className="space-y-2">
                        {customer.recentEvents.map((event) => (
                          <div key={event.id} className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                            <div className="mt-0.5">
                              {event.type === 'login' && <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                              {event.type === 'export' && <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />}
                              {event.type === 'api_call' && <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                              {event.type === 'support_ticket' && <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                              {event.type === 'renewal' && <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{event.description}</p>
                              <p className="text-xs text-muted-foreground">{format(event.timestamp, 'MMM d, h:mm a')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {customer.notes && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Notes</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{customer.notes}</p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-card px-6 py-4">
              <Button variant="default" className="w-full" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
