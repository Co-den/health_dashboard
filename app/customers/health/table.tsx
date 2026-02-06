'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { HealthBadge } from '@/components/health-badge'
import { ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import type { Customer } from '@/lib/types'

interface CustomerTableProps {
  customers: Customer[]
  onRowClick?: (customerId: string) => void
}

export function CustomerTable({ customers, onRowClick }: CustomerTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleRowClick = (customerId: string) => {
    if (onRowClick) {
      onRowClick(customerId)
    }
    // Also update URL with customerId param
    const params = new URLSearchParams(searchParams)
    params.set('customerId', customerId)
    router.push(`?${params.toString()}`)
  }

  if (customers.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">No customers found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                <div className="flex items-center gap-2">
                  MRR <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                <div className="flex items-center gap-2">
                  Last Active <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                <div className="flex items-center gap-2">
                  Health Score <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Owner</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-border transition-colors hover:bg-muted/50 cursor-pointer"
                onClick={() => handleRowClick(customer.id)}
              >
                {/* Name Column */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.domain}</p>
                  </div>
                </td>

                {/* MRR Column */}
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  ${customer.mrr.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>

                {/* Last Active Column */}
                <td className="px-6 py-4 text-sm text-muted-foreground">{format(customer.lastActive, 'MMM d, yyyy')}</td>

                {/* Health Score Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16">
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-full transition-all ${
                            customer.healthScore >= 80
                              ? 'bg-green-500'
                              : customer.healthScore >= 60
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${customer.healthScore}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{customer.healthScore}</span>
                  </div>
                </td>

                {/* Owner Column */}
                <td className="px-6 py-4 text-sm text-foreground">{customer.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
