import type { Hero } from '@/types/hero'
import { REVALIDATE_TIME } from '@/constants/heroes'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getHeroes(): Promise<Hero[]> {
  const res = await fetch(`${API_URL}`, {
    next: { revalidate: REVALIDATE_TIME },
  })

  if (!res.ok) throw new Error('Failed to fetch heroes')

  const data = await res.json()
  return data.items
}

export async function getHero(slug: string): Promise<Hero | null> {
  const res = await fetch(`${API_URL}/${slug}`, {
    cache: 'force-cache',
  })

  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch hero')

  return res.json()
}
