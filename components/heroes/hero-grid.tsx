import type { Hero } from '@/types/hero'
import { HeroCard } from './hero-card'

interface HeroGridProps {
  heroes: Hero[]
}

export function HeroGrid({ heroes }: HeroGridProps) {
  if (heroes.length === 0) {
    return <p className="text-foreground-muted py-16 text-center">No heroes found</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {heroes.map((hero) => (
        <HeroCard key={hero.slug} hero={hero} />
      ))}
    </div>
  )
}
