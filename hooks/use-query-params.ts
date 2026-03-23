import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useQueryParams<T extends Record<string, unknown> = Record<string, string>>() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryParam = useMemo(() => {
    const query = new URLSearchParams()
    searchParams.forEach((value, key) => {
      query.append(key, value)
    })
    return query
  }, [searchParams])

  const getQueryParam = useCallback(
    <K extends keyof T>(name: K): T[K] | undefined => {
      const value = queryParam.get(String(name))
      if (value === null) return undefined
      return value as T[K]
    },
    [queryParam],
  )

  const setQueryParam = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      const params = new URLSearchParams(queryParam.toString())
      const stringValue = String(value)
      if (params.get(String(name)) === stringValue) {
        params.delete(String(name))
      } else {
        params.set(String(name), stringValue)
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, queryParam],
  )

  const updateQueryParam = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      const params = new URLSearchParams(queryParam.toString())
      if (value) {
        params.set(String(name), String(value))
      } else {
        params.delete(String(name))
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, queryParam],
  )

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [router, pathname])

  return {
    queryParam,
    getQueryParam,
    setQueryParam,
    updateQueryParam,
    clearAll,
  }
}
