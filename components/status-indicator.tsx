import { cn } from '@/lib/utils'
import type { HealthSegment } from '@/lib/types'

interface StatusIndicatorProps {
  segment: HealthSegment
  showLabel?: boolean
  size?: 'xs' | 'sm' | 'md'
}

const statusConfig: Record<HealthSegment, { color: string; label: string }> = {
  healthy: {
    color: 'bg-green-500 dark:bg-green-400',
    label: 'Healthy',
  },
  watch: {
    color: 'bg-amber-500 dark:bg-amber-400',
    label: 'Watch',
  },
  'at-risk': {
    color: 'bg-red-500 dark:bg-red-400',
    label: 'At Risk',
  },
  unknown: {
    color: 'bg-gray-400 dark:bg-gray-500',
    label: 'Unknown',
  },
}

const sizeMap = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
}

export function StatusIndicator({ segment, showLabel = false, size = 'sm' }: StatusIndicatorProps) {
  const config = statusConfig[segment]

  return (
    <div className="flex items-center gap-2">
      <div className={cn('rounded-full', config.color, sizeMap[size])} />
      {showLabel && <span className="text-xs font-medium text-foreground">{config.label}</span>}
    </div>
  )
}
