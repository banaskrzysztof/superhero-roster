import type { Metadata } from 'next'
import { FavoritesContent } from '@/app/heroes/favorites/favorites-content'
import { getHeroes } from '@/utils/heroes'
import { validateSearchParams } from '@/utils/validate-params'

export const metadata: Metadata = {
  title: 'Favorites | Superhero Roster',
  description: 'Your saved heroes and villains.',
}

interface FavoritesPageProps {
  searchParams: Promise<{ q?: string; universe?: string; power?: string }>
}

export default async function FavoritesPage({ searchParams }: FavoritesPageProps) {
  const params = await searchParams
  const filters = validateSearchParams(params)
  const allHeroes = await getHeroes()
  return <FavoritesContent allHeroes={allHeroes} filters={filters} />
}
