import { Suspense } from 'react'
import { CustomerHealthContent } from './content'
import { CustomerTableSkeleton } from './skeleton'

export const metadata = {
  title: 'Customer Health | FlowDesk',
  description: 'Monitor and manage customer health metrics',
}

export default function CustomerHealthPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground">Customer Health</h1>
          <p className="mt-2 text-muted-foreground">Monitor and prioritize customer accounts based on health metrics</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Suspense fallback={<CustomerTableSkeleton />}>
          <CustomerHealthContent />
        </Suspense>
      </div>
    </div>
  )
}
