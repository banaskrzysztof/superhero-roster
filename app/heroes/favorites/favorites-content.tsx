'use client'

import { useFavorites } from '@/providers/favorites-provider'
import { HeroCard } from '@/components/heroes/hero-card'
import { Sidebar } from '@/components/layout/sidebar'
import { useMemo } from 'react'
import type { Hero, PowerType, Universe } from '@/types/hero'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/button'

interface FavoritesContentProps {
  allHeroes: Hero[]
  filters: {
    q?: string
    universe?: Universe
    power?: PowerType
  }
}

export function FavoritesContent({ allHeroes, filters }: FavoritesContentProps) {
  const { favorites } = useFavorites()
  const { q, universe, power } = filters

  const heroes = useMemo(() => {
    let filtered = allHeroes.filter((h) => favorites.includes(h.slug))
    if (q) {
      filtered = filtered.filter((hero) => hero.name.toLowerCase().includes(q.toLowerCase()))
    }

    if (universe) {
      filtered = filtered.filter((hero) => hero.universe === universe)
    }

    if (power) {
      filtered = filtered.filter((hero) => hero.powers.includes(power))
    }

    return filtered
  }, [allHeroes, favorites, q, universe, power])

  const totalFavorites = allHeroes.filter((h) => favorites.includes(h.slug)).length

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <Link
          href={ROUTES.HOME}
          className="text-foreground-muted hover:text-foreground w-fit text-sm transition-colors"
        >
          ← Back to roster
        </Link>
        <div className="mt-6 mb-6">
          <h1 className="text-foreground text-2xl font-bold">Favorites</h1>
          <p className="text-foreground-muted mt-1 text-sm">
            {totalFavorites === 0
              ? 'No favourites yet'
              : `${heroes.length} of ${totalFavorites} hero${totalFavorites === 1 ? '' : 'es'} shown`}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <Sidebar />
          <div className="min-w-0 flex-1">
            {heroes.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-24 text-center">
                <p className="text-foreground text-2xl font-semibold">
                  {totalFavorites === 0 ? 'No favourites yet' : 'No heroes match your filters'}
                </p>
                <p className="text-foreground-muted">
                  {totalFavorites === 0
                    ? 'You have not added any heroes yet.'
                    : 'Try adjusting your search or filters.'}
                </p>
                <Link href={ROUTES.HOME}>
                  <Button>Browse heroes</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {heroes.map((hero) => (
                  <HeroCard key={hero.slug} hero={hero} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
