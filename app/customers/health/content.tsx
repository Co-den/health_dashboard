'use client'

import { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAsync } from '@/hooks/use-async'
import { getCustomers } from '@/lib/api'
import { CustomerFilters } from './filters'
import { CustomerTable } from './table'
import { PaginationControls } from './pagination'
import { CustomerDetailsPanel } from './details-panel'
import type { FilterParams } from '@/lib/types'

export function CustomerHealthContent() {
  const searchParams = useSearchParams()
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

  // Extract query params
  const search = searchParams.get('search') || undefined
  const segment = (searchParams.get('segment') || 'all') as any
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = 10

  // Fetch customers data
  const filterParams: FilterParams = {
    search,
    segment: segment === 'all' ? 'all' : segment,
    page,
    pageSize,
  }

  const { data, isLoading, error } = useAsync(
    useCallback(() => getCustomers(filterParams), [search, segment, page]),
  )

  // Handle selected customer from URL
  const urlCustomerId = searchParams.get('customerId')
  if (urlCustomerId && urlCustomerId !== selectedCustomerId) {
    setSelectedCustomerId(urlCustomerId)
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">Error loading customers</p>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <CustomerFilters isLoading={isLoading} />

      {/* Table */}
      <CustomerTable customers={data?.data || []} onRowClick={setSelectedCustomerId} />

      {/* Pagination */}
      {data && data.totalPages > 0 && (
        <PaginationControls currentPage={page} totalPages={data.totalPages} isLoading={isLoading} />
      )}

      {/* Details Panel */}
      {selectedCustomerId && (
        <CustomerDetailsPanel customerId={selectedCustomerId} onClose={() => setSelectedCustomerId(null)} />
      )}
    </div>
  )
}
