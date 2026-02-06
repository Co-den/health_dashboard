import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export function CustomerTableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters Skeleton */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </Card>

      {/* Table Skeleton */}
      <Card className="overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-border bg-muted/50 px-6 py-4">
          <div className="grid grid-cols-5 gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        {/* Table Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-border px-6 py-4 last:border-b-0">
            <div className="grid grid-cols-5 gap-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
        ))}
      </Card>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  )
}
