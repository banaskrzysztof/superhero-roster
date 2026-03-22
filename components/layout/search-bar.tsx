'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import SearchIcon from '@/assets/icons/search.svg'

export function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = useDebouncedCallback(
    useCallback(
      (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
          params.set('q', value)
        } else {
          params.delete('q')
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      },
      [router, pathname, searchParams],
    ),
    300,
  )

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon
        width={16}
        height={16}
        className="text-foreground-muted absolute top-1/2 left-3 -translate-y-1/2"
      />
      <input
        type="search"
        defaultValue={searchParams.get('q') ?? ''}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search heroes..."
        className="border-border bg-background text-foreground placeholder:text-foreground-muted focus:ring-brand-primary w-full rounded-md border py-1.5 pr-3 pl-9 text-sm focus:ring-2 focus:outline-none"
      />
    </div>
  )
}
