import { cn } from '@/lib/utils'
import type { HealthSegment } from '@/lib/types'

interface HealthBadgeProps {
  segment: HealthSegment
  score?: number
  size?: 'sm' | 'md' | 'lg'
}

const segmentConfig: Record<HealthSegment, { label: string; color: string; bgColor: string }> = {
  healthy: {
    label: 'Healthy',
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  watch: {
    label: 'Watch',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  'at-risk': {
    label: 'At Risk',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  unknown: {
    label: 'Unknown',
    color: 'text-gray-700 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
  },
}

const sizeConfig = {
  sm: 'px-2 py-1 text-xs font-medium',
  md: 'px-3 py-1.5 text-sm font-medium',
  lg: 'px-4 py-2 text-base font-semibold',
}

export function HealthBadge({ segment, score, size = 'md' }: HealthBadgeProps) {
  const config = segmentConfig[segment]

  return (
    <div className={cn('inline-flex items-center gap-1.5 rounded-full', config.bgColor, sizeConfig[size])}>
      <div
        className={cn('h-2 w-2 rounded-full', {
          'bg-green-500 dark:bg-green-400': segment === 'healthy',
          'bg-amber-500 dark:bg-amber-400': segment === 'watch',
          'bg-red-500 dark:bg-red-400': segment === 'at-risk',
          'bg-gray-400 dark:bg-gray-500': segment === 'unknown',
        })}
      />
      <span className={config.color}>{config.label}</span>
      {score !== undefined && <span className={config.color}>({score})</span>}
    </div>
  )
}
