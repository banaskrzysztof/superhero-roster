'use client'

import { useFavorites } from '@/providers/favorites-provider'
import { HeroCard } from '@/components/heroes/hero-card'
import { useMemo } from 'react'
import type { Hero } from '@/types/hero'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/button'

interface FavoritesContentProps {
  allHeroes: Hero[]
}

export function FavoritesContent({ allHeroes }: FavoritesContentProps) {
  const { favorites } = useFavorites()

  const heroes = useMemo(
    () => allHeroes.filter((h) => favorites.includes(h.slug)),
    [allHeroes, favorites],
  )

  return (
    <main className="bg-background min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-8">
        <Link
          href={ROUTES.HOME}
          className="text-foreground-muted hover:text-foreground w-fit text-sm transition-colors"
        >
          ← Back to roster
        </Link>
        <div className="mt-6 mb-8">
          <h1 className="text-foreground text-2xl font-bold">Favorites</h1>
          <p className="text-foreground-muted mt-1 text-sm">
            {heroes.length === 0
              ? 'No favourites yet'
              : `${heroes.length} hero${heroes.length === 1 ? '' : 'es'} saved`}
          </p>
        </div>

        {heroes.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="text-foreground text-2xl font-semibold">No favourites yet</p>
            <p className="text-foreground-muted">You have not added any heroes yet.</p>
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
      </section>
    </main>
  )
}
