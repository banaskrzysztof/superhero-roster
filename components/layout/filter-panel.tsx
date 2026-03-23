'use client'

import { POWER_TYPES, UNIVERSES } from '@/types/hero'
import { useQueryParams } from '@/hooks/use-query-params'

export function FilterPanel() {
  const { searchParams, setParam, clearAll } = useQueryParams()

  const activeUniverse = searchParams.get('universe')
  const activePower = searchParams.get('power')
  const hasFilters = searchParams.toString() !== ''

  const buttonClass = (active: boolean) =>
    `cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-all hover:scale-105 ${
      active
        ? 'border-foreground bg-foreground text-background'
        : 'border-border text-foreground-muted hover:border-foreground hover:text-foreground'
    }`

  return (
    <div className="space-y-4">
      <div>
        <span className="text-foreground mb-2 block text-sm font-medium">Universe</span>
        <div className="flex flex-wrap gap-2">
          {UNIVERSES.map((u) => (
            <button
              key={u}
              onClick={() => setParam('universe', u)}
              className={buttonClass(activeUniverse === u)}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-foreground mb-2 block text-sm font-medium">Power</span>
        <div className="flex flex-wrap gap-2">
          {POWER_TYPES.map((p) => (
            <button
              key={p}
              onClick={() => setParam('power', p)}
              className={buttonClass(activePower === p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-foreground-muted hover:text-foreground border-border w-full cursor-pointer rounded-md border py-2 text-xs transition-colors"
        >
          Clear filters and search
        </button>
      )}
    </div>
  )
}
