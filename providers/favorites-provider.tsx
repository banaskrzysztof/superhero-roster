'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'favorites'
const EMPTY: string[] = []
let cachedSnapshot: string[] = EMPTY

function getSnapshot(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return EMPTY

    const parsed: string[] = JSON.parse(stored)
    if (!Array.isArray(parsed)) return EMPTY

    if (
      parsed.length === cachedSnapshot.length &&
      parsed.every((s, i) => s === cachedSnapshot[i])
    ) {
      return cachedSnapshot
    }

    cachedSnapshot = parsed
    return cachedSnapshot
  } catch (error) {
    console.error('Failed to parse favorites from localStorage:', error)
    return EMPTY
  }
}

function getServerSnapshot(): string[] {
  return EMPTY
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

interface FavoritesContextValue {
  favorites: string[]
  isFavorite: (slug: string) => boolean
  toggleFavorite: (slug: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleFavorite = useCallback(
    (slug: string) => {
      try {
        const next = favorites.includes(slug)
          ? favorites.filter((s) => s !== slug)
          : [...favorites, slug]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        window.dispatchEvent(new Event('storage'))
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error)
      }
    },
    [favorites],
  )

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite: (s) => favorites.includes(s), toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
