import { Suspense } from 'react'
import { HeroGrid } from '@/components/heroes/hero-grid'
import { SearchBar } from '@/components/layout/search-bar'
import { FilterPanel } from '@/components/layout/filter-panel'
import { getHeroes } from '@/utils/heroes'
import type { Universe, PowerType } from '@/types/hero'

interface HomePageProps {
  searchParams: Promise<{ q?: string; universe?: string; power?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, universe, power } = await searchParams
  const heroes = await getHeroes()

  const filtered = heroes.filter((hero) => {
    if (q && !hero.name.toLowerCase().includes(q.toLowerCase())) return false
    if (universe && hero.universe !== (universe as Universe)) return false
    return !(power && !hero.powers.includes(power as PowerType))
  })

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-foreground-muted mb-6">
          Browse and filter your favourite heroes and villains
        </p>
        <div className="mb-4">
          <Suspense
            fallback={<div className="bg-background-subtle h-9 w-full max-w-sm rounded-md" />}
          >
            <SearchBar />
          </Suspense>
        </div>
        <div className="mb-6">
          <Suspense fallback={<div className="bg-background-subtle h-8 w-full rounded-full" />}>
            <FilterPanel />
          </Suspense>
        </div>
        <HeroGrid heroes={filtered} />
      </section>
    </main>
  )
}
