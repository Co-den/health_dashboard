'use client'

import React from "react"

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import type { HealthSegment } from '@/lib/types'

interface CustomerFiltersProps {
  isLoading?: boolean
}

export function CustomerFilters({ isLoading }: CustomerFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSearch = searchParams.get('search') || ''
  const currentSegment = (searchParams.get('segment') || 'all') as HealthSegment | 'all'

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const value = e.target.value
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const handleSegmentChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value !== 'all') {
      params.set('segment', value)
    } else {
      params.delete('segment')
    }
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const handleReset = () => {
    router.push('?')
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-3">
        {/* Search Input */}
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-foreground">Search</label>
          <Input
            placeholder="Search by name or domain..."
            value={currentSearch}
            onChange={handleSearchChange}
            disabled={isLoading}
            className="h-10"
          />
        </div>

        {/* Segment Filter */}
        <div className="md:w-40">
          <label className="mb-2 block text-sm font-medium text-foreground">Health Status</label>
          <Select value={currentSegment} onValueChange={handleSegmentChange} disabled={isLoading}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All customers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="watch">Watch</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button variant="outline" onClick={handleReset} disabled={isLoading && !currentSearch && currentSegment === 'all'}>
          Reset
        </Button>
      </div>
    </Card>
  )
}
