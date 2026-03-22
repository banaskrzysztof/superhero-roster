import { renderHook } from '@testing-library/react'
import { useQueryParams } from '@/hooks/use-query-params'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}))

describe('useQueryParams', () => {
  const mockReplace = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ replace: mockReplace })
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    ;(usePathname as jest.Mock).mockReturnValue('/test-path')
  })

  it('should return searchParams', () => {
    const { result } = renderHook(() => useQueryParams())
    expect(result.current.searchParams).toBeInstanceOf(URLSearchParams)
  })

  it('should set a param', () => {
    const { result } = renderHook(() => useQueryParams())

    result.current.setParam('universe', 'Marvel')

    expect(mockReplace).toHaveBeenCalledWith('/test-path?universe=Marvel', { scroll: false })
  })

  it('should toggle param when setting same value', () => {
    const params = new URLSearchParams('universe=Marvel')
    ;(useSearchParams as jest.Mock).mockReturnValue(params)
    const { result } = renderHook(() => useQueryParams())

    result.current.setParam('universe', 'Marvel')

    expect(mockReplace).toHaveBeenCalledWith('/test-path?', { scroll: false })
  })

  it('should update param', () => {
    const params = new URLSearchParams()
    ;(useSearchParams as jest.Mock).mockReturnValue(params)
    const { result } = renderHook(() => useQueryParams())

    result.current.updateParam('q', 'batman')

    expect(mockReplace).toHaveBeenCalledWith('/test-path?q=batman', { scroll: false })
  })

  it('should delete param when updating with empty value', () => {
    const params = new URLSearchParams('q=batman')
    ;(useSearchParams as jest.Mock).mockReturnValue(params)
    const { result } = renderHook(() => useQueryParams())

    result.current.updateParam('q', '')

    expect(mockReplace).toHaveBeenCalledWith('/test-path?', { scroll: false })
  })

  it('should clear all params', () => {
    const params = new URLSearchParams('universe=Marvel&power=Strength')
    ;(useSearchParams as jest.Mock).mockReturnValue(params)
    const { result } = renderHook(() => useQueryParams())

    result.current.clearAll()

    expect(mockReplace).toHaveBeenCalledWith('/test-path', { scroll: false })
  })
})
