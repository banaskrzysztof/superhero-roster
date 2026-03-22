import type { Metadata } from 'next'
import { FavoritesContent } from '@/app/heroes/favorites/favorites-content'
import { getHeroes } from '@/utils/heroes'

export const metadata: Metadata = {
  title: 'Favorites | Superhero Roster',
  description: 'Your saved heroes and villains.',
}

export default async function FavoritesPage() {
  const allHeroes = await getHeroes()
  return <FavoritesContent allHeroes={allHeroes} />
}
