import { HeroGrid } from '@/components/heroes/hero-grid'
import { Sidebar } from '@/components/layout/sidebar'
import { getHeroes } from '@/utils/heroes'
import { validateSearchParams } from '@/utils/validate-params'

export const revalidate = 3600

interface HomePageProps {
  searchParams: Promise<{ q?: string; universe?: string; power?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const { q, universe, power } = validateSearchParams(params)
  const heroes = await getHeroes()

  const filtered = heroes.filter((hero) => {
    if (q && !hero.name.toLowerCase().includes(q.toLowerCase())) return false
    if (universe && hero.universe !== universe) return false
    return !(power && !hero.powers.includes(power))
  })

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <p className="text-foreground-muted mb-6">
          Browse and filter your favourite heroes and villains
        </p>

        <div className="flex flex-col gap-6 lg:flex-row">
          <Sidebar />
          <div className="min-w-0 flex-1">
            <HeroGrid heroes={filtered} />
          </div>
        </div>
      </div>
    </main>
  )
}
