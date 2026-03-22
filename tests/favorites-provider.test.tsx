import { renderHook, act } from '@testing-library/react'
import { FavoritesProvider, useFavorites } from '@/providers/favorites-provider'
import type { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
)

describe('FavoritesProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should start with empty favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    expect(result.current.favorites).toEqual([])
  })

  it('should add a favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })

    act(() => {
      result.current.toggleFavorite('batman')
    })

    expect(result.current.favorites).toEqual(['batman'])
    expect(result.current.isFavorite('batman')).toBe(true)
  })

  it('should remove a favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })

    act(() => {
      result.current.toggleFavorite('batman')
    })

    expect(result.current.isFavorite('batman')).toBe(true)

    act(() => {
      result.current.toggleFavorite('batman')
    })

    expect(result.current.favorites).toEqual([])
    expect(result.current.isFavorite('batman')).toBe(false)
  })

  it('should handle multiple favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })

    act(() => {
      result.current.toggleFavorite('batman')
    })
    
    act(() => {
      result.current.toggleFavorite('superman')
    })
    
    act(() => {
      result.current.toggleFavorite('wonder-woman')
    })

    expect(result.current.favorites).toEqual(['batman', 'superman', 'wonder-woman'])
  })

  it('should persist favorites in localStorage', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })

    act(() => {
      result.current.toggleFavorite('batman')
    })

    const stored = localStorage.getItem('favorites')
    expect(stored).toBe('["batman"]')
  })

  it('should handle corrupted localStorage data gracefully', () => {
    localStorage.setItem('favorites', 'corrupted{[}data')

    const { result } = renderHook(() => useFavorites(), { wrapper })
    expect(result.current.favorites).toEqual([])
  })

  it('should handle non-array localStorage data', () => {
    localStorage.setItem('favorites', '{"not": "array"}')

    const { result } = renderHook(() => useFavorites(), { wrapper })
    expect(result.current.favorites).toEqual([])
  })

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useFavorites())
    }).toThrow('useFavorites must be used within FavoritesProvider')
  })
})
